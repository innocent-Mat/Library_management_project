const cartBody = document.getElementById('cart-body');
const totalDisplay = document.getElementById('total');
const clearCartBtn = document.getElementById('clear-cart');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  cartBody.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartBody.innerHTML = `<tr><td colspan="6">🛍️ Your cart is empty.</td></tr>`;
    totalDisplay.textContent = '0.00';
    return;
  }

  cart.forEach((item, index) => {
    const subtotal = (item.price * item.quantity).toFixed(2);
    total += parseFloat(subtotal);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.title}" class="book-img"></td>
      <td>${item.title}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><input type="number" min="1" value="${item.quantity}" data-index="${index}"></td>
      <td>$${subtotal}</td>
      <td><button class="remove-btn" data-index="${index}">❌</button></td>
    `;
    cartBody.appendChild(row);
  });

  totalDisplay.textContent = total.toFixed(2);
}

cartBody.addEventListener('change', (e) => {
  if (e.target.type === 'number') {
    const index = e.target.dataset.index;
    cart[index].quantity = parseInt(e.target.value);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

cartBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

clearCartBtn.addEventListener('click', () => {
  if (confirm('Clear all items from cart?')) {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

renderCart();

