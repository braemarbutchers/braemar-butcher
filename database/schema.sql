CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ensure_staff_user_role()
RETURNS TRIGGER AS $$
DECLARE
  matched_role TEXT;
BEGIN
  SELECT role INTO matched_role
  FROM app_users
  WHERE id = NEW.user_id;

  IF matched_role NOT IN ('admin', 'staff') THEN
    RAISE EXCEPTION 'staff_profiles.user_id must reference an admin or staff user';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ensure_client_user_role()
RETURNS TRIGGER AS $$
DECLARE
  matched_role TEXT;
BEGIN
  SELECT role INTO matched_role
  FROM app_users
  WHERE id = NEW.user_id;

  IF matched_role <> 'client' THEN
    RAISE EXCEPTION 'client_profiles.user_id must reference a client user';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE app_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'staff', 'client')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'invited', 'suspended', 'archived')),
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE staff_profiles (
  user_id UUID PRIMARY KEY REFERENCES app_users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  job_title TEXT NOT NULL,
  department TEXT,
  can_manage_inventory BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_orders BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_clients BOOLEAN NOT NULL DEFAULT FALSE,
  can_manage_billing BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE client_profiles (
  user_id UUID PRIMARY KEY REFERENCES app_users(id) ON DELETE CASCADE,
  account_code TEXT NOT NULL UNIQUE,
  business_name TEXT,
  contact_name TEXT NOT NULL,
  phone TEXT,
  default_fulfilment_method TEXT NOT NULL DEFAULT 'collection'
    CHECK (default_fulfilment_method IN ('collection', 'delivery')),
  tax_reference TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE client_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_user_id UUID NOT NULL REFERENCES client_profiles(user_id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  line_1 TEXT NOT NULL,
  line_2 TEXT,
  city TEXT NOT NULL,
  county TEXT,
  postcode TEXT NOT NULL,
  country_code CHAR(2) NOT NULL DEFAULT 'GB',
  delivery_instructions TEXT,
  is_default_billing BOOLEAN NOT NULL DEFAULT FALSE,
  is_default_delivery BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  unit TEXT NOT NULL DEFAULT 'item',
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE customer_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  client_user_id UUID NOT NULL REFERENCES client_profiles(user_id),
  created_by_user_id UUID REFERENCES app_users(id),
  fulfilment_method TEXT NOT NULL CHECK (fulfilment_method IN ('collection', 'delivery')),
  order_status TEXT NOT NULL DEFAULT 'draft'
    CHECK (
      order_status IN (
        'draft',
        'submitted',
        'confirmed',
        'preparing',
        'ready',
        'completed',
        'cancelled'
      )
    ),
  requested_for TIMESTAMPTZ,
  billing_address_id UUID REFERENCES client_addresses(id),
  delivery_address_id UUID REFERENCES client_addresses(id),
  customer_note TEXT,
  internal_note TEXT,
  subtotal_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (subtotal_amount >= 0),
  delivery_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (delivery_amount >= 0),
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES customer_orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  line_total NUMERIC(10, 2) NOT NULL CHECK (line_total >= 0),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE saved_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_user_id UUID NOT NULL REFERENCES client_profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_user_id, name)
);

CREATE TABLE saved_list_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  saved_list_id UUID NOT NULL REFERENCES saved_lists(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (saved_list_id, product_id)
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT NOT NULL UNIQUE,
  order_id UUID NOT NULL UNIQUE REFERENCES customer_orders(id) ON DELETE CASCADE,
  client_user_id UUID NOT NULL REFERENCES client_profiles(user_id),
  invoice_status TEXT NOT NULL DEFAULT 'draft'
    CHECK (invoice_status IN ('draft', 'issued', 'paid', 'part_paid', 'overdue', 'cancelled')),
  issued_at TIMESTAMPTZ,
  due_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  subtotal_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (subtotal_amount >= 0),
  tax_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
  balance_due NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (balance_due >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  order_item_id UUID REFERENCES order_items(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  quantity NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  line_total NUMERIC(10, 2) NOT NULL CHECK (line_total >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE invoice_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'card', 'bank_transfer', 'phone')),
  reference_code TEXT,
  paid_at TIMESTAMPTZ NOT NULL,
  created_by_user_id UUID REFERENCES app_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_app_users_role ON app_users(role);
CREATE INDEX idx_client_addresses_client ON client_addresses(client_user_id);
CREATE INDEX idx_orders_client ON customer_orders(client_user_id, created_at DESC);
CREATE INDEX idx_orders_status ON customer_orders(order_status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_saved_lists_client ON saved_lists(client_user_id, last_used_at DESC);
CREATE INDEX idx_invoices_client ON invoices(client_user_id, issued_at DESC);
CREATE INDEX idx_invoice_payments_invoice ON invoice_payments(invoice_id, paid_at DESC);
CREATE UNIQUE INDEX idx_client_default_billing
  ON client_addresses(client_user_id)
  WHERE is_default_billing = TRUE;
CREATE UNIQUE INDEX idx_client_default_delivery
  ON client_addresses(client_user_id)
  WHERE is_default_delivery = TRUE;

CREATE TRIGGER set_app_users_updated_at
BEFORE UPDATE ON app_users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_staff_profiles_updated_at
BEFORE UPDATE ON staff_profiles
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER ensure_staff_profiles_role
BEFORE INSERT OR UPDATE ON staff_profiles
FOR EACH ROW
EXECUTE FUNCTION ensure_staff_user_role();

CREATE TRIGGER set_client_profiles_updated_at
BEFORE UPDATE ON client_profiles
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER ensure_client_profiles_role
BEFORE INSERT OR UPDATE ON client_profiles
FOR EACH ROW
EXECUTE FUNCTION ensure_client_user_role();

CREATE TRIGGER set_client_addresses_updated_at
BEFORE UPDATE ON client_addresses
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_customer_orders_updated_at
BEFORE UPDATE ON customer_orders
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_saved_lists_updated_at
BEFORE UPDATE ON saved_lists
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_invoices_updated_at
BEFORE UPDATE ON invoices
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
