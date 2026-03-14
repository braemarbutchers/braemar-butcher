const fallbackProducts = [
  {
    id: "steak-pie",
    sku: "DB-PIE-01",
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
    sku: "DB-SAU-02",
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
    sku: "DB-VEN-04",
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
    sku: "BB-LAM-02",
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
    sku: "DB-BRK-06",
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
    sku: "DB-HAG-03",
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
    sku: "DB-SIR-05",
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

const LOCAL_PRODUCTS_STORAGE_KEY = "braemar.customProducts";
const LOCAL_PRODUCT_IMAGES_STORAGE_KEY = "braemar.productImages";
const LOCAL_INBOUND_LOTS_STORAGE_KEY = "braemar.inboundLots";
const LOCAL_FINISHED_BATCHES_STORAGE_KEY = "braemar.finishedBatches";
const MAX_PRODUCT_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
const CODE39_PATTERNS = {
  "0": "nnnwwnwnn",
  "1": "wnnwnnnnw",
  "2": "nnwwnnnnw",
  "3": "wnwwnnnnn",
  "4": "nnnwwnnnw",
  "5": "wnnwwnnnn",
  "6": "nnwwwnnnn",
  "7": "nnnwnnwnw",
  "8": "wnnwnnwnn",
  "9": "nnwwnnwnn",
  A: "wnnnnwnnw",
  B: "nnwnnwnnw",
  C: "wnwnnwnnn",
  D: "nnnnwwnnw",
  E: "wnnnwwnnn",
  F: "nnwnwwnnn",
  G: "nnnnnwwnw",
  H: "wnnnnwwnn",
  I: "nnwnnwwnn",
  J: "nnnnwwwnn",
  K: "wnnnnnnww",
  L: "nnwnnnnww",
  M: "wnwnnnnwn",
  N: "nnnnwnnww",
  O: "wnnnwnnwn",
  P: "nnwnwnnwn",
  Q: "nnnnnnwww",
  R: "wnnnnnwwn",
  S: "nnwnnnwwn",
  T: "nnnnwnwwn",
  U: "wwnnnnnnw",
  V: "nwwnnnnnw",
  W: "wwwnnnnnn",
  X: "nwnnwnnnw",
  Y: "wwnnwnnnn",
  Z: "nwwnwnnnn",
  "-": "nwnnnnwnw",
  ".": "wwnnnnwnn",
  " ": "nwwnnnwnn",
  $: "nwnwnwnnn",
  "/": "nwnwnnnwn",
  "+": "nwnnnwnwn",
  "%": "nnnwnwnwn",
  "*": "nwnnwnwnn",
};

let products = [...fallbackProducts];
let liveProductsEnabled = false;
let traceabilityLiveEnabled = false;
let editingProductSku = "";
let inboundLots = [
  {
    id: "intake-braeside-lamb-260313",
    intakeCode: "INT-260313-LAMB-01",
    supplier: "Braeside Lamb",
    sourceType: "carcass",
    species: "Lamb",
    cutDescription: "Loin and saddle allocation",
    supplierLotCode: "BRS-LM-4421",
    animalId: "UK7720 900122",
    receivedAt: "2026-03-13",
    useBy: "2026-03-19",
    weightKg: 24.5,
    note: "Movement docs verified at intake and chill temp logged.",
    rawBatchCode: "RAW-260313-LM-01",
    status: "Available",
  },
  {
    id: "intake-braemar-beef-260313",
    intakeCode: "INT-260313-BEEF-01",
    supplier: "Braemar Production Kitchen",
    sourceType: "boxed_meat",
    species: "Beef",
    cutDescription: "Trim for pie filling",
    supplierLotCode: "BEEF-TRIM-4421",
    animalId: "BEEF-TRIM-4421",
    receivedAt: "2026-03-13",
    useBy: "2026-03-18",
    weightKg: 18.2,
    note: "Trim released from cutting room to cooked pie mix.",
    rawBatchCode: "RAW-260313-BF-01",
    status: "Consumed",
  },
  {
    id: "intake-mar-lodge-260313",
    intakeCode: "INT-260313-VEN-01",
    supplier: "Mar Lodge Estate",
    sourceType: "game",
    species: "Venison",
    cutDescription: "Mixed estate venison cuts",
    supplierLotCode: "ESTATE-VN-184",
    animalId: "ESTATE-VN-184",
    receivedAt: "2026-03-13",
    useBy: "2026-03-17",
    weightKg: 32.4,
    note: "Game handling inspection complete before breakdown.",
    rawBatchCode: "RAW-260313-VN-01",
    status: "Available",
  },
];
let finishedBatches = [
  {
    id: "DB-260313-PIE",
    product: "Family Steak Pie",
    productSku: "DB-PIE-01",
    sourceLotId: "intake-braemar-beef-260313",
    sourceIntakeCode: "INT-260313-BEEF-01",
    sourceBatchCode: "RAW-260313-BF-01",
    origin: "Braemar Production Kitchen",
    animalId: "BEEF-TRIM-4421",
    packedOn: "2026-03-13",
    useBy: "2026-03-20",
    quantity: 28,
    unit: "pack",
    yield: "28 pies",
    weight: "28 pies",
    status: "Packed",
    barcodeValue: "DB-PIE-01",
    note: "Pie filling cooked and packed into chilled finished goods.",
    timeline: [
      { label: "Intake", detail: "Beef trim intake received and checked into raw batch RAW-260313-BF-01.", time: "05:55" },
      { label: "Trim allocation", detail: "Beef trim released from morning cutting list into pie production.", time: "06:15" },
      { label: "Cook room", detail: "Pie filling cooked and logged against batch recipe sheet.", time: "07:05" },
      { label: "Packaging", detail: "Counter labels applied and pies transferred to chilled finished goods.", time: "11:10" },
    ],
  },
  {
    id: "DB-260313-LM",
    product: "Lamb Loin Chops",
    productSku: "BB-LAM-02",
    sourceLotId: "intake-braeside-lamb-260313",
    sourceIntakeCode: "INT-260313-LAMB-01",
    sourceBatchCode: "RAW-260313-LM-01",
    origin: "Braeside Lamb",
    animalId: "UK7720 900122",
    packedOn: "2026-03-13",
    useBy: "2026-03-19",
    quantity: 19,
    unit: "tray",
    yield: "19 trays",
    weight: "19 trays",
    status: "Picked",
    barcodeValue: "BB-LAM-02",
    note: "Trimmed and packed for retail trays.",
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
    productSku: "DB-VEN-04",
    sourceLotId: "intake-mar-lodge-260313",
    sourceIntakeCode: "INT-260313-VEN-01",
    sourceBatchCode: "RAW-260313-VN-01",
    origin: "Mar Lodge Estate",
    animalId: "ESTATE-VN-184",
    packedOn: "2026-03-13",
    useBy: "2026-03-17",
    quantity: 12,
    unit: "box",
    yield: "12 boxes",
    weight: "12 boxes",
    status: "Awaiting dispatch",
    barcodeValue: "DB-VEN-04",
    note: "Mixed cuts assembled into webshop boxes.",
    timeline: [
      { label: "Field collection", detail: "Estate batch logged with stalker ID and timestamp.", time: "04:55" },
      { label: "Inspection", detail: "Game handling check complete before breakdown.", time: "06:45" },
      { label: "Box assembly", detail: "Mixed cuts allocated to 12 webshop boxes.", time: "10:40" },
      { label: "Dispatch ready", detail: "Stored in courier bay for next-day chilled collection.", time: "14:15" },
    ],
  },
];
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
let supabaseClientPromise;

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
const intakeList = document.getElementById("intake-list");
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
const printDeliverySheetButton = document.getElementById("print-delivery-sheet");
const driverPrintSheet = document.getElementById("driver-print-sheet");
const productForm = document.getElementById("product-form");
const productSkuInput = document.getElementById("product-sku");
const productNameInput = document.getElementById("product-name");
const productDescriptionInput = document.getElementById("product-description");
const productUnitInput = document.getElementById("product-unit");
const productPriceInput = document.getElementById("product-price");
const productStockInput = document.getElementById("product-stock");
const productThresholdInput = document.getElementById("product-threshold");
const productBarcodeInput = document.getElementById("product-barcode");
const productImageInput = document.getElementById("product-image");
const productImagePreview = document.getElementById("product-image-preview");
const productImagePreviewImg = document.getElementById("product-image-preview-img");
const productFormTitle = document.getElementById("product-form-title");
const productSubmitButton = document.getElementById("product-submit-button");
const productCancelButton = document.getElementById("product-cancel-button");
const productFormFeedback = document.getElementById("product-form-feedback");
const productAdminList = document.getElementById("product-admin-list");
const intakeForm = document.getElementById("intake-form");
const intakeFeedback = document.getElementById("intake-feedback");
const finishedBatchForm = document.getElementById("finished-batch-form");
const finishedBatchFeedback = document.getElementById("finished-batch-feedback");
const finishedProductInput = document.getElementById("finished-product");
const finishedSourceLotInput = document.getElementById("finished-source-lot");
const labelSourceBatchInput = document.getElementById("label-source-batch");
const labelBarcodeInput = document.getElementById("label-barcode");
const shopHeading = document.querySelector("#shop .section-heading h3");
const heroText = document.querySelector(".retail-section .section-heading .eyebrow");
const staffAuthForm = document.getElementById("staff-auth-form");
const staffEmailInput = document.getElementById("staff-email");
const staffPasswordInput = document.getElementById("staff-password");
const authFeedback = document.getElementById("auth-feedback");
const dashboardAuthStatus = document.getElementById("dashboard-auth-status");
const signOutButton = document.getElementById("sign-out-button");
const operationsSection = document.getElementById("operations");
const previewBarcodeSvg = document.getElementById("preview-barcode-svg");
const previewBarcodeValue = document.getElementById("preview-barcode-value");

const isDashboardPage = Boolean(operationsSection);
const isStaffLoginPage = Boolean(staffAuthForm);

if (operationsSection) {
  operationsSection.hidden = true;
}

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

function buildUploadedProductArt(imageUrl) {
  return `linear-gradient(135deg, rgba(81, 16, 25, 0.24), rgba(81, 16, 25, 0.68)), url("${imageUrl}") center/cover`;
}

function escapeSvgText(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function normalizeBarcodeValue(value, fallback = "") {
  const rawValue = String(value || fallback || "").toUpperCase().trim();
  return rawValue.replace(/[^0-9A-Z. \-$/+%]/g, "");
}

function generateCode39Svg(value) {
  const normalizedValue = normalizeBarcodeValue(value);
  if (!normalizedValue) {
    return "";
  }

  const encodedValue = `*${normalizedValue}*`;
  const narrowWidth = 2;
  const wideWidth = 5;
  const quietZone = 12;
  const interCharacterGap = 2;
  const barHeight = 54;
  let x = quietZone;
  let bars = "";

  for (const character of encodedValue) {
    const pattern = CODE39_PATTERNS[character];
    if (!pattern) {
      return "";
    }

    for (let index = 0; index < pattern.length; index += 1) {
      const width = pattern[index] === "w" ? wideWidth : narrowWidth;
      if (index % 2 === 0) {
        bars += `<rect x="${x}" y="0" width="${width}" height="${barHeight}" fill="#000" />`;
      }
      x += width;
    }

    x += interCharacterGap;
  }

  const width = x + quietZone;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${barHeight}" role="img" aria-label="Barcode ${escapeSvgText(
    normalizedValue,
  )}" preserveAspectRatio="none">${bars}</svg>`;
}

function buildBarcodeImageMarkup(value) {
  const normalizedValue = normalizeBarcodeValue(value);
  const svgMarkup = generateCode39Svg(normalizedValue);
  if (!svgMarkup) {
    return "";
  }

  return `<img alt="Barcode ${escapeSvgText(normalizedValue)}" src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svgMarkup,
  )}" />`;
}

function renderBarcodePreview(value) {
  if (!previewBarcodeSvg || !previewBarcodeValue) {
    return;
  }

  const normalizedValue = normalizeBarcodeValue(value);
  previewBarcodeValue.textContent = normalizedValue || "NO TILL CODE";
  previewBarcodeSvg.innerHTML = normalizedValue
    ? buildBarcodeImageMarkup(normalizedValue)
    : '<div class="empty-state">Add a till code to print a scannable barcode.</div>';
}

function getProductBarcodeValueByName(productName) {
  const matchingProduct = products.find(
    (product) => String(product.name || "").trim().toLowerCase() === String(productName || "").trim().toLowerCase(),
  );

  return normalizeBarcodeValue(matchingProduct?.barcodeValue, matchingProduct?.sku || "");
}

function readStorageJson(key, fallbackValue) {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch (error) {
    console.error(`Unable to read local storage key ${key}:`, error);
    return fallbackValue;
  }
}

function writeStorageJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Unable to write local storage key ${key}:`, error);
  }
}

function loadStoredProducts() {
  return readStorageJson(LOCAL_PRODUCTS_STORAGE_KEY, []);
}

function saveStoredProducts(entries) {
  writeStorageJson(LOCAL_PRODUCTS_STORAGE_KEY, entries);
}

function loadStoredProductImages() {
  return readStorageJson(LOCAL_PRODUCT_IMAGES_STORAGE_KEY, {});
}

function saveStoredProductImages(entries) {
  writeStorageJson(LOCAL_PRODUCT_IMAGES_STORAGE_KEY, entries);
}

function upsertStoredProductImage(sku, imageDataUrl) {
  if (!sku || !imageDataUrl) {
    return;
  }

  const images = loadStoredProductImages();
  images[sku] = imageDataUrl;
  saveStoredProductImages(images);
}

function moveStoredProductImage(previousSku, nextSku) {
  if (!previousSku || !nextSku || previousSku === nextSku) {
    return;
  }

  const images = loadStoredProductImages();
  if (!images[previousSku]) {
    return;
  }

  images[nextSku] = images[previousSku];
  delete images[previousSku];
  saveStoredProductImages(images);
}

function applyStoredProductImages(productList) {
  const storedImages = loadStoredProductImages();

  return productList.map((product, index) => {
    const storedImage = storedImages[String(product.sku || "").toUpperCase()];
    if (!storedImage) {
      return product;
    }

    return {
      ...product,
      imageDataUrl: storedImage,
      art: buildUploadedProductArt(storedImage || buildProductArt(index)),
    };
  });
}

function mergeStoredProducts() {
  const storedProducts = loadStoredProducts();
  if (!Array.isArray(storedProducts) || !storedProducts.length) {
    products = applyStoredProductImages(products);
    return;
  }

  const mergedProducts = [...products];
  const mergedInventory = [...inventory];

  storedProducts.forEach((storedProduct) => {
    const normalizedSku = String(storedProduct.sku || "").toUpperCase();
    if (!normalizedSku) {
      return;
    }

    const productIndex = mergedProducts.findIndex((product) => String(product.sku || "").toUpperCase() === normalizedSku);
    if (productIndex >= 0) {
      mergedProducts[productIndex] = createProductRecord(
        { ...mergedProducts[productIndex], ...storedProduct },
        productIndex,
      );
    } else {
      mergedProducts.push(createProductRecord(storedProduct, mergedProducts.length));
    }

    const inventoryIndex = mergedInventory.findIndex((item) => String(item.sku || "").toUpperCase() === normalizedSku);
    if (inventoryIndex >= 0) {
      mergedInventory[inventoryIndex] = {
        ...mergedInventory[inventoryIndex],
        sku: normalizedSku,
        product: storedProduct.name,
        onHand: storedProduct.openingStock,
        threshold: storedProduct.threshold,
      };
    } else {
      mergedInventory.push({
        sku: normalizedSku,
        product: storedProduct.name,
        onHand: storedProduct.openingStock,
        threshold: storedProduct.threshold,
      });
    }
  });

  products = applyStoredProductImages(mergedProducts);
  inventory.length = 0;
  inventory.push(...mergedInventory);
}

function persistCustomProduct(product) {
  const storedProducts = loadStoredProducts();
  storedProducts.push(product);
  saveStoredProducts(storedProducts);
}

function updateStoredCustomProduct(originalSku, updatedProduct) {
  const normalizedOriginalSku = String(originalSku || "").toUpperCase();
  const storedProducts = loadStoredProducts();
  const existingIndex = storedProducts.findIndex(
    (product) => String(product.sku || "").toUpperCase() === normalizedOriginalSku,
  );
  const nextProducts = [...storedProducts];

  if (existingIndex >= 0) {
    nextProducts[existingIndex] = updatedProduct;
  } else {
    nextProducts.push(updatedProduct);
  }

  saveStoredProducts(nextProducts);
}

function previewProductImage(imageDataUrl) {
  if (!productImagePreview || !productImagePreviewImg) {
    return;
  }

  if (!imageDataUrl) {
    productImagePreview.hidden = true;
    productImagePreviewImg.removeAttribute("src");
    return;
  }

  productImagePreview.hidden = false;
  productImagePreviewImg.src = imageDataUrl;
}

function resetProductForm() {
  editingProductSku = "";
  productForm?.reset();

  if (productFormTitle) {
    productFormTitle.textContent = "Add a new product";
  }

  if (productSubmitButton) {
    productSubmitButton.textContent = "Add Product";
  }

  if (productCancelButton) {
    productCancelButton.hidden = true;
  }

  if (productSkuInput) {
    productSkuInput.value = "";
  }
  if (productNameInput) {
    productNameInput.value = "";
  }
  if (productDescriptionInput) {
    productDescriptionInput.value = "";
  }
  if (productUnitInput) {
    productUnitInput.value = "item";
  }
  if (productPriceInput) {
    productPriceInput.value = "";
  }
  if (productStockInput) {
    productStockInput.value = "0";
  }
  if (productThresholdInput) {
    productThresholdInput.value = "0";
  }
  if (productBarcodeInput) {
    productBarcodeInput.value = "";
  }
  if (productImageInput) {
    productImageInput.value = "";
  }

  previewProductImage("");
}

function populateProductFormForEdit(sku) {
  const normalizedSku = String(sku || "").toUpperCase();
  const product = products.find((entry) => String(entry.sku || "").toUpperCase() === normalizedSku);
  const inventoryItem = inventory.find((entry) => String(entry.sku || "").toUpperCase() === normalizedSku);

  if (!product) {
    setProductFeedback("That product could not be found.", "danger");
    return;
  }

  editingProductSku = normalizedSku;
  productSkuInput.value = product.sku || "";
  productNameInput.value = product.name || "";
  productDescriptionInput.value = product.description || "";
  productUnitInput.value = product.unit || "item";
  productPriceInput.value = String(product.price ?? "");
  productStockInput.value = String(inventoryItem?.onHand ?? 0);
  productThresholdInput.value = String(inventoryItem?.threshold ?? 0);
  productBarcodeInput.value = normalizeBarcodeValue(product.barcodeValue, product.sku || "");
  if (productImageInput) {
    productImageInput.value = "";
  }

  if (productFormTitle) {
    productFormTitle.textContent = `Edit ${product.name}`;
  }

  if (productSubmitButton) {
    productSubmitButton.textContent = "Save Changes";
  }

  if (productCancelButton) {
    productCancelButton.hidden = false;
  }

  previewProductImage(product.imageDataUrl || "");
  setProductFeedback(`Editing ${product.name}. Update the fields and save your changes.`, "muted");
  setActiveTab("products");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => reject(new Error("Unable to read the selected image file.")));
    reader.readAsDataURL(file);
  });
}

function setProductFeedback(message, tone = "muted") {
  if (!productFormFeedback) {
    return;
  }

  productFormFeedback.textContent = message;
  productFormFeedback.dataset.tone = tone;
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
    art: row.imageDataUrl ? buildUploadedProductArt(row.imageDataUrl) : buildProductArt(index),
    imageDataUrl: row.imageDataUrl || "",
    barcodeValue: normalizeBarcodeValue(row.barcodeValue, row.sku),
    unit: row.unit || "item",
  }));
}

function createProductRecord(product, index = products.length) {
  return {
    id: product.id || slugifyProductName(product.sku || product.name || `product-${index + 1}`),
    sku: product.sku,
    name: product.name,
    description: product.description || "Prepared fresh for local collection or delivery.",
    price: Number(product.price),
    badge: deriveBadge(product, index),
    stockImpact: 1,
    art: product.imageDataUrl ? buildUploadedProductArt(product.imageDataUrl) : buildProductArt(index),
    imageDataUrl: product.imageDataUrl || "",
    barcodeValue: normalizeBarcodeValue(product.barcodeValue, product.sku),
    unit: product.unit || "item",
  };
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

function formatAddress(address) {
  return [address?.line1, address?.line2, address?.city, address?.county, address?.postcode]
    .filter(Boolean)
    .join(", ");
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

async function getSupabaseClient() {
  if (!supabaseClientPromise) {
    supabaseClientPromise = getSupabaseConfig().then((config) =>
      window.supabase.createClient(config.supabaseUrl, config.supabaseKey),
    );
  }

  return supabaseClientPromise;
}

function setAuthFeedback(message, tone = "muted") {
  if (!authFeedback) {
    return;
  }

  authFeedback.textContent = message;
  authFeedback.dataset.tone = tone;
}

function setDashboardAuthStatus(message, tone = "muted") {
  if (!dashboardAuthStatus) {
    return;
  }

  dashboardAuthStatus.textContent = message;
  dashboardAuthStatus.dataset.tone = tone;
}

function buildStaffAccessMessage(status, email) {
  const accountLabel = email || "This account";

  if (status === "no-user") {
    return "Sign in with a staff user created in Supabase Auth.";
  }

  if (status === "no-profile") {
    return `${accountLabel} is authenticated but has no profile row yet. Ask an admin to finish staff provisioning.`;
  }

  if (status === "inactive") {
    return `${accountLabel} is provisioned but not active. Ask an admin to reactivate the account.`;
  }

  if (status === "not-staff") {
    return `${accountLabel} is signed in, but the role is not staff or admin. Ask an admin to promote the user in Supabase.`;
  }

  if (status === "missing-staff-profile") {
    return `${accountLabel} has a staff role but no staff permissions profile. Ask an admin to run staff provisioning.`;
  }

  return `${accountLabel} is not provisioned for operations access.`;
}

async function getCurrentStaffAccount(supabase) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user?.id || !user?.email) {
    return { status: "no-user", user: null, account: null };
  }

  const email = user.email.toLowerCase();
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
        user_id,
        email,
        role,
        status,
        staff_profiles(first_name, last_name, job_title, department, can_manage_inventory, can_manage_orders, can_manage_clients, can_manage_billing)
      `,
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return { status: "no-profile", user, email, account: null };
  }

  if (data.status !== "active") {
    return { status: "inactive", user, email, account: data };
  }

  if (!["admin", "staff"].includes(data.role)) {
    return { status: "not-staff", user, email, account: data };
  }

  if (!data.staff_profiles) {
    return { status: "missing-staff-profile", user, email, account: data };
  }

  return {
    status: "ok",
    user,
    email,
    account: {
      ...data,
      id: data.user_id,
      authEmail: email,
    },
  };
}

async function ensureStaffSession(supabase) {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  if (!session) {
    return null;
  }

  const access = await getCurrentStaffAccount(supabase);
  if (!access || access.status !== "ok") {
    await supabase.auth.signOut();
    return null;
  }

  return access.account;
}

async function redirectToStaffLogin(reason = "") {
  const loginUrl = new URL("staff-login.html", window.location.href);
  if (isDashboardPage) {
    loginUrl.searchParams.set("next", "dashboard.html");
  }
  if (reason) {
    loginUrl.searchParams.set("reason", reason);
  }

  window.location.href = loginUrl.toString();
}

async function fetchLiveProducts() {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("sku, name, description, price, unit")
    .eq("is_active", true)
    .order("name");

  if (error) {
    throw error;
  }

  if (Array.isArray(data) && data.length) {
    products = normalizeSupabaseProducts(data);
    liveProductsEnabled = true;
    syncInventoryWithProducts();
  }
}

async function saveProductToSupabase(product) {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .insert({
      sku: product.sku,
      name: product.name,
      description: product.description,
      unit: product.unit,
      price: product.price,
      is_active: true,
    })
    .select("sku, name, description, price, unit")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function updateProductInSupabase(originalSku, product) {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .update({
      sku: product.sku,
      name: product.name,
      description: product.description,
      unit: product.unit,
      price: product.price,
    })
    .eq("sku", originalSku)
    .select("sku, name, description, price, unit")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function fetchLiveDeliveries() {
  const supabase = await getSupabaseClient();
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

function renderProductAdminList() {
  if (!productAdminList) {
    return;
  }

  if (!products.length) {
    productAdminList.innerHTML = `<div class="empty-state">No products are available yet.</div>`;
    return;
  }

  productAdminList.innerHTML = products
    .map((product) => {
      const inventoryItem = inventory.find((item) => item.product === product.name);
      return `
        <article class="product-admin-card">
          <div class="product-admin-thumb" style="background:${product.art}">${product.name}</div>
          <div class="product-admin-copy">
            <div class="product-admin-head">
              <div>
                <p class="eyebrow">SKU ${product.sku || "Not set"}</p>
                <h5>${product.name}</h5>
              </div>
              <strong>${formatCurrency(product.price)}</strong>
            </div>
            <p>${product.description}</p>
            <div class="product-admin-meta">
              <span>Unit: ${product.unit || "item"}</span>
              <span>Till: ${product.barcodeValue || product.sku || "Not set"}</span>
              <span>Stock: ${inventoryItem?.onHand ?? 0}</span>
              <span>Threshold: ${inventoryItem?.threshold ?? 0}</span>
            </div>
            <div class="product-admin-actions">
              <button type="button" class="button secondary" data-edit-product="${product.sku || ""}">Edit Product</button>
            </div>
          </div>
        </article>
      `;
    })
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
  if (!deliverySummary || !deliveryList || !routeOverview || !routeList || !routeBadge || !driverPrintSheet) {
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
    driverPrintSheet.innerHTML = `
      <header class="driver-sheet-header">
        <div>
          <p class="eyebrow">Driver sheet</p>
          <h2>No deliveries booked</h2>
        </div>
        <div class="driver-sheet-meta">
          <strong>${formatRouteDate(selectedDate)}</strong>
          <span>Davidson's Family Butcher</span>
        </div>
      </header>
    `;
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

  driverPrintSheet.innerHTML = `
    <header class="driver-sheet-header">
      <div>
        <p class="eyebrow">Driver sheet</p>
        <h2>${formatRouteDate(selectedDate)} delivery run</h2>
      </div>
      <div class="driver-sheet-meta">
        <strong>${route.length} stop${route.length === 1 ? "" : "s"}</strong>
        <span>${totalDistance.toFixed(1)} km estimated route</span>
        <span>Depart 09:00 from shop</span>
      </div>
    </header>
    <section class="driver-sheet-summary">
      <div>
        <span>Total order value</span>
        <strong>${formatCurrency(totalValue)}</strong>
      </div>
      <div>
        <span>Final ETA</span>
        <strong>${route[route.length - 1].eta}</strong>
      </div>
      <div>
        <span>Printed</span>
        <strong>${new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/London",
        })}</strong>
      </div>
    </section>
    <ol class="driver-stop-list">
      ${route
        .map(
          (delivery) => `
            <li class="driver-stop">
              <div class="driver-stop-head">
                <div>
                  <span class="driver-stop-number">Stop ${delivery.stopNumber}</span>
                  <h3>${delivery.customerName}</h3>
                </div>
                <div class="driver-stop-timing">
                  <strong>ETA ${delivery.eta}</strong>
                  <span>${titleCaseStatus(delivery.orderStatus)}</span>
                </div>
              </div>
              <div class="driver-stop-grid">
                <div>
                  <span>Order</span>
                  <strong>${delivery.orderNumber}</strong>
                </div>
                <div>
                  <span>Contact</span>
                  <strong>${delivery.contactName}</strong>
                </div>
                <div>
                  <span>Phone</span>
                  <strong>${delivery.phone || "Not recorded"}</strong>
                </div>
                <div>
                  <span>Value</span>
                  <strong>${formatCurrency(delivery.totalAmount)}</strong>
                </div>
                <div>
                  <span>Requested</span>
                  <strong>${formatDeliveryWindow(delivery.requestedFor)}</strong>
                </div>
                <div>
                  <span>Leg distance</span>
                  <strong>${delivery.legDistanceKm.toFixed(1)} km</strong>
                </div>
              </div>
              <div class="driver-stop-block">
                <span>Address</span>
                <strong>${formatAddress(delivery.address)}</strong>
              </div>
              <div class="driver-stop-block">
                <span>Driver notes</span>
                <strong>${delivery.address.instructions || delivery.note}</strong>
              </div>
            </li>
          `,
        )
        .join("")}
    </ol>
  `;
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

  const barcodeValue = normalizeBarcodeValue(formData.barcode, getProductBarcodeValueByName(formData.product));
  document.getElementById("preview-product").textContent = formData.product;
  document.getElementById("preview-batch").textContent = formData.batch;
  document.getElementById("preview-packed").textContent = formData.packed;
  document.getElementById("preview-useby").textContent = formData.useby;
  document.getElementById("preview-weight").textContent = formData.weight;
  document.getElementById("preview-price").textContent = formData.price;
  renderBarcodePreview(barcodeValue);

  if (labelBarcodeInput) {
    labelBarcodeInput.value = barcodeValue;
  }
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
  renderInventory();
  renderProductAdminList();
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

  const editProductButton = event.target.closest("[data-edit-product]");
  if (editProductButton) {
    populateProductFormForEdit(editProductButton.getAttribute("data-edit-product"));
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

if (productForm) {
  productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedImage = productImageInput?.files?.[0];
    const originalSku = editingProductSku;
    const wasEditing = Boolean(editingProductSku);

    const payload = {
      sku: productSkuInput.value.trim().toUpperCase(),
      name: productNameInput.value.trim(),
      description: productDescriptionInput.value.trim(),
      unit: productUnitInput.value,
      price: Number(productPriceInput.value),
      openingStock: Number(productStockInput.value),
      threshold: Number(productThresholdInput.value),
      barcodeValue: normalizeBarcodeValue(productBarcodeInput.value, productSkuInput.value),
    };

    if (!payload.sku || !payload.name || Number.isNaN(payload.price) || payload.price < 0) {
      setProductFeedback("Enter a SKU, product name, and valid price.", "danger");
      return;
    }

    if (!payload.barcodeValue) {
      setProductFeedback("Enter a till code using letters, numbers, spaces, dots, or hyphens.", "danger");
      return;
    }

    if (
      Number.isNaN(payload.openingStock) ||
      payload.openingStock < 0 ||
      Number.isNaN(payload.threshold) ||
      payload.threshold < 0
    ) {
      setProductFeedback("Opening stock and threshold must be zero or more.", "danger");
      return;
    }

    const skuExists = products.some((product) => {
      const productSku = String(product.sku || "").toUpperCase();
      return productSku === payload.sku && productSku !== originalSku;
    });
    if (skuExists) {
      setProductFeedback("That SKU already exists. Use a different code.", "danger");
      return;
    }

    if (selectedImage && selectedImage.size > MAX_PRODUCT_IMAGE_SIZE_BYTES) {
      setProductFeedback("Choose an image smaller than 2 MB.", "danger");
      return;
    }

    setProductFeedback(
      editingProductSku
        ? liveProductsEnabled
          ? "Saving product changes to Supabase."
          : "Saving product changes locally."
        : liveProductsEnabled
          ? "Saving product to Supabase."
          : "Adding product to the local catalogue.",
      "muted",
    );

    try {
      const imageDataUrl = selectedImage ? await readFileAsDataUrl(selectedImage) : "";
      const existingProduct = originalSku
        ? products.find((product) => String(product.sku || "").toUpperCase() === originalSku)
        : null;
      const existingInventoryItem = originalSku
        ? inventory.find((item) => String(item.sku || "").toUpperCase() === originalSku)
        : null;
      const nextImageDataUrl = imageDataUrl || existingProduct?.imageDataUrl || "";
      const storedProductRecord = {
        sku: payload.sku,
        name: payload.name,
        description: payload.description,
        unit: payload.unit,
        price: payload.price,
        openingStock: payload.openingStock,
        threshold: payload.threshold,
        barcodeValue: payload.barcodeValue,
      };

      const sourceProduct = wasEditing
        ? liveProductsEnabled
          ? await updateProductInSupabase(originalSku, payload)
          : {
              ...existingProduct,
              sku: payload.sku,
              name: payload.name,
              description: payload.description,
              unit: payload.unit,
              price: payload.price,
              barcodeValue: payload.barcodeValue,
            }
        : liveProductsEnabled
          ? await saveProductToSupabase(payload)
          : {
              sku: payload.sku,
              name: payload.name,
              description: payload.description,
              unit: payload.unit,
              price: payload.price,
              barcodeValue: payload.barcodeValue,
            };

      if (wasEditing) {
        const updatedProduct = createProductRecord(
          {
            ...existingProduct,
            ...sourceProduct,
            imageDataUrl: nextImageDataUrl,
          },
          products.findIndex((product) => String(product.sku || "").toUpperCase() === originalSku),
        );

        products = products.map((product) =>
          String(product.sku || "").toUpperCase() === originalSku ? updatedProduct : product,
        );

        inventory.forEach((item) => {
          if (String(item.sku || "").toUpperCase() !== originalSku) {
            return;
          }

          item.sku = payload.sku;
          item.product = payload.name;
          item.onHand = payload.openingStock;
          item.threshold = payload.threshold;
        });

        if (existingInventoryItem && !inventory.some((item) => String(item.sku || "").toUpperCase() === payload.sku)) {
          existingInventoryItem.sku = payload.sku;
          existingInventoryItem.product = payload.name;
          existingInventoryItem.onHand = payload.openingStock;
          existingInventoryItem.threshold = payload.threshold;
        }

        if (originalSku && originalSku !== payload.sku) {
          moveStoredProductImage(originalSku, payload.sku);
        }

        if (imageDataUrl) {
          upsertStoredProductImage(payload.sku, imageDataUrl);
        }

        updateStoredCustomProduct(originalSku, storedProductRecord);

        stockActivity.unshift({
          time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
          message: `${payload.name}: product details updated.`,
        });
      } else {
        const newProduct = createProductRecord({ ...sourceProduct, imageDataUrl: nextImageDataUrl });
        products = [...products, newProduct];
        inventory.push({
          sku: payload.sku,
          product: payload.name,
          onHand: payload.openingStock,
          threshold: payload.threshold,
        });

        if (imageDataUrl) {
          upsertStoredProductImage(payload.sku, imageDataUrl);
        }

        updateStoredCustomProduct(payload.sku, storedProductRecord);

        stockActivity.unshift({
          time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
          message: `${payload.name}: new product added with ${payload.openingStock} units on hand.`,
        });
      }

      renderStorefront();

      if (labelForm) {
        document.getElementById("label-product").value = payload.name;
        if (labelBarcodeInput) {
          labelBarcodeInput.value = payload.barcodeValue;
        }
      }

      resetProductForm();

      setProductFeedback(
        wasEditing
          ? liveProductsEnabled
            ? `${payload.name} was updated in the live product catalogue.`
            : `${payload.name} was updated in this browser.`
          : liveProductsEnabled
            ? `${payload.name} was added and saved to the live product catalogue.`
            : `${payload.name} was added locally and will stay available in this browser.`,
        "success",
      );
    } catch (error) {
      setProductFeedback(error.message || `Unable to ${wasEditing ? "update" : "add"} the product.`, "danger");
    }
  });
}

if (productCancelButton) {
  productCancelButton.addEventListener("click", () => {
    resetProductForm();
    setProductFeedback("Edit cancelled.", "muted");
  });
}

if (productImageInput) {
  productImageInput.addEventListener("change", async () => {
    const selectedImage = productImageInput.files?.[0];

    if (!selectedImage) {
      previewProductImage("");
      return;
    }

    if (selectedImage.size > MAX_PRODUCT_IMAGE_SIZE_BYTES) {
      productImageInput.value = "";
      previewProductImage("");
      setProductFeedback("Choose an image smaller than 2 MB.", "danger");
      return;
    }

    try {
      const imageDataUrl = await readFileAsDataUrl(selectedImage);
      previewProductImage(imageDataUrl);
      setProductFeedback("Image ready. Add the product to save it.", "muted");
    } catch (error) {
      productImageInput.value = "";
      previewProductImage("");
      setProductFeedback(error.message || "Unable to preview the selected image.", "danger");
    }
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

if (printDeliverySheetButton) {
  printDeliverySheetButton.addEventListener("click", () => {
    document.body.classList.add("printing-driver-sheet");
    window.print();
  });
}

window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing-driver-sheet");
  document.body.classList.remove("printing-label-sheet");
});

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
      barcode: document.getElementById("label-barcode").value.trim(),
    });
  });
}

const printButton = document.getElementById("print-label");
if (printButton) {
  printButton.addEventListener("click", () => {
    document.body.classList.add("printing-label-sheet");
    window.print();
  });
}

if (staffAuthForm) {
  staffAuthForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setAuthFeedback("Signing in.", "muted");

    try {
      const supabase = await getSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: staffEmailInput.value.trim(),
        password: staffPasswordInput.value,
      });

      if (error) {
        throw error;
      }

      const access = await getCurrentStaffAccount(supabase);
      if (access.status !== "ok") {
        await supabase.auth.signOut();
        setAuthFeedback(buildStaffAccessMessage(access.status, access.email), "danger");
        return;
      }

      const staffAccount = access.account;
      setAuthFeedback(`Signed in as ${staffAccount.email}. Redirecting to the dashboard.`, "success");
      window.location.href = new URLSearchParams(window.location.search).get("next") || "dashboard.html";
    } catch (error) {
      setAuthFeedback(error.message || "Unable to sign in with Supabase Auth.", "danger");
    }
  });
}

