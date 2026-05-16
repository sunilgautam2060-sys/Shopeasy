const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    // Which user placed this order?
    // This links to the User model using their ID
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Array of items in the order
    items: [
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],

    // Total price of the order
    totalAmount: {
        type: Number,
        required: true
    },

    // Current status of the order
    status: {
        type: String,
        default: 'Processing',
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
        // enum means only these values are allowed
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Order', orderSchema);