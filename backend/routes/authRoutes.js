const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ===========================
// REGISTER — POST /api/auth/register
// Creates a new user account
// ===========================
router.post('/register', async (req, res) => {
    try {
        // Get name, email, password from the request body
        const { name, email, password } = req.body;

        // Check if a user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash (scramble) the password before saving
        // The "10" means how scrambled — higher = more secure but slower
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Send back a success response
        res.status(201).json({
            message: 'Account created successfully',
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ===========================
// LOGIN — POST /api/auth/login
// Checks credentials and returns a token
// ===========================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token — like a digital ID card
        // It expires in 7 days so users stay logged in
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;