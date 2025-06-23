/* -----------------------------
   🌟 HERO SLIDER
----------------------------- */
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

/* -----------------------------
   💬 REVIEWS CAROUSEL (Simple)
----------------------------- */
let reviewIndex = 0;
const reviews = document.querySelectorAll(".review");

setInterval(() => {
  reviews[reviewIndex].classList.remove("active");
  reviewIndex = (reviewIndex + 1) % reviews.length;
  reviews[reviewIndex].classList.add("active");
}, 5000);

/* -----------------------------
   ❓ FAQ ACCORDION
----------------------------- */
document.querySelectorAll(".faq-item button").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

/* -----------------------------
   🧊 FLOATING GRID REVIEWS
----------------------------- */
const floatingReviews = Array.from(document.querySelectorAll('#review-data .review-item'));
const container = document.getElementById('floating-reviews-section');
let fired = false;

window.addEventListener('scroll', () => {
  const triggerPoint = window.innerHeight * 0.8;
  if (!fired && window.scrollY > triggerPoint) {
    fired = true;
    showGridReviews();
  }
});

function showGridReviews() {
  floatingReviews.slice(0, 20).forEach((item, i) => {
    setTimeout(() => {
      const box = document.createElement('div');
      box.className = 'floating-review';
      box.textContent = item.textContent;
      container.appendChild(box);
    }, i * 300);
  });
}

/* -----------------------------
   🍔 HAMBURGER MENU
----------------------------- */
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show');
}

/* -----------------------------
   🛒 CART FUNCTIONS
----------------------------- */
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

/* -----------------------------
   🚀 INIT ON LOAD
----------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
