const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        default: 'https://via.placeholder.com/200' // Default image if none given
    },

    category: {
        type: String,
        default: 'General'
    },

    stock: {
        type: Number,
        default: 10  // How many are available
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Product', productSchema);