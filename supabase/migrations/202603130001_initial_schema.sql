CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'staff', 'client')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'invited', 'suspended', 'archived')),
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.staff_profiles (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(user_id) ON DELETE CASCADE,
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

CREATE TABLE public.client_profiles (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(user_id) ON DELETE CASCADE,
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

CREATE TABLE public.client_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_user_id UUID NOT NULL REFERENCES public.client_profiles(user_id) ON DELETE CASCADE,
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

CREATE TABLE public.products (
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

CREATE TABLE public.customer_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  client_user_id UUID NOT NULL REFERENCES public.client_profiles(user_id),
  created_by_user_id UUID REFERENCES public.profiles(user_id),
  fulfilment_method TEXT NOT NULL CHECK (fulfilment_method IN ('collection', 'delivery')),
  order_status TEXT NOT NULL DEFAULT 'draft'
    CHECK (order_status IN ('draft', 'submitted', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
  requested_for TIMESTAMPTZ,
  billing_address_id UUID REFERENCES public.client_addresses(id),
  delivery_address_id UUID REFERENCES public.client_addresses(id),
  customer_note TEXT,
  internal_note TEXT,
  subtotal_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (subtotal_amount >= 0),
  delivery_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (delivery_amount >= 0),
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.customer_orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  line_total NUMERIC(10, 2) NOT NULL CHECK (line_total >= 0),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.saved_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_user_id UUID NOT NULL REFERENCES public.client_profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_user_id, name)
);

CREATE TABLE public.saved_list_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  saved_list_id UUID NOT NULL REFERENCES public.saved_lists(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (saved_list_id, product_id)
);

CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT NOT NULL UNIQUE,
  order_id UUID NOT NULL UNIQUE REFERENCES public.customer_orders(id) ON DELETE CASCADE,
  client_user_id UUID NOT NULL REFERENCES public.client_profiles(user_id),
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

CREATE TABLE public.invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  order_item_id UUID REFERENCES public.order_items(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  quantity NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  line_total NUMERIC(10, 2) NOT NULL CHECK (line_total >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.invoice_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'card', 'bank_transfer', 'phone')),
  reference_code TEXT,
  paid_at TIMESTAMPTZ NOT NULL,
  created_by_user_id UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.ensure_staff_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  matched_role TEXT;
BEGIN
  SELECT role INTO matched_role
  FROM public.profiles
  WHERE user_id = NEW.user_id;

  IF matched_role NOT IN ('admin', 'staff') THEN
    RAISE EXCEPTION 'staff_profiles.user_id must reference an admin or staff profile';
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.ensure_client_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  matched_role TEXT;
BEGIN
  SELECT role INTO matched_role
  FROM public.profiles
  WHERE user_id = NEW.user_id;

  IF matched_role <> 'client' THEN
    RAISE EXCEPTION 'client_profiles.user_id must reference a client profile';
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.protect_profile_admin_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF public.is_admin() THEN
    RETURN NEW;
  END IF;

  IF NEW.email IS DISTINCT FROM OLD.email THEN
    RAISE EXCEPTION 'email changes must be handled through Supabase auth';
  END IF;

  IF NEW.role IS DISTINCT FROM OLD.role THEN
    RAISE EXCEPTION 'only admins can change profile roles';
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    RAISE EXCEPTION 'only admins can change profile status';
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  contact_name TEXT;
  generated_account_code TEXT;
BEGIN
  INSERT INTO public.profiles (user_id, email, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    'client',
    CASE WHEN NEW.email_confirmed_at IS NULL THEN 'invited' ELSE 'active' END
  )
  ON CONFLICT (user_id) DO UPDATE
  SET
    email = EXCLUDED.email,
    status = EXCLUDED.status,
    updated_at = NOW();

  contact_name := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data ->> 'contact_name'), ''),
    NULLIF(TRIM(CONCAT(COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''), ' ', COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''))), ''),
    NEW.email
  );

  generated_account_code := 'CUST-' || UPPER(SUBSTRING(REPLACE(NEW.id::TEXT, '-', '') FROM 1 FOR 8));

  INSERT INTO public.client_profiles (
    user_id,
    account_code,
    business_name,
    contact_name,
    phone,
    default_fulfilment_method,
    tax_reference,
    notes
  )
  VALUES (
    NEW.id,
    generated_account_code,
    NULLIF(NEW.raw_user_meta_data ->> 'business_name', ''),
    contact_name,
    NEW.raw_user_meta_data ->> 'phone',
    COALESCE(NULLIF(NEW.raw_user_meta_data ->> 'default_fulfilment_method', ''), 'collection'),
    NEW.raw_user_meta_data ->> 'tax_reference',
    NEW.raw_user_meta_data ->> 'notes'
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.profiles
  WHERE user_id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(public.current_user_role() = 'admin', FALSE)
$$;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(public.current_user_role() IN ('admin', 'staff'), FALSE)
$$;

CREATE OR REPLACE FUNCTION public.staff_has_permission(permission_name TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    public.is_admin()
    OR EXISTS (
      SELECT 1
      FROM public.staff_profiles sp
      WHERE sp.user_id = auth.uid()
        AND (
          (permission_name = 'inventory' AND sp.can_manage_inventory)
          OR (permission_name = 'orders' AND sp.can_manage_orders)
          OR (permission_name = 'clients' AND sp.can_manage_clients)
          OR (permission_name = 'billing' AND sp.can_manage_billing)
        )
    ),
    FALSE
  )
$$;

CREATE OR REPLACE FUNCTION public.owns_client_record(target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(auth.uid() = target_user_id AND public.current_user_role() = 'client', FALSE)
$$;

CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_client_addresses_client ON public.client_addresses(client_user_id);
CREATE INDEX idx_orders_client ON public.customer_orders(client_user_id, created_at DESC);
CREATE INDEX idx_orders_status ON public.customer_orders(order_status);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_saved_lists_client ON public.saved_lists(client_user_id, last_used_at DESC);
CREATE INDEX idx_invoices_client ON public.invoices(client_user_id, issued_at DESC);
CREATE INDEX idx_invoice_payments_invoice ON public.invoice_payments(invoice_id, paid_at DESC);
CREATE UNIQUE INDEX idx_client_default_billing
  ON public.client_addresses(client_user_id)
  WHERE is_default_billing = TRUE;
CREATE UNIQUE INDEX idx_client_default_delivery
  ON public.client_addresses(client_user_id)
  WHERE is_default_delivery = TRUE;

CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER protect_profile_admin_fields
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.protect_profile_admin_fields();

CREATE TRIGGER set_staff_profiles_updated_at
BEFORE UPDATE ON public.staff_profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_client_profiles_updated_at
BEFORE UPDATE ON public.client_profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_client_addresses_updated_at
BEFORE UPDATE ON public.client_addresses
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_customer_orders_updated_at
BEFORE UPDATE ON public.customer_orders
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_saved_lists_updated_at
BEFORE UPDATE ON public.saved_lists
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_invoices_updated_at
BEFORE UPDATE ON public.invoices
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER ensure_staff_profiles_role
BEFORE INSERT OR UPDATE ON public.staff_profiles
FOR EACH ROW
EXECUTE FUNCTION public.ensure_staff_user_role();

CREATE TRIGGER ensure_client_profiles_role
BEFORE INSERT OR UPDATE ON public.client_profiles
FOR EACH ROW
EXECUTE FUNCTION public.ensure_client_user_role();

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_auth_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_self_or_admin_select"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "profiles_self_or_admin_update"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "staff_profiles_self_or_admin_select"
  ON public.staff_profiles
  FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "staff_profiles_admin_manage"
  ON public.staff_profiles
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "client_profiles_visible_to_owner_or_staff"
  ON public.client_profiles
  FOR SELECT
  USING (
    public.owns_client_record(user_id)
    OR public.is_admin()
    OR public.staff_has_permission('clients')
    OR public.staff_has_permission('orders')
    OR public.staff_has_permission('billing')
  );

CREATE POLICY "client_profiles_insert_by_client_or_staff"
  ON public.client_profiles
  FOR INSERT
  WITH CHECK (
    public.owns_client_record(user_id)
    OR public.is_admin()
    OR public.staff_has_permission('clients')
  );

CREATE POLICY "client_profiles_update_by_owner_or_staff"
  ON public.client_profiles
  FOR UPDATE
  USING (
    public.owns_client_record(user_id)
    OR public.is_admin()
    OR public.staff_has_permission('clients')
  )
  WITH CHECK (
    public.owns_client_record(user_id)
    OR public.is_admin()
    OR public.staff_has_permission('clients')
  );

CREATE POLICY "client_addresses_visible_to_owner_or_staff"
  ON public.client_addresses
  FOR SELECT
  USING (
    public.owns_client_record(client_user_id)
    OR public.is_admin()
    OR public.staff_has_permission('clients')
    OR public.staff_has_permission('orders')
  );

CREATE POLICY "client_addresses_manage_by_owner_or_staff"
  ON public.client_addresses
  FOR ALL
  USING (
    public.owns_client_record(client_user_id)
    OR public.is_admin()
    OR public.staff_has_permission('clients')
  )
  WITH CHECK (
    public.owns_client_record(client_user_id)
    OR public.is_admin()
    OR public.staff_has_permission('clients')
  );

CREATE POLICY "products_public_read"
  ON public.products
  FOR SELECT
  USING (is_active = TRUE OR public.is_staff());

CREATE POLICY "products_staff_manage"
  ON public.products
  FOR ALL
  USING (public.staff_has_permission('inventory') OR public.is_admin())
  WITH CHECK (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "orders_visible_to_owner_or_staff"
  ON public.customer_orders
  FOR SELECT
  USING (
    public.owns_client_record(client_user_id)
    OR public.is_admin()
    OR public.staff_has_permission('orders')
    OR public.staff_has_permission('billing')
  );

CREATE POLICY "orders_insert_by_owner_or_staff"
  ON public.customer_orders
  FOR INSERT
  WITH CHECK (
    public.owns_client_record(client_user_id)
    OR public.is_admin()
    OR public.staff_has_permission('orders')
  );

CREATE POLICY "orders_update_by_owner_or_staff"
  ON public.customer_orders
  FOR UPDATE
  USING (
    public.owns_client_record(client_user_id)
    OR public.is_admin()
    OR public.staff_has_permission('orders')
  )
  WITH CHECK (
    public.owns_client_record(client_user_id)
    OR public.is_admin()
    OR public.staff_has_permission('orders')
  );

CREATE POLICY "order_items_visible_via_order_access"
  ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.customer_orders o
      WHERE o.id = order_id
        AND (
          public.owns_client_record(o.client_user_id)
          OR public.is_admin()
          OR public.staff_has_permission('orders')
          OR public.staff_has_permission('billing')
        )
    )
  );

CREATE POLICY "order_items_manage_via_order_access"
  ON public.order_items
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.customer_orders o
      WHERE o.id = order_id
        AND (
          public.owns_client_record(o.client_user_id)
          OR public.is_admin()
          OR public.staff_has_permission('orders')
        )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.customer_orders o
      WHERE o.id = order_id
        AND (
          public.owns_client_record(o.client_user_id)
          OR public.is_admin()
          OR public.staff_has_permission('orders')
        )
    )
  );

