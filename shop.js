const products = [
  { name: "Rose Gold Heart", price: "$12.99", image: "images/heartcharm.png", type: "charm" },
  { name: "Butterfly Elegance", price: "$14.50", image: "images/butterflycharm.png", type: "charm" },
  { name: "Lock Charm", price: "$10.00", image: "images/key.png",type: "charm" },
  { name: "Star Charm", price: "$9.50", image: "images/star.png", type: "charm" },
  { name: "Moon Charm", price: "$11.00", image: "images/moon.png", type: "charm" },
  { name: "Base Bracelet", price: "$19.00", image: "images/braceletbase.png", type: "bracelet" },
  { name: "Silver Chain Bracelet", price: "$22.00", image: "images/silver.png", type: "bracelet" },
  { name: "Gold Bead Bracelet", price: "$20.00", image: "images/gold.png", type: "bracelet" },
  { name: "Minimalist Charm", price: "$8.99", image: "images/minimalist.png", type: "charm" },
  { name: "Angel Wing Charm", price: "$13.99", image: "images/angelwing.png", type: "charm" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  list.forEach((p, index) => {
    const box = document.createElement("div");
    box.className = "product-box";
    box.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      <div class="qty-control">
        <label>Qty:</label>
        <input type="number" id="qty-${index}" min="1" value="1">
      </div>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(box);
  });
}

function filterProducts(type) {
  if (type === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.type === type);
    displayProducts(filtered);
  }
}

function addToCart(index) {
  const qtyInput = document.getElementById(`qty-${index}`);
  const quantity = parseInt(qtyInput.value) || 1;
  const product = products[index];

  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function toggleCartPopup() {
  const popup = document.getElementById("cart-popup");
  popup.classList.toggle("visible");
}

function renderCartItems() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const priceNum = parseFloat(item.price.replace('$', ''));
    total += priceNum * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="item-info">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>${item.price} × ${item.quantity}</p>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
    `;
    container.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";
  totalDiv.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
  container.appendChild(totalDiv);
}

window.onload = () => {
  displayProducts(products);
  updateCartCount();
  renderCartItems();
};
