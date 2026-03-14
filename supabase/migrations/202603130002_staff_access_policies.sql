CREATE OR REPLACE FUNCTION public.promote_user_role(
  target_user_id UUID,
  new_role TEXT,
  first_name TEXT DEFAULT NULL,
  last_name TEXT DEFAULT NULL,
  phone TEXT DEFAULT NULL,
  job_title TEXT DEFAULT NULL,
  department TEXT DEFAULT NULL,
  can_manage_inventory BOOLEAN DEFAULT FALSE,
  can_manage_orders BOOLEAN DEFAULT FALSE,
  can_manage_clients BOOLEAN DEFAULT FALSE,
  can_manage_billing BOOLEAN DEFAULT FALSE
)
RETURNS public.profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_profile public.profiles;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'only admins can promote users';
  END IF;

  IF new_role NOT IN ('admin', 'staff', 'client') THEN
    RAISE EXCEPTION 'new_role must be admin, staff, or client';
  END IF;

  UPDATE public.profiles
  SET
    role = new_role,
    status = 'active',
    updated_at = NOW()
  WHERE user_id = target_user_id
  RETURNING * INTO updated_profile;

  IF updated_profile.user_id IS NULL THEN
    RAISE EXCEPTION 'target user does not exist in public.profiles';
  END IF;

  IF new_role = 'client' THEN
    DELETE FROM public.staff_profiles
    WHERE user_id = target_user_id;

    INSERT INTO public.client_profiles (
      user_id,
      account_code,
      business_name,
      contact_name,
      phone
    )
    VALUES (
      target_user_id,
      'CUST-' || UPPER(SUBSTRING(REPLACE(target_user_id::TEXT, '-', '') FROM 1 FOR 8)),
      NULL,
      COALESCE(NULLIF(TRIM(CONCAT(COALESCE(first_name, ''), ' ', COALESCE(last_name, ''))), ''), updated_profile.email),
      phone
    )
    ON CONFLICT (user_id) DO UPDATE
    SET
      contact_name = EXCLUDED.contact_name,
      phone = COALESCE(EXCLUDED.phone, public.client_profiles.phone),
      updated_at = NOW();
  ELSE
    DELETE FROM public.client_profiles
    WHERE user_id = target_user_id;

    INSERT INTO public.staff_profiles (
      user_id,
      first_name,
      last_name,
      phone,
      job_title,
      department,
      can_manage_inventory,
      can_manage_orders,
      can_manage_clients,
      can_manage_billing
    )
    VALUES (
      target_user_id,
      COALESCE(first_name, 'New'),
      COALESCE(last_name, CASE WHEN new_role = 'admin' THEN 'Admin' ELSE 'Staff' END),
      phone,
      COALESCE(job_title, CASE WHEN new_role = 'admin' THEN 'Administrator' ELSE 'Staff member' END),
      department,
      can_manage_inventory OR new_role = 'admin',
      can_manage_orders OR new_role = 'admin',
      can_manage_clients OR new_role = 'admin',
      can_manage_billing OR new_role = 'admin'
    )
    ON CONFLICT (user_id) DO UPDATE
    SET
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      phone = EXCLUDED.phone,
      job_title = EXCLUDED.job_title,
      department = EXCLUDED.department,
      can_manage_inventory = EXCLUDED.can_manage_inventory,
      can_manage_orders = EXCLUDED.can_manage_orders,
      can_manage_clients = EXCLUDED.can_manage_clients,
      can_manage_billing = EXCLUDED.can_manage_billing,
      updated_at = NOW();
  END IF;

  RETURN updated_profile;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_staff_permissions(
  target_user_id UUID,
  can_manage_inventory BOOLEAN DEFAULT FALSE,
  can_manage_orders BOOLEAN DEFAULT FALSE,
  can_manage_clients BOOLEAN DEFAULT FALSE,
  can_manage_billing BOOLEAN DEFAULT FALSE
)
RETURNS public.staff_profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_staff public.staff_profiles;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'only admins can change staff permissions';
  END IF;

  UPDATE public.staff_profiles
  SET
    can_manage_inventory = set_staff_permissions.can_manage_inventory,
    can_manage_orders = set_staff_permissions.can_manage_orders,
    can_manage_clients = set_staff_permissions.can_manage_clients,
    can_manage_billing = set_staff_permissions.can_manage_billing,
    updated_at = NOW()
  WHERE user_id = target_user_id
  RETURNING * INTO updated_staff;

  IF updated_staff.user_id IS NULL THEN
    RAISE EXCEPTION 'target user does not have a staff profile';
  END IF;

  RETURN updated_staff;
END;
$$;

REVOKE ALL ON FUNCTION public.promote_user_role(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, BOOLEAN, BOOLEAN, BOOLEAN) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.set_staff_permissions(UUID, BOOLEAN, BOOLEAN, BOOLEAN, BOOLEAN) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.promote_user_role(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN, BOOLEAN, BOOLEAN, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_staff_permissions(UUID, BOOLEAN, BOOLEAN, BOOLEAN, BOOLEAN) TO authenticated;
