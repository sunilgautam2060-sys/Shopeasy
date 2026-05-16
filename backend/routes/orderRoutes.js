const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        const order = await Order.create({
            user: req.user.id,
            items,
            totalAmount
        });

        res.status(201).json({ message: 'Order placed successfully', order });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;