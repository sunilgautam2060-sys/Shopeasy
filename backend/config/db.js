// Import mongoose — the tool that connects us to MongoDB
const mongoose = require('mongoose');

// This function connects to the database
const connectDB = async () => {
    try {
        // MONGO_URI comes from our .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // If connection works, print a success message
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        // If connection fails, print the error and stop the server
        console.error(`Database connection failed: ${error.message}`);
        process.exit(1); // 1 means "exit with error"
    }
};

// Export this function so server.js can use it
module.exports = connectDB;