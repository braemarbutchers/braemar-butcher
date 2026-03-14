INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  last_sign_in_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    '11111111-1111-1111-1111-111111111111',
    'authenticated',
    'authenticated',
    'admin@braemarbutcher.co.uk',
    crypt('ChangeMe123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"first_name":"Mairi","last_name":"Davidson","phone":"01339 741206","job_title":"Owner / Admin","department":"Management"}',
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-2222-2222-222222222221',
    'authenticated',
    'authenticated',
    'counter@braemarbutcher.co.uk',
    crypt('ChangeMe123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"first_name":"Ewan","last_name":"Stewart","phone":"01339 741206","job_title":"Counter Lead","department":"Retail"}',
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-2222-2222-222222222222',
    'authenticated',
    'authenticated',
    'production@braemarbutcher.co.uk',
    crypt('ChangeMe123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"first_name":"Fiona","last_name":"Grant","phone":"01339 741206","job_title":"Production Supervisor","department":"Production"}',
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '33333333-3333-3333-3333-333333333331',
    'authenticated',
    'authenticated',
    'alice.macleod@example.com',
    crypt('ChangeMe123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"contact_name":"Alice MacLeod","phone":"07700 900123","default_fulfilment_method":"collection"}',
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '33333333-3333-3333-3333-333333333332',
    'authenticated',
    'authenticated',
    'thefifearms@example.com',
    crypt('ChangeMe123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"contact_name":"Kitchen Office","business_name":"The Fife Arms","phone":"01339 720200","default_fulfilment_method":"delivery"}',
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );

INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
VALUES
  (
    'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    '11111111-1111-1111-1111-111111111111',
    '{"sub":"11111111-1111-1111-1111-111111111111","email":"admin@braemarbutcher.co.uk"}',
    'email',
    'admin@braemarbutcher.co.uk',
    NOW(),
    NOW(),
    NOW()
  ),
  (
    'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    '22222222-2222-2222-2222-222222222221',
    '{"sub":"22222222-2222-2222-2222-222222222221","email":"counter@braemarbutcher.co.uk"}',
    'email',
    'counter@braemarbutcher.co.uk',
    NOW(),
    NOW(),
    NOW()
  ),
  (
    'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3',
    '22222222-2222-2222-2222-222222222222',
    '{"sub":"22222222-2222-2222-2222-222222222222","email":"production@braemarbutcher.co.uk"}',
    'email',
    'production@braemarbutcher.co.uk',
    NOW(),
    NOW(),
    NOW()
  ),
  (
    'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4',
    '33333333-3333-3333-3333-333333333331',
    '{"sub":"33333333-3333-3333-3333-333333333331","email":"alice.macleod@example.com"}',
    'email',
    'alice.macleod@example.com',
    NOW(),
    NOW(),
    NOW()
  ),
  (
    'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5',
    '33333333-3333-3333-3333-333333333332',
    '{"sub":"33333333-3333-3333-3333-333333333332","email":"thefifearms@example.com"}',
    'email',
    'thefifearms@example.com',
    NOW(),
    NOW(),
    NOW()
  );

DELETE FROM public.client_profiles
WHERE user_id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222221',
  '22222222-2222-2222-2222-222222222222'
);

UPDATE public.profiles
SET role = 'admin'
WHERE user_id = '11111111-1111-1111-1111-111111111111';

UPDATE public.profiles
SET role = 'staff'
WHERE user_id IN (
  '22222222-2222-2222-2222-222222222221',
  '22222222-2222-2222-2222-222222222222'
);

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
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Mairi',
    'Davidson',
    '01339 741206',
    'Owner / Admin',
    'Management',
    TRUE,
    TRUE,
    TRUE,
    TRUE
  ),
  (
    '22222222-2222-2222-2222-222222222221',
    'Ewan',
    'Stewart',
    '01339 741206',
    'Counter Lead',
    'Retail',
    FALSE,
    TRUE,
    TRUE,
    TRUE
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Fiona',
    'Grant',
    '01339 741206',
    'Production Supervisor',
    'Production',
    TRUE,
    TRUE,
    FALSE,
    FALSE
  );

UPDATE public.client_profiles
SET
  account_code = 'CUST-0001',
  notes = 'Regular Saturday collection customer.'
WHERE user_id = '33333333-3333-3333-3333-333333333331';

UPDATE public.client_profiles
SET
  account_code = 'TRADE-0001',
  notes = 'Trade account requiring weekly invoice.'
WHERE user_id = '33333333-3333-3333-3333-333333333332';

INSERT INTO public.client_addresses (
  id,
  client_user_id,
  label,
  recipient_name,
  line_1,
  city,
  county,
  postcode,
  delivery_instructions,
  is_default_billing,
  is_default_delivery
)
VALUES
  (
    '44444444-4444-4444-4444-444444444441',
    '33333333-3333-3333-3333-333333333331',
    'Home',
    'Alice MacLeod',
    '12 Chapel Brae',
    'Braemar',
    'Aberdeenshire',
    'AB35 5YT',
    'Collect from front counter.',
    TRUE,
    TRUE
  ),
  (
    '44444444-4444-4444-4444-444444444442',
    '33333333-3333-3333-3333-333333333332',
    'Hotel Kitchen',
    'The Fife Arms Kitchen',
    'Mar Road',
    'Braemar',
    'Aberdeenshire',
    'AB35 5YN',
    'Deliver to kitchen loading bay before 11am.',
    TRUE,
    TRUE
  );

INSERT INTO public.products (id, sku, name, description, unit, price)
VALUES
  ('55555555-5555-5555-5555-555555555551', 'DB-PIE-01', 'Family Steak Pie', 'Rich braising steak in gravy, prepared for oven finishing at home.', 'item', 12.50),
  ('55555555-5555-5555-5555-555555555552', 'DB-SAU-02', 'Davidson''s Pork Sausages', 'Traditional butcher''s sausages for breakfasts, trays and freezer stock.', 'pack', 5.95),
  ('55555555-5555-5555-5555-555555555553', 'DB-VEN-04', 'Braemar Venison Box', 'Seasonal venison cuts selected for slow cooking and roasting.', 'box', 38.00),
  ('55555555-5555-5555-5555-555555555554', 'DB-BRK-06', 'Breakfast Pack', 'Sausage, black pudding, dry cure bacon and haggis slices.', 'pack', 22.00);

INSERT INTO public.customer_orders (
  id,
  order_number,
  client_user_id,
  created_by_user_id,
  fulfilment_method,
  order_status,
  requested_for,
  billing_address_id,
  delivery_address_id,
  customer_note,
  internal_note,
  subtotal_amount,
  delivery_amount,
  total_amount
)
VALUES
  (
    '66666666-6666-6666-6666-666666666661',
    'ORD-20260310-001',
    '33333333-3333-3333-3333-333333333331',
    '33333333-3333-3333-3333-333333333331',
    'collection',
    'completed',
    '2026-03-10 10:00:00+00',
    '44444444-4444-4444-4444-444444444441',
    '44444444-4444-4444-4444-444444444441',
    'Please hold until 11am collection.',
    'Packed and collected on time.',
    28.45,
    0.00,
    28.45
  ),
  (
    '66666666-6666-6666-6666-666666666662',
    'ORD-20260312-002',
    '33333333-3333-3333-3333-333333333332',
    '22222222-2222-2222-2222-222222222221',
    'delivery',
    'confirmed',
    '2026-03-14 09:00:00+00',
    '44444444-4444-4444-4444-444444444442',
    '44444444-4444-4444-4444-444444444442',
    'Weekly hotel breakfast order.',
    'Deliver with chilled van route A.',
    88.00,
    6.50,
    94.50
  );

INSERT INTO public.order_items (id, order_id, product_id, quantity, unit_price, line_total, note)
VALUES
  ('77777777-7777-7777-7777-777777777771', '66666666-6666-6666-6666-666666666661', '55555555-5555-5555-5555-555555555551', 1, 12.50, 12.50, NULL),
  ('77777777-7777-7777-7777-777777777772', '66666666-6666-6666-6666-666666666661', '55555555-5555-5555-5555-555555555552', 2, 5.95, 11.90, NULL),
  ('77777777-7777-7777-7777-777777777773', '66666666-6666-6666-6666-666666666661', '55555555-5555-5555-5555-555555555554', 1, 4.05, 4.05, 'Discounted add-on item'),
  ('77777777-7777-7777-7777-777777777774', '66666666-6666-6666-6666-666666666662', '55555555-5555-5555-5555-555555555552', 8, 5.95, 47.60, NULL),
  ('77777777-7777-7777-7777-777777777775', '66666666-6666-6666-6666-666666666662', '55555555-5555-5555-5555-555555555554', 2, 20.20, 40.40, 'Trade pricing applied');

INSERT INTO public.saved_lists (id, client_user_id, name, description, last_used_at)
VALUES
  (
    '88888888-8888-8888-8888-888888888881',
    '33333333-3333-3333-3333-333333333331',
    'Saturday staples',
    'Usual weekend family order.',
    '2026-03-10 10:00:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888882',
    '33333333-3333-3333-3333-333333333332',
    'Hotel breakfast',
    'Trade reorder list for hotel breakfast service.',
    '2026-03-12 08:00:00+00'
  );

INSERT INTO public.saved_list_items (saved_list_id, product_id, quantity, sort_order)
VALUES
  ('88888888-8888-8888-8888-888888888881', '55555555-5555-5555-5555-555555555551', 1, 1),
  ('88888888-8888-8888-8888-888888888881', '55555555-5555-5555-5555-555555555552', 2, 2),
  ('88888888-8888-8888-8888-888888888882', '55555555-5555-5555-5555-555555555552', 8, 1),
  ('88888888-8888-8888-8888-888888888882', '55555555-5555-5555-5555-555555555554', 2, 2);

INSERT INTO public.invoices (
  id,
  invoice_number,
  order_id,
  client_user_id,
  invoice_status,
  issued_at,
  due_at,
  paid_at,
  subtotal_amount,
  tax_amount,
  total_amount,
  balance_due
)
VALUES
  (
    '99999999-9999-9999-9999-999999999991',
    'INV-20260310-001',
    '66666666-6666-6666-6666-666666666661',
    '33333333-3333-3333-3333-333333333331',
    'paid',
    '2026-03-10 09:30:00+00',
    '2026-03-10 09:30:00+00',
    '2026-03-10 09:35:00+00',
    28.45,
    0.00,
    28.45,
    0.00
  ),
  (
    '99999999-9999-9999-9999-999999999992',
    'INV-20260312-002',
    '66666666-6666-6666-6666-666666666662',
    '33333333-3333-3333-3333-333333333332',
    'issued',
    '2026-03-12 12:00:00+00',
    '2026-03-19 12:00:00+00',
    NULL,
    88.00,
    0.00,
    94.50,
    94.50
  );

INSERT INTO public.invoice_items (invoice_id, order_item_id, description, quantity, unit_price, line_total)
VALUES
  ('99999999-9999-9999-9999-999999999991', '77777777-7777-7777-7777-777777777771', 'Family Steak Pie', 1, 12.50, 12.50),
  ('99999999-9999-9999-9999-999999999991', '77777777-7777-7777-7777-777777777772', 'Davidson''s Pork Sausages', 2, 5.95, 11.90),
  ('99999999-9999-9999-9999-999999999991', '77777777-7777-7777-7777-777777777773', 'Breakfast Pack discount line', 1, 4.05, 4.05),
  ('99999999-9999-9999-9999-999999999992', '77777777-7777-7777-7777-777777777774', 'Davidson''s Pork Sausages', 8, 5.95, 47.60),
  ('99999999-9999-9999-9999-999999999992', '77777777-7777-7777-7777-777777777775', 'Breakfast Pack trade order', 2, 20.20, 40.40),
  ('99999999-9999-9999-9999-999999999992', NULL, 'Local delivery', 1, 6.50, 6.50);

INSERT INTO public.invoice_payments (invoice_id, amount, payment_method, reference_code, paid_at, created_by_user_id)
VALUES
  ('99999999-9999-9999-9999-999999999991', 28.45, 'card', 'CARD-20260310-001', '2026-03-10 09:35:00+00', '22222222-2222-2222-2222-222222222221');
