let braceletState = []; // Keeps track of charms in each slot

function generateBraceletSlots() {
  const size = parseInt(document.getElementById("size").value);
  const slotWidthCM = 1.4;
  const slotCount = Math.floor(size / slotWidthCM);
  const bracelet = document.getElementById("bracelet-slots");

  // Adjust bracelet state array
  if (slotCount > braceletState.length) {
    const diff = slotCount - braceletState.length;
    braceletState = braceletState.concat(new Array(diff).fill(null));
  } else if (slotCount < braceletState.length) {
    braceletState = braceletState.slice(0, slotCount);
  }

  // Clear current view
  bracelet.innerHTML = "";

  braceletState.forEach((charmSrc, index) => {
    const slot = document.createElement("div");
    slot.classList.add("bracelet-slot");
    slot.setAttribute("data-index", index);

    if (charmSrc) {
      const img = document.createElement("img");
      img.src = charmSrc;
      img.alt = "Charm";

      // Click to remove charm
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        braceletState[index] = null;
        generateBraceletSlots();
      });

      slot.appendChild(img);
    }

    // Enable drag interactions
    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
      slot.classList.add("hovered");
    });

    slot.addEventListener("dragleave", () => {
      slot.classList.remove("hovered");
    });

    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      slot.classList.remove("hovered");
      const imgSrc = e.dataTransfer.getData("text/plain");
      braceletState[index] = imgSrc;
      generateBraceletSlots();
    });

    bracelet.appendChild(slot);
  });
}

function setupCharmDrag() {
  const charms = document.querySelectorAll(".draggable-charm");
  charms.forEach((charm) => {
    charm.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", charm.src);
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupCharmDrag();
  generateBraceletSlots();

  const sizeSelect = document.getElementById("size");
  sizeSelect.addEventListener("change", () => {
    generateBraceletSlots();
    setupCharmDrag(); // rebind drag events
  });
});

// cart.js

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = total;
  }
}

function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  if (!container) return;

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

function toggleCartPopup() {
  const popup = document.getElementById("cart-popup");
  if (!popup) return;

  popup.classList.toggle("visible");
  renderCartItems();
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// Auto-update cart count on load
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});


