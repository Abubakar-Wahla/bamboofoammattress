let currentCategory = "mattress";
let selectedSize = null;
let selectedThickness = null;
let selectedFirmness = null;
let selectedSpring = null;
let selectedColor = null;
let lastPanel = "sizeSection";

const sizeGrid = document.getElementById("sizeGrid");
const thicknessGrid = document.getElementById("thicknessGrid");
const firmnessGrid = document.getElementById("firmnessGrid");
const springGrid = document.getElementById("springGrid");
const finalProduct = document.getElementById("finalProduct");

function scrollToProducts() {
  document.getElementById("products").style.display = "block";
  document.getElementById("catalog").style.display = "none";
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function goHome() {
  resetSelections();

  document.getElementById("products").style.display = "block";
  document.getElementById("catalog").style.display = "none";

  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
}

function resetSelections() {
  selectedSize = null;
  selectedThickness = null;
  selectedFirmness = null;
  selectedSpring = null;
  selectedColor = null;
}

function showCategory(category) {
  currentCategory = category;
  resetSelections();
  updateSteps();
  loadSizes();

  document.getElementById("products").style.display = "none";
  document.getElementById("catalog").style.display = "block";

  showPanel("sizeSection");
  setStep("stepSize");
  document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
}

function updateSteps() {
  const steps = document.querySelector(".steps");

  if (currentCategory === "mattress") {
    steps.innerHTML = `
      <button class="step active" id="stepSize">1. Size</button>
      <button class="step" id="stepThickness">2. Thickness</button>
      <button class="step" id="stepFirmness">3. Firmness</button>
      <button class="step" id="stepSpring">4. Springs</button>
      <button class="step" id="stepFinal">5. Final</button>
    `;
  }

  if (currentCategory === "bedframe") {
    steps.innerHTML = `
      <button class="step active" id="stepSize">1. Size</button>
      <button class="step" id="stepThickness">2. Color</button>
      <button class="step" id="stepFinal">3. Final</button>
    `;
  }

  if (currentCategory === "boxspring") {
    steps.innerHTML = `
      <button class="step active" id="stepSize">1. Size</button>
      <button class="step" id="stepFinal">2. Final</button>
    `;
  }

  bindStepButtons();
}

function bindStepButtons() {
  document.getElementById("stepSize")?.addEventListener("click", () => {
    loadSizes();
    showPanel("sizeSection");
    setStep("stepSize");
  });

  document.getElementById("stepThickness")?.addEventListener("click", () => {
    ensureDefaults();

    if (currentCategory === "mattress") {
      loadThickness();
      showPanel("thicknessSection");
    }

    if (currentCategory === "bedframe") {
      loadColors();
      showPanel("thicknessSection");
    }

    setStep("stepThickness");
  });

  document.getElementById("stepFirmness")?.addEventListener("click", () => {
    ensureDefaults();
    loadFirmness();
    showPanel("firmnessSection");
    setStep("stepFirmness");
  });

  document.getElementById("stepSpring")?.addEventListener("click", () => {
    ensureDefaults();
    loadSprings();
    showPanel("springSection");
    setStep("stepSpring");
  });

  document.getElementById("stepFinal")?.addEventListener("click", () => {
    ensureDefaults();
    showFinal();
  });
}

function showPanel(panelId) {
  document.querySelectorAll(".panel").forEach(panel => panel.classList.remove("show"));
  document.getElementById(panelId).classList.add("show");
  lastPanel = panelId;
}

function setStep(stepId) {
  document.querySelectorAll(".step").forEach(step => step.classList.remove("active"));
  document.getElementById(stepId)?.classList.add("active");
}

function getDefaultSize() {
  return "queen";
}

function getDefaultFirmness() {
  return firmnessOptions.find(item => item.name === "Semi-Firm");
}

function getDefaultSpring() {
  return springOptions.find(item => item.name === "Without Springs");
}

function getDefaultThickness() {
  const product = catalogData.mattress.products[selectedSize];
  return product.thickness.find(item => item.label === product.defaultThickness);
}

function getDefaultColor() {
  return catalogData.bedframe.colors.find(item => item.name === "Brown");
}

function ensureDefaults() {
  if (!selectedSize) selectedSize = getDefaultSize();

  if (currentCategory === "mattress") {
    if (!selectedThickness) selectedThickness = getDefaultThickness();
    if (!selectedFirmness) selectedFirmness = getDefaultFirmness();
    if (!selectedSpring) selectedSpring = getDefaultSpring();
  }

  if (currentCategory === "bedframe") {
    if (!selectedColor) selectedColor = getDefaultColor();
  }
}

function loadSizes() {
  const category = catalogData[currentCategory];

  document.getElementById("categoryLabel").innerText = category.label;
  document.getElementById("sizeHeading").innerText = category.heading;

  sizeGrid.innerHTML = "";

  Object.keys(category.products).forEach(key => {
    const product = category.products[key];

    const card = document.createElement("div");
    card.className = `choice-card image-card ${selectedSize === key ? "selected" : ""}`;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="card-overlay">
        <p>${product.dimension}</p>
        <h3>${product.name}</h3>
        <span>${product.price || "View Options"}</span>
      </div>
    `;

    card.onclick = () => selectSize(key);
    sizeGrid.appendChild(card);
  });
}

function selectSize(sizeKey) {
  selectedSize = sizeKey;

  if (currentCategory === "mattress") {
    selectedThickness = getDefaultThickness();
    selectedFirmness = getDefaultFirmness();
    selectedSpring = getDefaultSpring();
    loadThickness();
    showPanel("thicknessSection");
    setStep("stepThickness");
  }

  if (currentCategory === "bedframe") {
    selectedColor = getDefaultColor();
    loadColors();
    showPanel("thicknessSection");
    setStep("stepThickness");
  }

  if (currentCategory === "boxspring") {
    showFinal();
  }
}

function loadThickness() {
  const product = catalogData.mattress.products[selectedSize];

  document.getElementById("thicknessTitle").innerText = `${product.name} Thickness`;
  thicknessGrid.className = "grid three";
  thicknessGrid.innerHTML = "";

  product.thickness.forEach(item => {
    const card = document.createElement("div");
    card.className = `choice-card thickness-card ${selectedThickness.label === item.label ? "selected" : ""}`;

    card.innerHTML = `
      <img src="${item.image}" alt="${product.name}">
      <div class="thickness-info">
        <p>${product.dimension}</p>
        <h3>${item.label}</h3>
        <strong>${item.price}</strong>
        <span>Select Thickness</span>
      </div>
    `;

    card.onclick = () => {
      selectedThickness = item;
      loadFirmness();
      showPanel("firmnessSection");
      setStep("stepFirmness");
    };

    thicknessGrid.appendChild(card);
  });
}

function loadColors() {
  const product = catalogData.bedframe.products[selectedSize];

  document.getElementById("thicknessTitle").innerText = `${product.name} Color`;
  thicknessGrid.className = "grid four";
  thicknessGrid.innerHTML = "";

  catalogData.bedframe.colors.forEach(color => {
    const card = document.createElement("div");
    card.className = `choice-card thickness-card ${selectedColor.name === color.name ? "selected" : ""}`;

    card.innerHTML = `
      <img src="${color.image}" alt="${color.name}">
      <div class="thickness-info">
        <p>${product.name}</p>
        <h3>${color.name}</h3>
        <strong>${product.price}</strong>
        <span>Select Color</span>
      </div>
    `;

    card.onclick = () => {
      selectedColor = color;
      showFinal();
    };

    thicknessGrid.appendChild(card);
  });
}

function loadFirmness() {
  firmnessGrid.innerHTML = "";

  firmnessOptions.forEach(option => {
    const card = document.createElement("div");
    card.className = `choice-card option-card ${selectedFirmness.name === option.name ? "selected" : ""}`;

    card.innerHTML = `
      <h3>${option.name}</h3>
      <p>${option.desc}</p>
      <span>Select Firmness</span>
    `;

    card.onclick = () => {
      selectedFirmness = option;
      loadSprings();
      showPanel("springSection");
      setStep("stepSpring");
    };

    firmnessGrid.appendChild(card);
  });
}

function loadSprings() {
  springGrid.innerHTML = "";

  springOptions.forEach(option => {
    const card = document.createElement("div");
    card.className = `choice-card option-card large ${selectedSpring.name === option.name ? "selected" : ""}`;

    card.innerHTML = `
      <h3>${option.name}</h3>
      <p>${option.desc}</p>
      <span>Select Spring Option</span>
    `;

    card.onclick = () => {
      selectedSpring = option;
      showFinal();
    };

    springGrid.appendChild(card);
  });
}

function showFinal() {
  ensureDefaults();

  let product;
  let image;
  let price;
  let details = "";

  if (currentCategory === "mattress") {
    product = catalogData.mattress.products[selectedSize];
    image = selectedThickness.image;
    price = selectedThickness.price;

    details = `
      <div class="summary-row"><span>Size</span><strong>${product.dimension}</strong></div>
      <div class="summary-row"><span>Thickness</span><strong>${selectedThickness.label}</strong></div>
      <div class="summary-row"><span>Firmness</span><strong>${selectedFirmness.name}</strong></div>
      <div class="summary-row"><span>Spring Option</span><strong>${selectedSpring.name}</strong></div>
    `;
  }

  if (currentCategory === "bedframe") {
    product = catalogData.bedframe.products[selectedSize];
    image = selectedColor.image;
    price = product.price;

    details = `
      <div class="summary-row"><span>Size</span><strong>${product.dimension}</strong></div>
      <div class="summary-row"><span>Color</span><strong>${selectedColor.name}</strong></div>
    `;
  }

  if (currentCategory === "boxspring") {
    product = catalogData.boxspring.products[selectedSize];
    image = product.image;
    price = product.price;

    details = `
      <div class="summary-row"><span>Size</span><strong>${product.dimension}</strong></div>
      <div class="summary-row"><span>Thickness</span><strong>${product.thickness}</strong></div>
    `;
  }

  finalProduct.innerHTML = `
    <div class="final-card">
      <div class="final-image">
        <img src="${image}" alt="${product.name}">
      </div>

      <div class="final-info">
        <p class="label">Final Selection</p>
        <h2>${product.name}</h2>

        ${details}

        <div class="price-box">
          <span>Price</span>
          <h3>${price}</h3>
        </div>

        <div class="discount-note">
          <strong>Bundle Discount:</strong>
          Order more than one product and get $20–$30 discount per additional product.
        </div>

        <p class="note">
          Customer can screenshot this selection and send it back in Messenger.
        </p>

        <div class="about-mini">
          <h3>About Bamboo Foam Mattress</h3>
          <p>
            We provide brand-new mattresses, bed frames, and box springs with delivery
            available across Montreal, Laval, Longueuil, Ottawa, Quebec City, Gatineau,
            and surrounding areas.
          </p>
        </div>
      </div>
    </div>
  `;

  showPanel("finalSection");
  setStep("stepFinal");
}

function goBackToSize() {
  loadSizes();
  showPanel("sizeSection");
  setStep("stepSize");
}

function goBackToThickness() {
  if (currentCategory === "mattress") {
    loadThickness();
    showPanel("thicknessSection");
    setStep("stepThickness");
  }
}

function goBackToFirmness() {
  loadFirmness();
  showPanel("firmnessSection");
  setStep("stepFirmness");
}

function goBackToPrevious() {
  if (currentCategory === "mattress") {
    loadSprings();
    showPanel("springSection");
    setStep("stepSpring");
  }

  if (currentCategory === "bedframe") {
    loadColors();
    showPanel("thicknessSection");
    setStep("stepThickness");
  }

  if (currentCategory === "boxspring") {
    loadSizes();
    showPanel("sizeSection");
    setStep("stepSize");
  }
}

updateSteps();
loadSizes();

document.getElementById("catalog").style.display = "none";
