const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        // Get the token from the request header
        // When a user logs in, the frontend sends their token with every request
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Verify the token is genuine using our secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user info to the request so routes can use it
        req.user = decoded;

        // Move on to the actual route
        next();

    } catch (error) {
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
};

module.exports = { protect };