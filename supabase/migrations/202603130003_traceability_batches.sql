CREATE TABLE public.suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  supplier_code TEXT UNIQUE,
  approval_status TEXT NOT NULL DEFAULT 'approved'
    CHECK (approval_status IN ('approved', 'probation', 'blocked')),
  contact_name TEXT,
  contact_phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.inbound_lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL REFERENCES public.suppliers(id),
  intake_code TEXT NOT NULL UNIQUE,
  source_type TEXT NOT NULL
    CHECK (source_type IN ('animal', 'carcass', 'primal', 'boxed_meat', 'game', 'other')),
  species TEXT NOT NULL,
  cut_description TEXT,
  supplier_lot_code TEXT,
  movement_doc_ref TEXT,
  received_at TIMESTAMPTZ NOT NULL,
  received_weight_kg NUMERIC(10, 3) CHECK (received_weight_kg >= 0),
  use_by_date DATE,
  status TEXT NOT NULL DEFAULT 'available'
    CHECK (status IN ('available', 'quarantined', 'consumed', 'closed')),
  notes TEXT,
  created_by_user_id UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.source_animals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inbound_lot_id UUID NOT NULL REFERENCES public.inbound_lots(id) ON DELETE CASCADE,
  animal_identifier TEXT NOT NULL UNIQUE,
  passport_ref TEXT,
  slaughter_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.stock_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_code TEXT NOT NULL UNIQUE,
  batch_type TEXT NOT NULL CHECK (batch_type IN ('raw', 'wip', 'finished')),
  source_inbound_lot_id UUID REFERENCES public.inbound_lots(id),
  product_id UUID REFERENCES public.products(id),
  parent_batch_id UUID REFERENCES public.stock_batches(id),
  location_code TEXT NOT NULL DEFAULT 'CHILL',
  quantity NUMERIC(10, 3) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  unit TEXT NOT NULL DEFAULT 'kg',
  status TEXT NOT NULL DEFAULT 'available'
    CHECK (status IN ('available', 'allocated', 'consumed', 'waste', 'closed')),
  packed_on DATE,
  use_by_date DATE,
  created_by_user_id UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.stock_transformations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transformation_type TEXT NOT NULL
    CHECK (transformation_type IN ('breakdown', 'trim', 'mince', 'mix', 'cook', 'pack', 'repack', 'waste')),
  performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT,
  created_by_user_id UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.transformation_inputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transformation_id UUID NOT NULL REFERENCES public.stock_transformations(id) ON DELETE CASCADE,
  stock_batch_id UUID NOT NULL REFERENCES public.stock_batches(id),
  quantity NUMERIC(10, 3) NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (transformation_id, stock_batch_id)
);

CREATE TABLE public.transformation_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transformation_id UUID NOT NULL REFERENCES public.stock_transformations(id) ON DELETE CASCADE,
  stock_batch_id UUID NOT NULL REFERENCES public.stock_batches(id),
  quantity NUMERIC(10, 3) NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (transformation_id, stock_batch_id)
);

