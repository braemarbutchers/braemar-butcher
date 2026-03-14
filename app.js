const fallbackProducts = [
  {
    id: "steak-pie",
    name: "Family Steak Pie",
    description: "Rich braising steak in gravy, prepared for oven finishing at home.",
    price: 12.5,
    badge: "Counter favourite",
    stockImpact: 1,
    art:
      "linear-gradient(135deg, rgba(81, 16, 25, 0.3), rgba(81, 16, 25, 0.72)), url('https://images.pexels.com/photos/7368042/pexels-photo-7368042.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
  },
  {
    id: "sausages",
    name: "Davidson's Pork Sausages",
    description: "Traditional butcher's sausages for breakfasts, trays and freezer stock.",
    price: 5.95,
    badge: "Everyday staple",
    stockImpact: 2,
    art:
      "linear-gradient(135deg, rgba(81, 16, 25, 0.24), rgba(81, 16, 25, 0.76)), url('https://images.pexels.com/photos/32368179/pexels-photo-32368179.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
  },
  {
    id: "venison-box",
    name: "Braemar Venison Box",
    description: "Seasonal venison cuts selected for slow cooking and roasting.",
    price: 38.0,
    badge: "Seasonal",
    stockImpact: 2,
    art:
      "linear-gradient(135deg, rgba(81, 16, 25, 0.3), rgba(81, 16, 25, 0.72)), url('https://images.pexels.com/photos/12884549/pexels-photo-12884549.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
  },
  {
    id: "lamb-loin",
    name: "Lamb Loin Chops",
    description: "Tender lamb chops hand-cut for the counter and weekend orders.",
    price: 12.5,
    badge: "Weekend special",
    stockImpact: 1,
    art:
      "linear-gradient(135deg, rgba(81, 16, 25, 0.24), rgba(81, 16, 25, 0.76)), url('https://images.pexels.com/photos/29834284/pexels-photo-29834284.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
  },
  {
    id: "breakfast-pack",
    name: "Breakfast Pack",
    description: "Sausage, black pudding, dry cure bacon and haggis slices.",
    price: 22.0,
    badge: "Braemar mornings",
    stockImpact: 3,
    art:
      "linear-gradient(135deg, rgba(81, 16, 25, 0.28), rgba(81, 16, 25, 0.74)), url('https://images.pexels.com/photos/29834275/pexels-photo-29834275.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
  },
  {
    id: "haggis",
    name: "Traditional Haggis",
    description: "Prepared for local customers wanting a dependable Scottish staple.",
    price: 7.5,
    badge: "Local favourite",
    stockImpact: 1,
    art:
      "linear-gradient(135deg, rgba(81, 16, 25, 0.24), rgba(81, 16, 25, 0.76)), url('https://images.pexels.com/photos/5045090/pexels-photo-5045090.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
  },
  {
    id: "sirloin-box",
    name: "Sirloin Family Box",
    description: "Sharing steaks and roasting cuts packed for collection or delivery.",
    price: 44.0,
    badge: "Family order",
    stockImpact: 2,
    art:
      "linear-gradient(135deg, rgba(81, 16, 25, 0.26), rgba(81, 16, 25, 0.74)), url('https://images.pexels.com/photos/12884549/pexels-photo-12884549.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
  },
];

const inventory = [
  { sku: "DB-PIE-01", product: "Family Steak Pie", onHand: 8, threshold: 10 },
  { sku: "DB-SAU-02", product: "Davidson's Pork Sausages", onHand: 24, threshold: 12 },
  { sku: "DB-VEN-04", product: "Braemar Venison Box", onHand: 11, threshold: 8 },
  { sku: "BB-LAM-02", product: "Lamb Loin Chops", onHand: 5, threshold: 6 },
  { sku: "DB-BRK-06", product: "Breakfast Pack", onHand: 16, threshold: 9 },
  { sku: "DB-HAG-03", product: "Traditional Haggis", onHand: 14, threshold: 8 },
  { sku: "DB-SIR-05", product: "Sirloin Family Box", onHand: 8, threshold: 6 },
];

