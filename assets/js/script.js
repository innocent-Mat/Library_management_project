// Load cart count
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  if (window.location.pathname.includes("cart.html")) loadCart();
});

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "";
    return;
  }

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += (item.price/100) * item.quantity;
    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>Price: $${total}</p>
          <p>Quantity: 
            <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
          </p>
        </div>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

function updateQuantity(index, qty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = parseInt(qty);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

const productButton = document.querySelector(".checkout-btn");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});