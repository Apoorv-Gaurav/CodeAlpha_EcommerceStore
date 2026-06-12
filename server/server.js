require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── MongoDB Connection ───
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err.message));

// ─── Products (static catalog — no need to store in DB) ───
const productsData = require('./data/products');

// ─── Products API ───
app.get('/api/products', (req, res) => {
  res.json(productsData);
});

// ─── Auth API (now uses MongoDB!) ───
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if email already exists in MongoDB
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Save new user to MongoDB
    const user = await User.create({ name, email, password });

    // Return user without password
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in MongoDB
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ─── Orders API (now uses MongoDB!) ───
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, total } = req.body;
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order.' });
    }

    // Save order to MongoDB
    const order = await Order.create({ userId, items, total });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.get('/api/orders/:userId', async (req, res) => {
  try {
    // Fetch all orders for this user from MongoDB, newest first
    const userOrders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(userOrders);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