const batches = [
  {
    id: "DB-260313-PIE",
    product: "Family Steak Pie",
    origin: "Braemar Production Kitchen",
    animalId: "BEEF-TRIM-4421",
    status: "Packed",
    yield: "28 pies",
    timeline: [
      { label: "Trim allocation", detail: "Beef trim released from morning cutting list into pie production.", time: "06:15" },
      { label: "Cook room", detail: "Pie filling cooked and logged against batch recipe sheet.", time: "07:05" },
      { label: "Assembly", detail: "Pastry lids sealed and portion count confirmed by station 2.", time: "09:20" },
      { label: "Packaging", detail: "Counter labels applied and pies transferred to chilled finished goods.", time: "11:10" },
    ],
  },
  {
    id: "DB-260313-LM",
    product: "Lamb Loin Chops",
    origin: "Braeside Lamb",
    animalId: "UK7720 900122",
    status: "Picked",
    yield: "19 trays",
    timeline: [
      { label: "Farm intake", detail: "Collected from Braeside Lamb with movement docs verified.", time: "05:40" },
      { label: "Boning", detail: "Trimmed and frenched for retail packs.", time: "08:10" },
      { label: "Packing", detail: "Retail labels allocated to lot 19.", time: "10:25" },
      { label: "Picking", detail: "Reserved for webshop orders and two trade accounts.", time: "13:00" },
    ],
  },
  {
    id: "DB-260313-VN",
    product: "Braemar Venison Box",
    origin: "Mar Lodge Estate",
    animalId: "ESTATE-VN-184",
    status: "Awaiting dispatch",
    yield: "12 boxes",
    timeline: [
      { label: "Field collection", detail: "Estate batch logged with stalker ID and timestamp.", time: "04:55" },
      { label: "Inspection", detail: "Game handling check complete before breakdown.", time: "06:45" },
      { label: "Box assembly", detail: "Mixed cuts allocated to 12 webshop boxes.", time: "10:40" },
      { label: "Dispatch ready", detail: "Stored in courier bay for next-day chilled collection.", time: "14:15" },
    ],
  },
];

let products = [...fallbackProducts];
let deliveryOrders = [
  {
    id: "DEL-001",
    orderNumber: "ORD-20260314-002",
    orderStatus: "confirmed",
    requestedFor: "2026-03-14T09:00:00Z",
    customerName: "The Fife Arms",
    contactName: "Kitchen Office",
    phone: "01339 720200",
    totalAmount: 94.5,
    deliveryAmount: 6.5,
    note: "Deliver to kitchen loading bay before 11am.",
    address: {
      line1: "Mar Road",
      line2: "",
      city: "Braemar",
      county: "Aberdeenshire",
      postcode: "AB35 5YN",
      instructions: "Kitchen loading bay.",
    },
  },
  {
    id: "DEL-002",
    orderNumber: "ORD-20260314-003",
    orderStatus: "ready",
    requestedFor: "2026-03-14T09:30:00Z",
    customerName: "Morrone Lodge",
    contactName: "House Manager",
    phone: "01339 741455",
    totalAmount: 52.4,
    deliveryAmount: 6.5,
    note: "Ring side entrance on arrival.",
    address: {
      line1: "27 Glenshee Road",
      line2: "",
      city: "Braemar",
      county: "Aberdeenshire",
      postcode: "AB35 5YQ",
      instructions: "Use side entrance.",
    },
  },
  {
    id: "DEL-003",
    orderNumber: "ORD-20260314-004",
    orderStatus: "preparing",
    requestedFor: "2026-03-14T10:15:00Z",
    customerName: "Invercauld Cottage",
    contactName: "Mrs Fraser",
    phone: "07700 900455",
    totalAmount: 38.0,
    deliveryAmount: 6.5,
    note: "Leave in cool box by porch if nobody answers.",
    address: {
      line1: "Invercauld Road",
      line2: "",
      city: "Braemar",
      county: "Aberdeenshire",
      postcode: "AB35 5YP",
      instructions: "Cool box at porch.",
    },
  },
];

