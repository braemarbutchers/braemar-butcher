const products = [
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

renderProducts();
renderFeaturedProducts();
renderBasket();
renderInventory();
renderStockActivity();
renderBatches();

if (window.location.hash === "#traceability") {
  setActiveTab("traceability");
}

if (window.location.hash === "#labels") {
  setActiveTab("labels");
}
