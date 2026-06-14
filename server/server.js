require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Order = require('./models/Order');
const path = require('path');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── Razorpay Initialization ───
let razorpay;
try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID.trim(),
      key_secret: process.env.RAZORPAY_KEY_SECRET.trim(),
    });
  } else {
    console.warn("⚠️ Razorpay environment variables are missing. Payments will not work.");
  }
} catch (error) {
  console.error("Razorpay initialization error:", error.message);
}

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
    const { userId, items, total, address, paymentMethod, razorpay_payment_id } = req.body;
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order.' });
    }

    // Save order to MongoDB
    const order = await Order.create({ 
      userId, 
      items, 
      total, 
      address, 
      paymentMethod, 
      razorpay_payment_id 
    });

    res.status(201).json(order);
  } catch (err) {
    console.error('Order saving error:', err);
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

app.delete('/api/orders/:orderId', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.json({ message: 'Order removed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// ─── Payment API (Razorpay) ───
app.post('/api/create-order', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({ message: 'Razorpay is not configured on the server.' });
    }

    const { amount, receipt } = req.body;
    
    if (!amount || amount < 100) {
      return res.status(400).json({ message: 'Invalid amount. Minimum is 100 paise.' });
    }

    const options = {
      amount,
      currency: 'INR',
      receipt: receipt || `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).send('Some error occurred');
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET ? process.env.RAZORPAY_KEY_SECRET.trim() : '';
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', secret)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      console.error('Signature mismatch!', { expectedSign, razorpay_signature });
      return res.status(400).json({ message: 'Invalid signature sent!' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// ─── Serve Static React App ───
// We serve this outside of /api routes
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
