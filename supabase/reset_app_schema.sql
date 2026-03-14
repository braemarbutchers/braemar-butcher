DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    EXECUTE 'DROP TRIGGER on_auth_user_created ON auth.users';
  END IF;
END
$$;

DO $$
DECLARE
  target_table TEXT;
  policy_name TEXT;
BEGIN
  FOR target_table, policy_name IN
    SELECT *
    FROM (
      VALUES
        ('profiles', 'profiles_self_or_admin_select'),
        ('profiles', 'profiles_self_or_admin_update'),
        ('staff_profiles', 'staff_profiles_self_or_admin_select'),
        ('staff_profiles', 'staff_profiles_admin_manage'),
        ('client_profiles', 'client_profiles_visible_to_owner_or_staff'),
        ('client_profiles', 'client_profiles_insert_by_client_or_staff'),
        ('client_profiles', 'client_profiles_update_by_owner_or_staff'),
        ('client_addresses', 'client_addresses_visible_to_owner_or_staff'),
        ('client_addresses', 'client_addresses_manage_by_owner_or_staff'),
        ('products', 'products_public_read'),
        ('products', 'products_staff_manage'),
        ('customer_orders', 'orders_visible_to_owner_or_staff'),
        ('customer_orders', 'orders_insert_by_owner_or_staff'),
        ('customer_orders', 'orders_update_by_owner_or_staff'),
        ('order_items', 'order_items_visible_via_order_access'),
        ('order_items', 'order_items_manage_via_order_access'),
        ('saved_lists', 'saved_lists_visible_to_owner_or_staff'),
        ('saved_lists', 'saved_lists_manage_by_owner_or_staff'),
        ('saved_list_items', 'saved_list_items_visible_via_saved_list_access'),
        ('saved_list_items', 'saved_list_items_manage_via_saved_list_access'),
        ('invoices', 'invoices_visible_to_owner_or_billing_staff'),
        ('invoices', 'invoices_manage_by_billing_staff'),
        ('invoice_items', 'invoice_items_visible_via_invoice_access'),
        ('invoice_items', 'invoice_items_manage_via_invoice_access'),
        ('invoice_payments', 'invoice_payments_visible_via_invoice_access'),
        ('invoice_payments', 'invoice_payments_manage_by_billing_staff')
    ) AS policies(table_name, policy_name)
  LOOP
    IF EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = target_table
    ) THEN
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', policy_name, target_table);
    END IF;
  END LOOP;
END
$$;

DROP TABLE IF EXISTS public.invoice_payments CASCADE;
DROP TABLE IF EXISTS public.invoice_items CASCADE;
DROP TABLE IF EXISTS public.invoices CASCADE;
DROP TABLE IF EXISTS public.saved_list_items CASCADE;
DROP TABLE IF EXISTS public.saved_lists CASCADE;
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.customer_orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.client_addresses CASCADE;
DROP TABLE IF EXISTS public.client_profiles CASCADE;
DROP TABLE IF EXISTS public.staff_profiles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.app_users CASCADE;

DROP FUNCTION IF EXISTS public.set_staff_permissions(UUID, BOOLEAN, BOOLEAN, BOOLEAN, BOOLEAN);
DROP FUNCTION IF EXISTS public.promote_user_role(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, BOOLEAN, BOOLEAN, BOOLEAN);
DROP FUNCTION IF EXISTS public.owns_client_record(UUID);
DROP FUNCTION IF EXISTS public.staff_has_permission(TEXT);
DROP FUNCTION IF EXISTS public.is_staff();
DROP FUNCTION IF EXISTS public.is_admin();
DROP FUNCTION IF EXISTS public.current_user_role();
DROP FUNCTION IF EXISTS public.handle_new_auth_user();
DROP FUNCTION IF EXISTS public.protect_profile_admin_fields();
DROP FUNCTION IF EXISTS public.ensure_client_user_role();
DROP FUNCTION IF EXISTS public.ensure_staff_user_role();
DROP FUNCTION IF EXISTS public.set_updated_at();
