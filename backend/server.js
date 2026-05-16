const path = require('path');
const fs = require('fs');

// Manually read .env file and set environment variables
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            process.env[key.trim()] = valueParts.join('=').trim();
        }
    });
    console.log('ENV file loaded manually');
} else {
    console.log('ENV file not found at:', envPath);
}

console.log('MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'ShopEasy API is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});