CREATE TABLE public.product_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id),
  stock_batch_id UUID NOT NULL UNIQUE REFERENCES public.stock_batches(id) ON DELETE CASCADE,
  retail_barcode TEXT,
  packed_quantity NUMERIC(10, 3) NOT NULL DEFAULT 0 CHECK (packed_quantity >= 0),
  packed_unit TEXT NOT NULL DEFAULT 'item',
  label_snapshot JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_by_user_id UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_batch_id UUID NOT NULL REFERENCES public.stock_batches(id) ON DELETE CASCADE,
  movement_type TEXT NOT NULL
    CHECK (movement_type IN ('intake', 'production_consume', 'production_output', 'sale_allocate', 'adjustment', 'waste')),
  quantity_delta NUMERIC(10, 3) NOT NULL,
  note TEXT,
  related_order_item_id UUID REFERENCES public.order_items(id) ON DELETE SET NULL,
  created_by_user_id UUID REFERENCES public.profiles(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.order_item_batch_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE CASCADE,
  product_batch_id UUID NOT NULL REFERENCES public.product_batches(id) ON DELETE CASCADE,
  quantity NUMERIC(10, 3) NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inbound_lots_supplier ON public.inbound_lots(supplier_id, received_at DESC);
CREATE INDEX idx_stock_batches_product ON public.stock_batches(product_id, batch_type, created_at DESC);
CREATE INDEX idx_stock_batches_inbound_lot ON public.stock_batches(source_inbound_lot_id, created_at DESC);
CREATE INDEX idx_product_batches_product ON public.product_batches(product_id, created_at DESC);
CREATE INDEX idx_inventory_movements_batch ON public.inventory_movements(stock_batch_id, created_at DESC);
CREATE INDEX idx_allocations_order_item ON public.order_item_batch_allocations(order_item_id);

CREATE TRIGGER set_suppliers_updated_at
BEFORE UPDATE ON public.suppliers
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_inbound_lots_updated_at
BEFORE UPDATE ON public.inbound_lots
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_stock_batches_updated_at
BEFORE UPDATE ON public.stock_batches
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_product_batches_updated_at
BEFORE UPDATE ON public.product_batches
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inbound_lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.source_animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_transformations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transformation_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transformation_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_item_batch_allocations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "traceability_inventory_staff_select_suppliers"
  ON public.suppliers
  FOR SELECT
  USING (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "traceability_inventory_staff_manage_suppliers"
  ON public.suppliers
  FOR ALL
  USING (public.staff_has_permission('inventory') OR public.is_admin())
  WITH CHECK (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "traceability_inventory_staff_select_inbound_lots"
  ON public.inbound_lots
  FOR SELECT
  USING (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "traceability_inventory_staff_manage_inbound_lots"
  ON public.inbound_lots
  FOR ALL
  USING (public.staff_has_permission('inventory') OR public.is_admin())
  WITH CHECK (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "traceability_inventory_staff_manage_source_animals"
  ON public.source_animals
  FOR ALL
  USING (public.staff_has_permission('inventory') OR public.is_admin())
  WITH CHECK (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "traceability_inventory_staff_manage_stock_batches"
  ON public.stock_batches
  FOR ALL
  USING (public.staff_has_permission('inventory') OR public.is_admin())
  WITH CHECK (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "traceability_inventory_staff_manage_stock_transformations"
  ON public.stock_transformations
  FOR ALL
  USING (public.staff_has_permission('inventory') OR public.is_admin())
  WITH CHECK (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "traceability_inventory_staff_manage_transformation_inputs"
  ON public.transformation_inputs
  FOR ALL
  USING (public.staff_has_permission('inventory') OR public.is_admin())
  WITH CHECK (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "traceability_inventory_staff_manage_transformation_outputs"
  ON public.transformation_outputs
  FOR ALL
  USING (public.staff_has_permission('inventory') OR public.is_admin())
  WITH CHECK (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "traceability_inventory_staff_manage_product_batches"
  ON public.product_batches
  FOR ALL
  USING (public.staff_has_permission('inventory') OR public.is_admin())
  WITH CHECK (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "traceability_inventory_staff_manage_inventory_movements"
  ON public.inventory_movements
  FOR ALL
  USING (public.staff_has_permission('inventory') OR public.is_admin())
  WITH CHECK (public.staff_has_permission('inventory') OR public.is_admin());

CREATE POLICY "traceability_staff_view_order_allocations"
  ON public.order_item_batch_allocations
  FOR SELECT
  USING (
    public.is_admin()
    OR public.staff_has_permission('inventory')
    OR public.staff_has_permission('orders')
    OR EXISTS (
      SELECT 1
      FROM public.order_items oi
      JOIN public.customer_orders o ON o.id = oi.order_id
      WHERE oi.id = order_item_batch_allocations.order_item_id
        AND public.owns_client_record(o.client_user_id)
    )
  );

CREATE POLICY "traceability_staff_manage_order_allocations"
  ON public.order_item_batch_allocations
  FOR ALL
  USING (public.staff_has_permission('inventory') OR public.staff_has_permission('orders') OR public.is_admin())
  WITH CHECK (public.staff_has_permission('inventory') OR public.staff_has_permission('orders') OR public.is_admin());