const basket = new Map();
const stockActivity = [
  { time: "14:02", message: "Breakfast Pack allocation updated for Saturday village delivery run." },
  { time: "13:26", message: "Family Steak Pie production booked into chilled counter stock." },
];

const productGrid = document.getElementById("product-grid");
const featuredGrid = document.getElementById("featured-grid");
const basketItems = document.getElementById("basket-items");
const basketSummary = document.getElementById("basket-summary");
const subtotalValue = document.getElementById("subtotal-value");
const totalValue = document.getElementById("total-value");
const inventoryTable = document.getElementById("inventory-table");
const stockProduct = document.getElementById("stock-product");
const stockActivityLog = document.getElementById("stock-activity");
const batchList = document.getElementById("batch-list");
const traceTitle = document.getElementById("trace-title");
const traceMeta = document.getElementById("trace-meta");
const traceTimeline = document.getElementById("trace-timeline");
const deliveryDateInput = document.getElementById("delivery-date");
const deliverySummary = document.getElementById("delivery-summary");
const deliveryList = document.getElementById("delivery-list");
const routeBadge = document.getElementById("route-badge");
const routeOverview = document.getElementById("route-overview");
const routeList = document.getElementById("route-list");
const shopHeading = document.querySelector("#shop .section-heading h3");
const heroText = document.querySelector(".retail-section .section-heading .eyebrow");

function slugifyProductName(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildProductArt(index) {
  const artOptions = [
    "linear-gradient(135deg, rgba(81, 16, 25, 0.3), rgba(81, 16, 25, 0.72)), url('https://images.pexels.com/photos/7368042/pexels-photo-7368042.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
    "linear-gradient(135deg, rgba(81, 16, 25, 0.24), rgba(81, 16, 25, 0.76)), url('https://images.pexels.com/photos/32368179/pexels-photo-32368179.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
    "linear-gradient(135deg, rgba(81, 16, 25, 0.3), rgba(81, 16, 25, 0.72)), url('https://images.pexels.com/photos/12884549/pexels-photo-12884549.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
    "linear-gradient(135deg, rgba(81, 16, 25, 0.24), rgba(81, 16, 25, 0.76)), url('https://images.pexels.com/photos/29834284/pexels-photo-29834284.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
    "linear-gradient(135deg, rgba(81, 16, 25, 0.28), rgba(81, 16, 25, 0.74)), url('https://images.pexels.com/photos/29834275/pexels-photo-29834275.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
    "linear-gradient(135deg, rgba(81, 16, 25, 0.24), rgba(81, 16, 25, 0.76)), url('https://images.pexels.com/photos/5045090/pexels-photo-5045090.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover",
  ];

  return artOptions[index % artOptions.length];
}

function deriveBadge(product, index) {
  if (/venison/i.test(product.name)) {
    return "Seasonal";
  }

  if (/sausage/i.test(product.name)) {
    return "Everyday staple";
  }

  if (/pie/i.test(product.name)) {
    return "Counter favourite";
  }

  if (/breakfast/i.test(product.name)) {
    return "Braemar mornings";
  }

  return index < 3 ? "Popular line" : "Butcher's selection";
}

function normalizeSupabaseProducts(rows) {
  return rows.map((row, index) => ({
    id: slugifyProductName(row.sku || row.name || `product-${index + 1}`),
    sku: row.sku,
    name: row.name,
    description: row.description || "Prepared fresh for local collection or delivery.",
    price: Number(row.price),
    badge: deriveBadge(row, index),
    stockImpact: 1,
    art: buildProductArt(index),
  }));
}

function syncInventoryWithProducts() {
  const thresholdsBySku = new Map(
    inventory.map((item) => [item.sku, { onHand: item.onHand, threshold: item.threshold }]),
  );

  inventory.length = 0;

  products.forEach((product, index) => {
    const existing = thresholdsBySku.get(product.sku);
    inventory.push({
      sku: product.sku || `SKU-${index + 1}`,
      product: product.name,
      onHand: existing?.onHand ?? Math.max(6, 18 - index * 2),
      threshold: existing?.threshold ?? Math.max(4, 10 - index),
    });
  });
}

function formatDateForInput(value) {
  if (typeof value === "string") {
    const matchedDate = value.match(/^(\d{4}-\d{2}-\d{2})/);
    if (matchedDate) {
      return matchedDate[1];
    }
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDeliveryWindow(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unscheduled";
  }

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });
}

