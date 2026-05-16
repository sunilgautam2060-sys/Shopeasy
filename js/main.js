// ===========================
// CONFIGURATION
// This is the address of our backend server
// Every API call will go to this address
// ===========================
const API_URL = 'http://localhost:5000/api';

// ===========================
// CART SYSTEM
// Cart is stored in browser localStorage
// ===========================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update the cart count badge in navbar
function updateCartCount() {
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        badge.textContent = cart.length;
    });
}

// ADD TO CART
function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`"${name}" added to cart! 🛒`);
}

// DISPLAY CART ITEMS
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    const emptyMsg = document.getElementById('empty-cart-msg');

    if (!cartItemsDiv) return;

    if (cart.length === 0) {
        emptyMsg.style.display = 'block';
        cartTotalDiv.style.display = 'none';
        return;
    }

    emptyMsg.style.display = 'none';
    cartTotalDiv.style.display = 'block';

    const oldItems = cartItemsDiv.querySelectorAll('.cart-item');
    oldItems.forEach(item => item.remove());

    let total = 0;

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
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
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

// CHECKOUT — saves real order to database
async function checkout() {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login first to place an order!');
        window.location.href = 'login.html';
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Calculate total
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
        // Send order to backend
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Send the login token so backend knows who is ordering
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ items: cart, totalAmount })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Order placed successfully! Thank you for shopping with ShopEasy 🎉');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCart();
        } else {
            alert(data.message || 'Failed to place order');
        }

    } catch (error) {
        alert('Could not connect to server. Please try again.');
    }
}

// ===========================
// LOAD PRODUCTS FROM DATABASE
// Replaces the hardcoded HTML products
// with real products from MongoDB
// ===========================
async function loadProducts() {
    // Check if we are on the products page
    const container = document.getElementById('all-products');
    if (!container) return;

    // Show loading message while fetching
    container.innerHTML = '<p style="text-align:center">Loading products...</p>';

    try {
        // Fetch products from our backend API
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();

        if (products.length === 0) {
            container.innerHTML = '<p style="text-align:center">No products found.</p>';
            return;
        }

        // Clear loading message
        container.innerHTML = '';

        // Create a card for each product
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
        <img src="${product.image || 'https://via.placeholder.com/200'}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="btn-add" onclick="addToCart('${product.name}', ${product.price})">
          Add to Cart
        </button>
      `;
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = '<p style="text-align:center;color:red;">Could not load products. Make sure the server is running.</p>';
    }
}

// ===========================
// LOAD FEATURED PRODUCTS
// Same as above but for the home page
// ===========================
async function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    container.innerHTML = '<p style="text-align:center">Loading...</p>';

    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();

        container.innerHTML = '';

        // Only show first 4 products on home page
        const featured = products.slice(0, 4);

        featured.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
        <img src="${product.image || 'https://via.placeholder.com/200'}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="btn-add" onclick="addToCart('${product.name}', ${product.price})">
          Add to Cart
        </button>
      `;
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = '<p style="text-align:center;color:red;">Could not load products.</p>';
    }
}

// ===========================
// SEARCH PRODUCTS
// ===========================
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(query) ? 'block' : 'none';
    });
}

// ===========================
// LOGIN / REGISTER TAB SWITCH
// ===========================
function showTab(tab) {
    document.getElementById('login-tab').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('register-tab').style.display = tab === 'register' ? 'block' : 'none';

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// ===========================
// REGISTER — sends data to backend
// ===========================
async function registerUser() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
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

    try {
        // Send registration data to backend
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            msg.textContent = 'Account created successfully! You can now login.';
            msg.className = 'form-msg success';
        } else {
            msg.textContent = data.message || 'Registration failed.';
            msg.className = 'form-msg error';
        }

    } catch (error) {
        msg.textContent = 'Could not connect to server.';
        msg.className = 'form-msg error';
    }
}

// ===========================
// LOGIN — sends data to backend
// Saves token in localStorage on success
// ===========================
async function loginUser() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const msg = document.getElementById('login-msg');

    if (!email || !password) {
        msg.textContent = 'Please fill in all fields.';
        msg.className = 'form-msg error';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save token and user info to localStorage
            // This keeps the user logged in even after refreshing
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            msg.textContent = `Welcome back, ${data.user.name}! Redirecting...`;
            msg.className = 'form-msg success';

            // Redirect to home page after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);

        } else {
            msg.textContent = data.message || 'Login failed.';
            msg.className = 'form-msg error';
        }

    } catch (error) {
        msg.textContent = 'Could not connect to server.';
        msg.className = 'form-msg error';
    }
}

// ===========================
// LOGOUT
// ===========================
function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// ===========================
// UPDATE NAVBAR
// Shows username if logged in
// Shows logout button instead of login
// ===========================
function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // Find the login link and replace with user name + logout
    const loginLink = navLinks.querySelector('a[href="login.html"]');
    if (loginLink && user) {
        const li = loginLink.parentElement;
        li.innerHTML = `
      <span style="color:#e94560;font-weight:bold;">Hi, ${user.name}</span>
      &nbsp;|&nbsp;
      <a href="#" onclick="logoutUser()">Logout</a>
    `;
    }
}

// ===========================
// RUN WHEN PAGE LOADS
// ===========================
updateCartCount();
updateNavbar();
displayCart();
loadFeaturedProducts();
loadProducts();