if (signOutButton) {
  signOutButton.addEventListener("click", async () => {
    try {
      const supabase = await getSupabaseClient();
      await supabase.auth.signOut();
    } finally {
      window.location.href = "staff-login.html";
    }
  });
}

async function bootstrapPage() {
  mergeStoredProducts();
  renderStorefront();
  if (labelForm) {
    updateLabelPreview({
      product: document.getElementById("label-product").value.trim(),
      batch: document.getElementById("label-batch").value.trim(),
      packed: document.getElementById("label-packed").value,
      useby: document.getElementById("label-useby").value,
      weight: document.getElementById("label-weight").value.trim(),
      price: document.getElementById("label-price").value.trim(),
      barcode: document.getElementById("label-barcode").value.trim(),
    });
  }
  showLiveDataState(false);

  try {
    await fetchLiveProducts();
    mergeStoredProducts();
    renderStorefront();
    showLiveDataState(true);
  } catch (error) {
    console.error("Supabase product sync failed:", error);
  }

  if (isStaffLoginPage) {
    const loginReason = new URLSearchParams(window.location.search).get("reason");
    if (loginReason === "not-staff") {
      setAuthFeedback("You are signed in, but this account is not provisioned for staff access. Ask an admin to promote the user and assign staff permissions.", "danger");
    } else if (loginReason === "inactive") {
      setAuthFeedback("This staff account is inactive. Ask an admin to reactivate it before signing in.", "danger");
    } else if (loginReason === "no-profile") {
      setAuthFeedback("This authenticated account is missing its app profile row. Ask an admin to complete Supabase provisioning.", "danger");
    } else if (loginReason === "missing-staff-profile") {
      setAuthFeedback("This account has a staff role but no staff permissions profile. Ask an admin to finish staff provisioning.", "danger");
    }

    try {
      const supabase = await getSupabaseClient();
      const access = await getCurrentStaffAccount(supabase);
      if (access.status === "ok") {
        const staffAccount = access.account;
        setAuthFeedback(`Already signed in as ${staffAccount.email}. Redirecting to the dashboard.`, "success");
        window.location.href = new URLSearchParams(window.location.search).get("next") || "dashboard.html";
        return;
      }
      if (access.status !== "no-user") {
        await supabase.auth.signOut();
        setAuthFeedback(buildStaffAccessMessage(access.status, access.email), "danger");
      }
    } catch (error) {
      console.error("Staff session check failed:", error);
      setAuthFeedback("Supabase session check failed. Try signing in again.", "danger");
    }
  }

  if (!isDashboardPage) {
    return;
  }

  try {
    const supabase = await getSupabaseClient();
    const access = await getCurrentStaffAccount(supabase);
    if (access.status !== "ok") {
      if (access.status !== "no-user") {
        setDashboardAuthStatus(buildStaffAccessMessage(access.status, access.email), "danger");
        await supabase.auth.signOut();
      }
      await redirectToStaffLogin(access.status);
      return;
    }
    const staffAccount = access.account;

    operationsSection.hidden = false;
    setDashboardAuthStatus(
      `Signed in as ${staffAccount.staff_profiles?.first_name || staffAccount.email}. Live operations data is enabled for ${staffAccount.role}.`,
      "success",
    );

    await fetchLiveDeliveries();
    if (deliveryDateInput && !getDeliveriesForDate(deliveryDateInput.value).length) {
      deliveryDateInput.value = formatDateForInput(deliveryOrders[0]?.requestedFor || new Date());
    }
  } catch (error) {
    console.error("Supabase delivery sync failed:", error);
    setDashboardAuthStatus(error.message || "Live delivery sync failed. Showing fallback dashboard data.", "danger");
    operationsSection.hidden = false;
  }

  renderDeliveries();
}

bootstrapPage();

if (window.location.hash === "#traceability") {
  setActiveTab("traceability");
}

if (window.location.hash === "#products") {
  setActiveTab("products");
}

if (window.location.hash === "#labels") {
  setActiveTab("labels");
}

if (window.location.hash === "#deliveries") {
  setActiveTab("deliveries");
}