function formatRouteDate(value) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "Europe/London",
    }).format(new Date(Date.UTC(year, month - 1, day)));
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Selected day";
  }

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/London",
  });
}

function titleCaseStatus(value) {
  return String(value || "pending")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getDeliveryCoordinates(delivery) {
  const knownLocations = {
    "AB35 5YN": { lat: 57.005, lng: -3.396 },
    "AB35 5YQ": { lat: 57.004, lng: -3.381 },
    "AB35 5YP": { lat: 57.002, lng: -3.365 },
    "AB35 5YT": { lat: 57.006, lng: -3.401 },
  };

  const postcode = delivery.address?.postcode?.toUpperCase();
  if (postcode && knownLocations[postcode]) {
    return knownLocations[postcode];
  }

  const hashSeed = `${delivery.address?.line1 || ""}${postcode || delivery.customerName}`;
  const hash = Array.from(hashSeed).reduce((total, character) => total + character.charCodeAt(0), 0);

  return {
    lat: 57 + (hash % 18) / 1000,
    lng: -3.42 + (hash % 26) / 1000,
  };
}

function estimateLegDistanceKm(from, to) {
  const latKm = (to.lat - from.lat) * 111;
  const lngKm = (to.lng - from.lng) * 67;
  return Math.sqrt(latKm * latKm + lngKm * lngKm);
}

function buildOptimizedRoute(deliveries) {
  const depot = { lat: 57.0066, lng: -3.3978 };
  const remaining = deliveries.map((delivery) => ({
    ...delivery,
    coordinates: getDeliveryCoordinates(delivery),
  }));
  const route = [];
  let current = depot;

  while (remaining.length) {
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    remaining.forEach((delivery, index) => {
      const distance = estimateLegDistanceKm(current, delivery.coordinates);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    const [nextStop] = remaining.splice(closestIndex, 1);
    route.push({
      ...nextStop,
      legDistanceKm: closestDistance,
    });
    current = nextStop.coordinates;
  }

  const startMinutes = 9 * 60;
  let runningMinutes = startMinutes;
  let totalDistance = 0;

  return route.map((delivery, index) => {
    const travelMinutes = index === 0 ? 8 : Math.max(4, Math.round(delivery.legDistanceKm * 4));
    runningMinutes += travelMinutes;
    totalDistance += delivery.legDistanceKm;

    const eta = `${String(Math.floor(runningMinutes / 60)).padStart(2, "0")}:${String(runningMinutes % 60).padStart(2, "0")}`;
    runningMinutes += 10;

    return {
      ...delivery,
      stopNumber: index + 1,
      eta,
      legDistanceKm: delivery.legDistanceKm,
      totalDistanceKm: totalDistance,
    };
  });
}

function getSelectedDeliveryDate() {
  return deliveryDateInput?.value || formatDateForInput(deliveryOrders[0]?.requestedFor || new Date());
}

function getDeliveriesForDate(dateValue) {
  return deliveryOrders
    .filter((delivery) => formatDateForInput(delivery.requestedFor) === dateValue)
    .sort((first, second) => new Date(first.requestedFor) - new Date(second.requestedFor));
}

function normalizeLiveDeliveries(rows) {
  return rows.map((row) => {
    const items = Array.isArray(row.order_items) ? row.order_items : [];
    const itemSummary = items
      .map((item) => {
        const productName = item.products?.name;
        if (!productName) {
          return "";
        }

        return `${item.quantity} x ${productName}`;
      })
      .filter(Boolean)
      .join(", ");

    return {
      id: row.id,
      orderNumber: row.order_number,
      orderStatus: row.order_status,
      requestedFor: row.requested_for,
      customerName: row.client?.business_name || row.client?.contact_name || "Delivery customer",
      contactName: row.client?.contact_name || row.delivery_address?.recipient_name || "Delivery contact",
      phone: row.client?.phone || "",
      totalAmount: Number(row.total_amount || 0),
      deliveryAmount: Number(row.delivery_amount || 0),
      note: row.internal_note || row.customer_note || itemSummary || "No delivery notes.",
      address: {
        line1: row.delivery_address?.line_1 || "",
        line2: row.delivery_address?.line_2 || "",
        city: row.delivery_address?.city || "",
        county: row.delivery_address?.county || "",
        postcode: row.delivery_address?.postcode || "",
        instructions: row.delivery_address?.delivery_instructions || "",
      },
    };
  });
}

async function getSupabaseConfig() {
  const response = await fetch("/api/config");
  if (!response.ok) {
    throw new Error("Unable to load Supabase configuration.");
  }

  return response.json();
}

async function fetchLiveProducts() {
  const config = await getSupabaseConfig();
  const supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseKey);
  const { data, error } = await supabase
    .from("products")
    .select("sku, name, description, price")
    .eq("is_active", true)
    .order("name");

  if (error) {
    throw error;
  }

  if (Array.isArray(data) && data.length) {
    products = normalizeSupabaseProducts(data);
    syncInventoryWithProducts();
  }
}

async function fetchLiveDeliveries() {
  const config = await getSupabaseConfig();
  const supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseKey);
  const { data, error } = await supabase
    .from("customer_orders")
    .select(
      `
        id,
        order_number,
        order_status,
        requested_for,
        total_amount,
        delivery_amount,
        customer_note,
        internal_note,
        client:client_profiles!customer_orders_client_user_id_fkey(contact_name, business_name, phone),
        delivery_address:client_addresses!customer_orders_delivery_address_id_fkey(
          recipient_name,
          line_1,
          line_2,
          city,
          county,
          postcode,
          delivery_instructions
        ),
        order_items(
          quantity,
          products(name)
        )
      `,
    )
    .eq("fulfilment_method", "delivery")
    .in("order_status", ["confirmed", "preparing", "ready"])
    .order("requested_for", { ascending: true });

  if (error) {
    throw error;
  }

  if (Array.isArray(data) && data.length) {
    deliveryOrders = normalizeLiveDeliveries(data);
  }
}

function setActiveTab(tabName) {
  document.querySelectorAll(".tab").forEach((button) => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
  document.getElementById(`${tabName}-panel`).classList.add("active");
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

function getInventoryStatus(item) {
  if (item.onHand <= item.threshold - 1) {
    return { label: "Low", className: "danger" };
  }

  if (item.onHand <= item.threshold + 2) {
    return { label: "Watch", className: "warn" };
  }

  return { label: "Healthy", className: "ok" };
}

function productCardTemplate(product, withButton = true) {
  return `
    <article class="product-card">
      <div class="product-art" style="background:${product.art}">
        ${product.name}
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span class="pill">${product.badge}</span>
          <span class="price">${formatCurrency(product.price)}</span>
        </div>
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        ${
          withButton
            ? `<button class="button primary full-width" data-add="${product.id}">Add to basket</button>`
            : ""
        }
      </div>
    </article>
  `;
}

function renderProducts() {
  if (!productGrid) {
    return;
  }

  productGrid.innerHTML = products
    .map(
      (product) => productCardTemplate(product),
    )
    .join("");
}

function renderBasket() {
  if (!basketSummary || !basketItems || !subtotalValue || !totalValue) {
    return;
  }

  const entries = Array.from(basket.entries());
  const itemCount = entries.reduce((sum, [, qty]) => sum + qty, 0);
  const subtotal = entries.reduce((sum, [id, qty]) => {
    const product = products.find((entry) => entry.id === id);
    if (!product) {
      return sum;
    }
    return sum + product.price * qty;
  }, 0);
  const delivery = 6.5;
  const total = subtotal + delivery;

  basketSummary.innerHTML = `
    <span>Basket</span>
    <strong>${itemCount} ${itemCount === 1 ? "item" : "items"}</strong>
    <span>${formatCurrency(subtotal)}</span>
  `;

  subtotalValue.textContent = formatCurrency(subtotal);
  totalValue.textContent = formatCurrency(total);

  if (!entries.length) {
    basketItems.innerHTML = `<div class="basket-empty">Add products from the shop to prepare a sample order.</div>`;
    return;
  }

  basketItems.innerHTML = entries
    .map(([id, qty]) => {
      const product = products.find((entry) => entry.id === id);
      if (!product) {
        return "";
      }
      return `
        <div class="basket-line">
          <div>
            <strong>${product.name}</strong>
            <div>${qty} x ${formatCurrency(product.price)}</div>
          </div>
          <strong>${formatCurrency(product.price * qty)}</strong>
        </div>
      `;
    })
    .join("");
}

function renderInventory() {
  if (!inventoryTable || !stockProduct) {
    return;
  }

  inventoryTable.innerHTML = inventory
    .map((item) => {
      const status = getInventoryStatus(item);
      return `
        <tr>
          <td>${item.sku}</td>
          <td>${item.product}</td>
          <td>${item.onHand}</td>
          <td>${item.threshold}</td>
          <td><span class="status ${status.className}">${status.label}</span></td>
        </tr>
      `;
    })
    .join("");

  stockProduct.innerHTML = inventory
    .map((item) => `<option value="${item.product}">${item.product}</option>`)
    .join("");
}

function renderStockActivity() {
  if (!stockActivityLog) {
    return;
  }

  stockActivityLog.innerHTML = stockActivity
    .map((entry) => `<div><strong>${entry.time}</strong><br />${entry.message}</div>`)
    .join("");
}

function renderDeliveries() {
  if (!deliverySummary || !deliveryList || !routeOverview || !routeList || !routeBadge) {
    return;
  }

  const selectedDate = getSelectedDeliveryDate();
  const deliveriesForDay = getDeliveriesForDate(selectedDate);
  const route = buildOptimizedRoute(deliveriesForDay);
  const totalValue = deliveriesForDay.reduce((sum, delivery) => sum + delivery.totalAmount, 0);
  const totalDistance = route.reduce((sum, delivery) => sum + delivery.legDistanceKm, 0);

  deliverySummary.innerHTML = `
    <article class="delivery-stat">
      <span>Booked stops</span>
      <strong>${deliveriesForDay.length}</strong>
    </article>
    <article class="delivery-stat">
      <span>Route day</span>
      <strong>${formatRouteDate(selectedDate)}</strong>
    </article>
    <article class="delivery-stat">
      <span>Order value</span>
      <strong>${formatCurrency(totalValue)}</strong>
    </article>
  `;

  if (!deliveriesForDay.length) {
    routeBadge.textContent = "No deliveries";
    deliveryList.innerHTML = `<div class="empty-state">No delivery orders are booked for this date.</div>`;
    routeOverview.innerHTML = `<div class="empty-state">Choose another date to build a route.</div>`;
    routeList.innerHTML = "";
    return;
  }

  routeBadge.textContent = `${route.length} stop${route.length === 1 ? "" : "s"}`;
  deliveryList.innerHTML = route
    .map(
      (delivery) => `
        <article class="delivery-card">
          <div class="delivery-card-head">
            <div>
              <p class="eyebrow">Stop ${delivery.stopNumber}</p>
              <h5>${delivery.customerName}</h5>
            </div>
            <span class="pill">${titleCaseStatus(delivery.orderStatus)}</span>
          </div>
          <div class="delivery-card-meta">
            <div><strong>${delivery.orderNumber}</strong><br />${formatDeliveryWindow(delivery.requestedFor)} requested</div>
            <div><strong>${delivery.contactName}</strong><br />${delivery.phone || "Phone not recorded"}</div>
            <div><strong>${formatCurrency(delivery.totalAmount)}</strong><br />${delivery.address.postcode}</div>
          </div>
          <p class="delivery-address">
            ${delivery.address.line1}${delivery.address.line2 ? `, ${delivery.address.line2}` : ""}, ${delivery.address.city}
          </p>
          <p class="delivery-note">${delivery.address.instructions || delivery.note}</p>
        </article>
      `,
    )
    .join("");

  routeOverview.innerHTML = `
    <div class="route-stat">
      <span>Departure</span>
      <strong>09:00 from shop</strong>
    </div>
    <div class="route-stat">
      <span>Estimated route</span>
      <strong>${totalDistance.toFixed(1)} km</strong>
    </div>
    <div class="route-stat">
      <span>Final ETA</span>
      <strong>${route[route.length - 1].eta}</strong>
    </div>
  `;

  routeList.innerHTML = route
    .map(
      (delivery) => `
        <li>
          <div class="route-stop-index">${delivery.stopNumber}</div>
          <div class="route-stop-copy">
            <strong>${delivery.customerName}</strong>
            <span>${delivery.address.line1}, ${delivery.address.postcode}</span>
            <span>ETA ${delivery.eta} · ${delivery.legDistanceKm.toFixed(1)} km from previous stop</span>
          </div>
        </li>
      `,
    )
    .join("");
}

function renderBatches(activeBatchId = batches[0].id) {
  if (!batchList) {
    return;
  }

  batchList.innerHTML = batches
    .map(
      (batch) => `
        <article class="batch-card ${batch.id === activeBatchId ? "active" : ""}" data-batch="${batch.id}">
          <div class="batch-header">
            <h5>${batch.product}</h5>
            <span class="pill">${batch.status}</span>
          </div>
          <p><strong>${batch.id}</strong></p>
          <p>Origin: ${batch.origin}</p>
          <p>Yield: ${batch.yield}</p>
        </article>
      `,
    )
    .join("");

  renderTraceDetails(activeBatchId);
}

function renderTraceDetails(batchId) {
  if (!traceTitle || !traceMeta || !traceTimeline) {
    return;
  }

  const batch = batches.find((entry) => entry.id === batchId);
  if (!batch) {
    return;
  }

  traceTitle.textContent = `${batch.product} · ${batch.id}`;
  traceMeta.innerHTML = `
    <div><strong>Origin</strong><br />${batch.origin}</div>
    <div><strong>Animal ID</strong><br />${batch.animalId}</div>
    <div><strong>Yield</strong><br />${batch.yield}</div>
  `;
  traceTimeline.innerHTML = batch.timeline
    .map(
      (entry) => `
        <li>
          <strong>${entry.label} <span>${entry.time}</span></strong>
          <div>${entry.detail}</div>
        </li>
      `,
    )
    .join("");
}

function updateLabelPreview(formData) {
  if (!document.getElementById("preview-product")) {
    return;
  }

  document.getElementById("preview-product").textContent = formData.product;
  document.getElementById("preview-batch").textContent = formData.batch;
  document.getElementById("preview-packed").textContent = formData.packed;
  document.getElementById("preview-useby").textContent = formData.useby;
  document.getElementById("preview-weight").textContent = formData.weight;
  document.getElementById("preview-price").textContent = formData.price;
}

function renderFeaturedProducts() {
  if (!featuredGrid) {
    return;
  }

  featuredGrid.innerHTML = products.slice(0, 3).map((product) => productCardTemplate(product, false)).join("");
}

function renderStorefront() {
  renderProducts();
  renderFeaturedProducts();
  renderBasket();
  renderDeliveries();
  renderInventory();
  renderStockActivity();
  renderBatches();
}

function showLiveDataState(isLive) {
  if (heroText && featuredGrid) {
    heroText.textContent = isLive ? "Live from Supabase" : "Popular lines";
  }

  if (shopHeading) {
    shopHeading.textContent = isLive
      ? "Prepared for Braemar delivery or collection"
      : "Prepared for Braemar delivery or collection";
  }
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    const productId = addButton.getAttribute("data-add");
    basket.set(productId, (basket.get(productId) || 0) + 1);
    renderBasket();

    const inventoryItem = inventory.find((item) => {
      const product = products.find((entry) => entry.id === productId);
      return item.product === product.name;
    });
    if (inventoryItem) {
      inventoryItem.onHand = Math.max(0, inventoryItem.onHand - 1);
      renderInventory();
    }
  }

  const tabButton = event.target.closest(".tab");
  if (tabButton) {
    setActiveTab(tabButton.dataset.tab);
  }

  const batchCard = event.target.closest("[data-batch]");
  if (batchCard) {
    const batchId = batchCard.getAttribute("data-batch");
    renderBatches(batchId);
  }

  const tabLink = event.target.closest("[data-open-tab]");
  if (tabLink) {
    setActiveTab(tabLink.getAttribute("data-open-tab"));
  }
});

const stockForm = document.getElementById("stock-form");
if (stockForm) {
  stockForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const productName = stockProduct.value;
    const quantity = Number(document.getElementById("stock-quantity").value);
    const note = document.getElementById("stock-note").value.trim();
    const item = inventory.find((entry) => entry.product === productName);

    if (!item || quantity <= 0) {
      return;
    }

    item.onHand = Math.max(0, item.onHand - quantity);
    stockActivity.unshift({
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      message: `${productName}: ${quantity} units booked out. ${note || "No note provided."}`,
    });

    renderInventory();
    renderStockActivity();
  });
}

