// ===========================
// LOAD ENVIRONMENT VARIABLES
// Must be the very first line
// ===========================
require('dotenv').config();

// Import the tools we installed
const express = require('express');
const cors = require('cors');

// Import our database connection function
const connectDB = require('./config/db');

// Import all our route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Create the Express app
// Think of this as turning on the server machine
const app = express();

// ===========================
// MIDDLEWARE — runs on every request
// ===========================

// CORS allows your frontend (port 5500) to talk to backend (port 5000)
// Without this the browser blocks the connection for security reasons
app.use(cors());

// This lets Express read JSON data sent from the frontend
app.use(express.json());

// ===========================
// CONNECT TO DATABASE
// ===========================
connectDB();

// ===========================
// ROUTES
// Tell the server which file handles which URL
// ===========================
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// A simple test route — visit this to check server is running
app.get('/', (req, res) => {
    res.json({ message: 'ShopEasy API is running!' });
});

// ===========================
// START THE SERVER
// ===========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});