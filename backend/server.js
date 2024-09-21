// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan')

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();


// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(morgan('dev'));

// Import Routes
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders')

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Dessert App Backend!');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
  // Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