if (deliveryDateInput) {
  const preferredDate =
    formatDateForInput(
      deliveryOrders.find((delivery) => delivery.orderStatus !== "completed")?.requestedFor || deliveryOrders[0]?.requestedFor || new Date(),
    ) || formatDateForInput(new Date());

  deliveryDateInput.value = preferredDate;
  deliveryDateInput.addEventListener("change", () => {
    renderDeliveries();
  });
}

const labelForm = document.getElementById("label-form");
if (labelForm) {
  labelForm.addEventListener("submit", (event) => {
    event.preventDefault();

    updateLabelPreview({
      product: document.getElementById("label-product").value.trim(),
      batch: document.getElementById("label-batch").value.trim(),
      packed: document.getElementById("label-packed").value,
      useby: document.getElementById("label-useby").value,
      weight: document.getElementById("label-weight").value.trim(),
      price: document.getElementById("label-price").value.trim(),
    });
  });
}

const printButton = document.getElementById("print-label");
if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}

renderStorefront();
showLiveDataState(false);

fetchLiveProducts()
  .then(() => {
    renderStorefront();
    showLiveDataState(true);
  })
  .catch((error) => {
    console.error("Supabase product sync failed:", error);
  });

fetchLiveDeliveries()
  .then(() => {
    if (deliveryDateInput && !getDeliveriesForDate(deliveryDateInput.value).length) {
      deliveryDateInput.value = formatDateForInput(deliveryOrders[0]?.requestedFor || new Date());
    }

    renderDeliveries();
  })
  .catch((error) => {
    console.error("Supabase delivery sync failed:", error);
    renderDeliveries();
  });

if (window.location.hash === "#traceability") {
  setActiveTab("traceability");
}

if (window.location.hash === "#labels") {
  setActiveTab("labels");
}

if (window.location.hash === "#deliveries") {
  setActiveTab("deliveries");
}
