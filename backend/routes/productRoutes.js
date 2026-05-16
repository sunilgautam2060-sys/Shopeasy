const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ===========================
// GET ALL PRODUCTS — GET /api/products
// Frontend calls this to show products on the page
// ===========================
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Get all products from DB
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ===========================
// GET SINGLE PRODUCT — GET /api/products/:id
// ===========================
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ===========================
// SEED PRODUCTS — POST /api/products/seed
// This adds sample products to the database
// Run this once to populate your store
// ===========================
router.post('/seed', async (req, res) => {
    try {
        await Product.deleteMany(); // Clear existing products

        const products = [
            { name: 'Wireless Headphones', description: 'High quality sound, 20hr battery', price: 49.99, category: 'Electronics' },
            { name: 'Smart Watch', description: 'Tracks fitness, sleep and more', price: 89.99, category: 'Electronics' },
            { name: 'Running Shoes', description: 'Lightweight, perfect for daily runs', price: 65.00, category: 'Footwear' },
            { name: 'Backpack', description: 'Fits laptop up to 15 inches', price: 35.00, category: 'Bags' },
            { name: 'Sunglasses', description: 'UV400 protection, stylish frame', price: 25.00, category: 'Accessories' },
            { name: 'Water Bottle', description: 'Keeps drinks cold for 24 hours', price: 18.00, category: 'Accessories' },
        ];

        await Product.insertMany(products);
        res.json({ message: 'Products seeded successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;