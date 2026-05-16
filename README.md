# 🛒 ShopEasy - Full Stack E-Commerce Website

A complete full stack e-commerce web application built as a college assignment.

---

## 🌐 Project Overview

ShopEasy is an online store where users can browse products, register an account, login securely, add items to cart, and place orders. The project demonstrates full stack web development using Node.js, Express, MongoDB and Vanilla JavaScript.

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas (Cloud Database)

### Tools Used
- Git and GitHub (Version Control)
- JWT (User Authentication)
- bcryptjs (Password Encryption)
- VS Code (Code Editor)

---

## 📁 Project Structure

shop-easy/
├── index.html            # Home page
├── products.html         # Products listing page
├── cart.html             # Shopping cart page
├── login.html            # Login and register page
├── about.html            # About page
├── css/
│   └── style.css         # All styles for the website
├── js/
│   └── main.js           # All frontend logic and API calls
├── images/               # Product images
│   ├── headphones.jpg
│   ├── watch.jpg
│   ├── shoes.jpg
│   ├── backpack.jpg
│   ├── sunglasses.jpg
│   └── bottle.jpg
└── backend/
├── server.js             # Main server entry point
├── .env                  # Environment variables (not uploaded)
├── config/
│   └── db.js             # MongoDB connection
├── models/
│   ├── User.js           # User database model
│   ├── Product.js        # Product database model
│   └── Order.js          # Order database model
├── routes/
│   ├── authRoutes.js     # Login and register APIs
│   ├── productRoutes.js  # Product APIs
│   └── orderRoutes.js    # Order APIs
└── middleware/
└── authMiddleware.js # JWT authentication guard

---

## ✨ Features

- 🏠 Home page with featured products
- 🛍️ Products page with real data from MongoDB
- 🔍 Search products by name
- 🛒 Add and remove items from cart
- 👤 User registration with encrypted password
- 🔐 User login with JWT authentication
- 📦 Place orders (requires login)
- 👋 Navbar shows logged in username
- 📱 Responsive design for mobile and desktop

---

## 🚀 How to Run This Project

### Step 1 - Clone the repository

### Step 2 - Setup backend

cd backend
npm install

### Step 3 - Create .env file inside backend folder
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=shopeasy_super_secret_key_2025

### Step 4 - Start the backend server
node server.js

### Step 5 - Open the frontend
Open `index.html` with Live Server in VS Code

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get single product |
| POST | /api/products/seed | Seed sample products |
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| POST | /api/orders | Place an order |
| GET | /api/orders/myorders | Get my orders |

---

## 👨‍💻 Developer

- **Name:** Sunil Gautam
- **GitHub:** [sunilgautam2060-sys](https://github.com/sunilgautam2060-sys)

---

## 📝 License

This project was built for educational purposes as a college assignment.
