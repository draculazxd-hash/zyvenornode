require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const seedCheck = require('./utils/seedCheck');

const authRoutes = require('./routes/auth');
const packageRoutes = require('./routes/packages');
const orderRoutes = require('./routes/orders');
const settingsRoutes = require('./routes/settings');
const categoryRoutes = require('./routes/categories');
const customerRoutes = require('./routes/customers');
const adminRoutes = require('./routes/admin');

const app = express();

// CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Rate limit
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api', generalLimiter);


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/admin', adminRoutes);


// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ZyvenorMC API is running',
    timestamp: new Date().toISOString()
  });
});


// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found - ${req.method} ${req.originalUrl}`
  });
});


// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors
    });
  }


  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}`
    });
  }


  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];

    return res.status(400).json({
      success: false,
      message: `Duplicate value for ${key}`
    });
  }


  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production'
      ? undefined
      : err.message
  });
});


// MongoDB Connection
mongoose.set('strictQuery', false);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

    await seedCheck();

  } catch (error) {
    console.error(
      `MongoDB Error: ${error.message}`
    );
  }
}


// Connect database before requests
connectDB();


// IMPORTANT FOR VERCEL
module.exports = app;