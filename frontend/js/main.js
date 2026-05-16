// ===========================
// CART SYSTEM
// We store the cart as an array in the browser's localStorage
// localStorage is like a small notebook the browser keeps for your site
// ===========================

// Load the cart from localStorage when page opens
// If nothing is saved yet, start with an empty array []
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update the cart count badge in the navbar
function updateCartCount() {
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        badge.textContent = cart.length;
    });
}

// ADD TO CART — called when user clicks "Add to Cart"
function addToCart(name, price) {
    // Check if item already exists in cart
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1; // Just increase quantity
    } else {
        cart.push({ name, price, quantity: 1 }); // Add new item
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();
    alert(`"${name}" added to cart! 🛒`);
}

// DISPLAY CART ITEMS — runs only on the cart page
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    const emptyMsg = document.getElementById('empty-cart-msg');

    if (!cartItemsDiv) return; // Exit if we're not on the cart page

    if (cart.length === 0) {
        emptyMsg.style.display = 'block';
        cartTotalDiv.style.display = 'none';
        return;
    }

    emptyMsg.style.display = 'none';
    cartTotalDiv.style.display = 'block';

    // Remove old items before re-rendering
    const oldItems = cartItemsDiv.querySelectorAll('.cart-item');
    oldItems.forEach(item => item.remove());

    let total = 0;

    // Loop through each cart item and create HTML for it
    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
      </div>
      <div>
        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
        cartItemsDiv.appendChild(div);
    });

    document.getElementById('total-amount').textContent = total.toFixed(2);
}

// REMOVE FROM CART
function removeFromCart(index) {
    cart.splice(index, 1); // Remove 1 item at that position
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart(); // Re-render the cart
}

// CLEAR CART
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
}

// CHECKOUT
function checkout() {
    alert('Order placed successfully! Thank you for shopping with ShopEasy 🎉');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// ===========================
// SEARCH PRODUCTS
// Filters product cards based on what user types
// ===========================
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        // Show card if name includes the search query, hide otherwise
        card.style.display = name.includes(query) ? 'block' : 'none';
    });
}

// ===========================
// LOGIN / REGISTER TAB SWITCH
// ===========================
function showTab(tab) {
    document.getElementById('login-tab').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('register-tab').style.display = tab === 'register' ? 'block' : 'none';

    // Update active tab button style
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// LOGIN — will later connect to backend API
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const msg = document.getElementById('login-msg');

    if (!email || !password) {
        msg.textContent = 'Please fill in all fields.';
        msg.className = 'form-msg error';
        return;
    }

    // For now, we simulate a successful login
    // In Phase 5, this will send a real request to our backend
    msg.textContent = 'Login successful! Welcome back.';
    msg.className = 'form-msg success';
}

// REGISTER — will later connect to backend API
function registerUser() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const msg = document.getElementById('register-msg');

    if (!name || !email || !password) {
        msg.textContent = 'Please fill in all fields.';
        msg.className = 'form-msg error';
        return;
    }

    if (password.length < 6) {
        msg.textContent = 'Password must be at least 6 characters.';
        msg.className = 'form-msg error';
        return;
    }

    msg.textContent = 'Account created successfully! You can now log in.';
    msg.className = 'form-msg success';
}

// ===========================
// RUN WHEN PAGE LOADS
// ===========================
updateCartCount(); // Always update cart badge on every page
displayCart();     // Show cart items (only matters on cart.html)