CREATE POLICY "saved_lists_visible_to_owner_or_staff"
  ON public.saved_lists
  FOR SELECT
  USING (
    public.owns_client_record(client_user_id)
    OR public.is_admin()
    OR public.staff_has_permission('orders')
    OR public.staff_has_permission('clients')
  );

CREATE POLICY "saved_lists_manage_by_owner_or_staff"
  ON public.saved_lists
  FOR ALL
  USING (
    public.owns_client_record(client_user_id)
    OR public.is_admin()
    OR public.staff_has_permission('orders')
    OR public.staff_has_permission('clients')
  )
  WITH CHECK (
    public.owns_client_record(client_user_id)
    OR public.is_admin()
    OR public.staff_has_permission('orders')
    OR public.staff_has_permission('clients')
  );

CREATE POLICY "saved_list_items_visible_via_saved_list_access"
  ON public.saved_list_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.saved_lists sl
      WHERE sl.id = saved_list_id
        AND (
          public.owns_client_record(sl.client_user_id)
          OR public.is_admin()
          OR public.staff_has_permission('orders')
          OR public.staff_has_permission('clients')
        )
    )
  );

CREATE POLICY "saved_list_items_manage_via_saved_list_access"
  ON public.saved_list_items
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.saved_lists sl
      WHERE sl.id = saved_list_id
        AND (
          public.owns_client_record(sl.client_user_id)
          OR public.is_admin()
          OR public.staff_has_permission('orders')
          OR public.staff_has_permission('clients')
        )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.saved_lists sl
      WHERE sl.id = saved_list_id
        AND (
          public.owns_client_record(sl.client_user_id)
          OR public.is_admin()
          OR public.staff_has_permission('orders')
          OR public.staff_has_permission('clients')
        )
    )
  );

