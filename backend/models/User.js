// Import mongoose to define the model
const mongoose = require('mongoose');

// Define what a User looks like in the database
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true  // This field is mandatory
    },

    email: {
        type: String,
        required: true,
        unique: true    // No two users can have the same email
    },

    password: {
        type: String,
        required: true
        // Note: we will NEVER store the real password
        // It will be scrambled (hashed) before saving
    },

    // When was this account created?
    createdAt: {
        type: Date,
        default: Date.now  // Automatically set to current time
    }

});

// Export the model so other files can use it
module.exports = mongoose.model('User', userSchema);