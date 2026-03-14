INSERT INTO public.suppliers (
  id,
  name,
  supplier_code,
  approval_status,
  contact_name,
  contact_phone,
  notes
)
VALUES
  ('aaaaaaaa-1111-1111-1111-111111111111', 'Braemar Production Kitchen', 'SUP-BPK', 'approved', 'Fiona Grant', '01339 741206', 'Internal production source for cooked fillings and trim.'),
  ('aaaaaaaa-2222-2222-2222-222222222222', 'Braeside Farm', 'SUP-BSF', 'approved', 'Calum Fraser', '01339 741299', 'Regular lamb and pork supplier.'),
  ('aaaaaaaa-3333-3333-3333-333333333333', 'Mar Lodge Estate', 'SUP-MLE', 'approved', 'Estate Larder', '01339 720164', 'Estate venison supplier.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.inbound_lots (
  id,
  supplier_id,
  intake_code,
  source_type,
  species,
  cut_description,
  supplier_lot_code,
  movement_doc_ref,
  received_at,
  received_weight_kg,
  use_by_date,
  status,
  notes,
  created_by_user_id
)
VALUES
  (
    'bbbbbbbb-1111-1111-1111-111111111111',
    'aaaaaaaa-1111-1111-1111-111111111111',
    'INT-20260313-BEEF-01',
    'boxed_meat',
    'Beef',
    'Trim for pie filling',
    'BEEF-TRIM-4421',
    'MOVE-20260313-001',
    '2026-03-13 05:55:00+00',
    18.200,
    '2026-03-18',
    'consumed',
    'Trim released from cutting room into pie production.',
    NULL
  ),
  (
    'bbbbbbbb-2222-2222-2222-222222222222',
    'aaaaaaaa-2222-2222-2222-222222222222',
    'INT-20260313-PORK-01',
    'primal',
    'Pork',
    'Pork shoulder for sausage mix',
    'BRS-PK-2204',
    'MOVE-20260313-002',
    '2026-03-13 06:10:00+00',
    32.500,
    '2026-03-17',
    'available',
    'Checked in for sausage production and breakfast pack allocation.',
    NULL
  ),
  (
    'bbbbbbbb-3333-3333-3333-333333333333',
    'aaaaaaaa-3333-3333-3333-333333333333',
    'INT-20260313-VEN-01',
    'game',
    'Venison',
    'Mixed estate venison cuts',
    'ESTATE-VN-184',
    'GAME-20260313-001',
    '2026-03-13 04:55:00+00',
    32.400,
    '2026-03-17',
    'available',
    'Game handling inspection complete before breakdown.',
    NULL
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (
  id,
  sku,
  name,
  description,
  unit,
  price,
  is_active
)
VALUES
  ('55555555-5555-5555-5555-555555555551', 'DB-PIE-01', 'Family Steak Pie', 'Rich braising steak in gravy, prepared for oven finishing at home.', 'item', 12.50, TRUE),
  ('55555555-5555-5555-5555-555555555552', 'DB-SAU-02', 'Davidson''s Pork Sausages', 'Traditional butcher''s sausages for breakfasts, trays and freezer stock.', 'pack', 5.95, TRUE),
  ('55555555-5555-5555-5555-555555555553', 'DB-VEN-04', 'Braemar Venison Box', 'Seasonal venison cuts selected for slow cooking and roasting.', 'box', 38.00, TRUE),
  ('55555555-5555-5555-5555-555555555554', 'DB-BRK-06', 'Breakfast Pack', 'Sausage, black pudding, dry cure bacon and haggis slices.', 'pack', 22.00, TRUE)
ON CONFLICT (sku) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  unit = EXCLUDED.unit,
  price = EXCLUDED.price,
  is_active = EXCLUDED.is_active;

INSERT INTO public.source_animals (
  id,
  inbound_lot_id,
  animal_identifier,
  passport_ref,
  slaughter_date
)
VALUES
  ('cccccccc-1111-1111-1111-111111111111', 'bbbbbbbb-1111-1111-1111-111111111111', 'BEEF-TRIM-4421', NULL, '2026-03-12'),
  ('cccccccc-2222-2222-2222-222222222222', 'bbbbbbbb-2222-2222-2222-222222222222', 'UK-PORK-2204', NULL, '2026-03-12'),
  ('cccccccc-3333-3333-3333-333333333333', 'bbbbbbbb-3333-3333-3333-333333333333', 'ESTATE-VN-184', NULL, '2026-03-12')
ON CONFLICT (animal_identifier) DO NOTHING;

INSERT INTO public.stock_batches (
  id,
  batch_code,
  batch_type,
  source_inbound_lot_id,
  product_id,
  parent_batch_id,
  location_code,
  quantity,
  unit,
  status,
  packed_on,
  use_by_date,
  created_by_user_id
)
VALUES
  (
    'dddddddd-1111-1111-1111-111111111111',
    'RAW-20260313-BEEF-01',
    'raw',
    'bbbbbbbb-1111-1111-1111-111111111111',
    NULL,
    NULL,
    'CHILL',
    18.200,
    'kg',
    'consumed',
    NULL,
    '2026-03-18',
    NULL
  ),
  (
    'dddddddd-2222-2222-2222-222222222222',
    'RAW-20260313-PORK-01',
    'raw',
    'bbbbbbbb-2222-2222-2222-222222222222',
    NULL,
    NULL,
    'CHILL',
    32.500,
    'kg',
    'available',
    NULL,
    '2026-03-17',
    NULL
  ),
  (
    'dddddddd-3333-3333-3333-333333333333',
    'RAW-20260313-VEN-01',
    'raw',
    'bbbbbbbb-3333-3333-3333-333333333333',
    NULL,
    NULL,
    'CHILL',
    32.400,
    'kg',
    'available',
    NULL,
    '2026-03-17',
    NULL
  ),
  (
    'dddddddd-4444-4444-4444-444444444444',
    'DB-260313-PIE',
    'finished',
    'bbbbbbbb-1111-1111-1111-111111111111',
    '55555555-5555-5555-5555-555555555551',
    'dddddddd-1111-1111-1111-111111111111',
    'FINISHED_GOODS',
    28.000,
    'item',
    'available',
    '2026-03-13',
    '2026-03-20',
    NULL
  ),
  (
    'dddddddd-5555-5555-5555-555555555555',
    'DB-260313-SAU',
    'finished',
    'bbbbbbbb-2222-2222-2222-222222222222',
    '55555555-5555-5555-5555-555555555552',
    'dddddddd-2222-2222-2222-222222222222',
    'FINISHED_GOODS',
    64.000,
    'pack',
    'available',
    '2026-03-13',
    '2026-03-17',
    NULL
  ),
  (
    'dddddddd-6666-6666-6666-666666666666',
    'DB-260313-VEN',
    'finished',
    'bbbbbbbb-3333-3333-3333-333333333333',
    '55555555-5555-5555-5555-555555555553',
    'dddddddd-3333-3333-3333-333333333333',
    'FINISHED_GOODS',
    12.000,
    'box',
    'available',
    '2026-03-13',
    '2026-03-17',
    NULL
  ),
  (
    'dddddddd-7777-7777-7777-777777777777',
    'DB-260313-BRK',
    'finished',
    'bbbbbbbb-2222-2222-2222-222222222222',
    '55555555-5555-5555-5555-555555555554',
    'dddddddd-2222-2222-2222-222222222222',
    'FINISHED_GOODS',
    16.000,
    'pack',
    'available',
    '2026-03-13',
    '2026-03-16',
    NULL
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.stock_transformations (
  id,
  transformation_type,
  performed_at,
  notes,
  created_by_user_id
)
VALUES
  ('eeeeeeee-1111-1111-1111-111111111111', 'cook', '2026-03-13 07:05:00+00', 'Beef trim cooked into pie filling and packed into finished pies.', NULL),
  ('eeeeeeee-2222-2222-2222-222222222222', 'mix', '2026-03-13 08:20:00+00', 'Pork shoulder mixed into sausage run for retail packs.', NULL),
  ('eeeeeeee-3333-3333-3333-333333333333', 'pack', '2026-03-13 10:40:00+00', 'Mixed estate venison cuts packed into webshop boxes.', NULL),
  ('eeeeeeee-4444-4444-4444-444444444444', 'pack', '2026-03-13 09:10:00+00', 'Breakfast packs assembled from sausage run and breakfast counter stock.', NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.transformation_inputs (
  id,
  transformation_id,
  stock_batch_id,
  quantity
)
VALUES
  ('ffffffff-1111-1111-1111-111111111111', 'eeeeeeee-1111-1111-1111-111111111111', 'dddddddd-1111-1111-1111-111111111111', 18.200),
  ('ffffffff-2222-2222-2222-222222222222', 'eeeeeeee-2222-2222-2222-222222222222', 'dddddddd-2222-2222-2222-222222222222', 20.000),
  ('ffffffff-3333-3333-3333-333333333333', 'eeeeeeee-3333-3333-3333-333333333333', 'dddddddd-3333-3333-3333-333333333333', 32.400),
  ('ffffffff-4444-4444-4444-444444444444', 'eeeeeeee-4444-4444-4444-444444444444', 'dddddddd-2222-2222-2222-222222222222', 8.000)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.transformation_outputs (
  id,
  transformation_id,
  stock_batch_id,
  quantity
)
VALUES
  ('12121212-1111-1111-1111-111111111111', 'eeeeeeee-1111-1111-1111-111111111111', 'dddddddd-4444-4444-4444-444444444444', 28.000),
  ('12121212-2222-2222-2222-222222222222', 'eeeeeeee-2222-2222-2222-222222222222', 'dddddddd-5555-5555-5555-555555555555', 64.000),
  ('12121212-3333-3333-3333-333333333333', 'eeeeeeee-3333-3333-3333-333333333333', 'dddddddd-6666-6666-6666-666666666666', 12.000),
  ('12121212-4444-4444-4444-444444444444', 'eeeeeeee-4444-4444-4444-444444444444', 'dddddddd-7777-7777-7777-777777777777', 16.000)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.product_batches (
  id,
  product_id,
  stock_batch_id,
  retail_barcode,
  packed_quantity,
  packed_unit,
  label_snapshot,
  created_by_user_id
)
VALUES
  (
    '13131313-1111-1111-1111-111111111111',
    '55555555-5555-5555-5555-555555555551',
    'dddddddd-4444-4444-4444-444444444444',
    'DB-PIE-01',
    28.000,
    'item',
    '{"product":"Family Steak Pie","batch":"DB-260313-PIE","packedOn":"2026-03-13","useBy":"2026-03-20","weight":"28 pies","note":"Pie filling cooked and packed into chilled finished goods.","animalId":"BEEF-TRIM-4421","origin":"Braemar Production Kitchen","barcode":"DB-PIE-01"}'::jsonb,
    NULL
  ),
  (
    '13131313-2222-2222-2222-222222222222',
    '55555555-5555-5555-5555-555555555552',
    'dddddddd-5555-5555-5555-555555555555',
    'DB-SAU-02',
    64.000,
    'pack',
    '{"product":"Davidson''s Pork Sausages","batch":"DB-260313-SAU","packedOn":"2026-03-13","useBy":"2026-03-17","weight":"64 packs","note":"Pork shoulder mixed and packed into sausage retail trays.","animalId":"UK-PORK-2204","origin":"Braeside Farm","barcode":"DB-SAU-02"}'::jsonb,
    NULL
  ),
  (
    '13131313-3333-3333-3333-333333333333',
    '55555555-5555-5555-5555-555555555553',
    'dddddddd-6666-6666-6666-666666666666',
    'DB-VEN-04',
    12.000,
    'box',
    '{"product":"Braemar Venison Box","batch":"DB-260313-VEN","packedOn":"2026-03-13","useBy":"2026-03-17","weight":"12 boxes","note":"Mixed estate venison cuts allocated to webshop boxes.","animalId":"ESTATE-VN-184","origin":"Mar Lodge Estate","barcode":"DB-VEN-04"}'::jsonb,
    NULL
  ),
  (
    '13131313-4444-4444-4444-444444444444',
    '55555555-5555-5555-5555-555555555554',
    'dddddddd-7777-7777-7777-777777777777',
    'DB-BRK-06',
    16.000,
    'pack',
    '{"product":"Breakfast Pack","batch":"DB-260313-BRK","packedOn":"2026-03-13","useBy":"2026-03-16","weight":"16 packs","note":"Breakfast packs assembled for counter and hotel trade orders.","animalId":"UK-PORK-2204","origin":"Braeside Farm","barcode":"DB-BRK-06"}'::jsonb,
    NULL
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.inventory_movements (
  id,
  stock_batch_id,
  movement_type,
  quantity_delta,
  note,
  related_order_item_id,
  created_by_user_id
)
VALUES
  ('14141414-1111-1111-1111-111111111111', 'dddddddd-1111-1111-1111-111111111111', 'intake', 18.200, 'Beef trim intake booked into chill.', NULL, NULL),
  ('14141414-2222-2222-2222-222222222222', 'dddddddd-4444-4444-4444-444444444444', 'production_output', 28.000, 'Pie batch packed into finished goods.', NULL, NULL),
  ('14141414-3333-3333-3333-333333333333', 'dddddddd-5555-5555-5555-555555555555', 'production_output', 64.000, 'Sausage batch packed into retail packs.', NULL, NULL),
  ('14141414-4444-4444-4444-444444444444', 'dddddddd-6666-6666-6666-666666666666', 'production_output', 12.000, 'Venison boxes packed for webshop dispatch.', NULL, NULL),
  ('14141414-5555-5555-5555-555555555555', 'dddddddd-7777-7777-7777-777777777777', 'production_output', 16.000, 'Breakfast packs assembled and labelled.', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.order_item_batch_allocations (
  id,
  order_item_id,
  product_batch_id,
  quantity
)
SELECT
  allocation.id,
  allocation.order_item_id,
  allocation.product_batch_id,
  allocation.quantity
FROM (
  VALUES
    ('15151515-1111-1111-1111-111111111111'::uuid, '77777777-7777-7777-7777-777777777771'::uuid, '13131313-1111-1111-1111-111111111111'::uuid, 1.000::numeric),
    ('15151515-2222-2222-2222-222222222222'::uuid, '77777777-7777-7777-7777-777777777774'::uuid, '13131313-2222-2222-2222-222222222222'::uuid, 8.000::numeric),
    ('15151515-3333-3333-3333-333333333333'::uuid, '77777777-7777-7777-7777-777777777775'::uuid, '13131313-4444-4444-4444-444444444444'::uuid, 2.000::numeric)
) AS allocation(id, order_item_id, product_batch_id, quantity)
WHERE EXISTS (
  SELECT 1
  FROM public.order_items oi
  WHERE oi.id = allocation.order_item_id
)
  AND EXISTS (
    SELECT 1
    FROM public.product_batches pb
    WHERE pb.id = allocation.product_batch_id
  )
ON CONFLICT (id) DO NOTHING;