CREATE POLICY "invoices_visible_to_owner_or_billing_staff"
  ON public.invoices
  FOR SELECT
  USING (
    public.owns_client_record(client_user_id)
    OR public.is_admin()
    OR public.staff_has_permission('billing')
    OR public.staff_has_permission('orders')
  );

CREATE POLICY "invoices_manage_by_billing_staff"
  ON public.invoices
  FOR ALL
  USING (
    public.is_admin()
    OR public.staff_has_permission('billing')
  )
  WITH CHECK (
    public.is_admin()
    OR public.staff_has_permission('billing')
  );

CREATE POLICY "invoice_items_visible_via_invoice_access"
  ON public.invoice_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.invoices i
      WHERE i.id = invoice_id
        AND (
          public.owns_client_record(i.client_user_id)
          OR public.is_admin()
          OR public.staff_has_permission('billing')
          OR public.staff_has_permission('orders')
        )
    )
  );

CREATE POLICY "invoice_items_manage_via_invoice_access"
  ON public.invoice_items
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.invoices i
      WHERE i.id = invoice_id
        AND (
          public.is_admin()
          OR public.staff_has_permission('billing')
        )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.invoices i
      WHERE i.id = invoice_id
        AND (
          public.is_admin()
          OR public.staff_has_permission('billing')
        )
    )
  );

CREATE POLICY "invoice_payments_visible_via_invoice_access"
  ON public.invoice_payments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.invoices i
      WHERE i.id = invoice_id
        AND (
          public.owns_client_record(i.client_user_id)
          OR public.is_admin()
          OR public.staff_has_permission('billing')
        )
    )
  );

CREATE POLICY "invoice_payments_manage_by_billing_staff"
  ON public.invoice_payments
  FOR ALL
  USING (public.is_admin() OR public.staff_has_permission('billing'))
  WITH CHECK (public.is_admin() OR public.staff_has_permission('billing'));
