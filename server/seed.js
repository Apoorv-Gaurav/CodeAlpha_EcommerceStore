const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/codealpha_ecommerce';

const productsData = [
  {
    name: 'Organic Carrots',
    description: 'Fresh, crunchy organic carrots sourced locally.',
    price: 2.99,
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400',
    inStock: true
  },
  {
    name: 'Spicy Potato Chips',
    description: 'Crispy and fiery potato chips for your snack cravings.',
    price: 3.49,
    category: 'Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400',
    inStock: true
  },
  {
    name: 'Fresh Broccoli Crown',
    description: 'Nutrient-rich green broccoli crown.',
    price: 1.99,
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=400',
    inStock: true
  },
  {
    name: 'Salted Pretzels',
    description: 'Classic oven-baked salted pretzels.',
    price: 4.99,
    category: 'Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&q=80&w=400',
    inStock: true
  },
  {
    name: 'Red Bell Pepper',
    description: 'Sweet and crunchy red bell peppers.',
    price: 1.50,
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa8a?auto=format&fit=crop&q=80&w=400',
    inStock: true
  },
  {
    name: 'Mixed Nuts',
    description: 'A premium roasted mix of almonds, cashews, and walnuts.',
    price: 8.99,
    category: 'Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1599598425947-33004bb15037?auto=format&fit=crop&q=80&w=400',
    inStock: true
  }
];

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Seeding database...');
    await Product.deleteMany({});
    console.log('Cleared existing products.');
    await Product.insertMany(productsData);
    console.log('Successfully seeded database with snacks and vegetables.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
