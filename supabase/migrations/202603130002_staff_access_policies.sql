CREATE OR REPLACE FUNCTION public.requesting_user_email()
RETURNS TEXT
LANGUAGE sql
STABLE
AS $$
  SELECT lower(COALESCE(auth.jwt() ->> 'email', ''));
$$;

CREATE OR REPLACE FUNCTION public.is_active_staff_user()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.app_users
    WHERE lower(email) = public.requesting_user_email()
      AND role IN ('admin', 'staff')
      AND status = 'active'
  );
$$;

ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own account row" ON public.app_users;
CREATE POLICY "Users can read own account row"
ON public.app_users
FOR SELECT
TO authenticated
USING (lower(email) = public.requesting_user_email());

DROP POLICY IF EXISTS "Staff can read own staff profile" ON public.staff_profiles;
CREATE POLICY "Staff can read own staff profile"
ON public.staff_profiles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.app_users
    WHERE app_users.id = staff_profiles.user_id
      AND lower(app_users.email) = public.requesting_user_email()
      AND app_users.role IN ('admin', 'staff')
      AND app_users.status = 'active'
  )
);

DROP POLICY IF EXISTS "Public can read active products" ON public.products;
CREATE POLICY "Public can read active products"
ON public.products
FOR SELECT
TO anon, authenticated
USING (is_active = TRUE);

DROP POLICY IF EXISTS "Staff can read client profiles" ON public.client_profiles;
CREATE POLICY "Staff can read client profiles"
ON public.client_profiles
FOR SELECT
TO authenticated
USING (public.is_active_staff_user());

DROP POLICY IF EXISTS "Staff can read client addresses" ON public.client_addresses;
CREATE POLICY "Staff can read client addresses"
ON public.client_addresses
FOR SELECT
TO authenticated
USING (public.is_active_staff_user());

DROP POLICY IF EXISTS "Staff can read customer orders" ON public.customer_orders;
CREATE POLICY "Staff can read customer orders"
ON public.customer_orders
FOR SELECT
TO authenticated
USING (public.is_active_staff_user());

DROP POLICY IF EXISTS "Staff can read order items" ON public.order_items;
CREATE POLICY "Staff can read order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (public.is_active_staff_user());

DROP POLICY IF EXISTS "Staff can read invoices" ON public.invoices;
CREATE POLICY "Staff can read invoices"
ON public.invoices
FOR SELECT
TO authenticated
USING (public.is_active_staff_user());

DROP POLICY IF EXISTS "Staff can read invoice items" ON public.invoice_items;
CREATE POLICY "Staff can read invoice items"
ON public.invoice_items
FOR SELECT
TO authenticated
USING (public.is_active_staff_user());

DROP POLICY IF EXISTS "Staff can read invoice payments" ON public.invoice_payments;
CREATE POLICY "Staff can read invoice payments"
ON public.invoice_payments
FOR SELECT
TO authenticated
USING (public.is_active_staff_user());
