const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    weight: String,
    imageUrl: String,
    _id: String
  }],
  total: {
    type: Number,
    required: true
  },
  address: {
    name: String,
    phone: String,
    street: String,
    city: String,
    pincode: String
  },
  paymentMethod: {
    type: String,
    default: 'COD'
  },
  razorpay_payment_id: {
    type: String
  },
  status: {
    type: String,
    default: 'Confirmed',
    enum: ['Confirmed', 'Shipped', 'Delivered', 'Cancelled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
