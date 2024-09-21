const express = require('express');
const router = express.Router();
const Order = require('./../models/Order');
const { createOrder } = require('./../controllers/orderController');
const authMiddleware = require('./../middleware/authMiddleware');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', authMiddleware, createOrder);
router.post('/', authMiddleware, async (req, res) => {
  const { cart, address } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  if (!address || address.trim() === '') {
    return res.status(400).json({ message: 'Address is required' });
  }

  try {
    // Calculate total
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Create new order
    const newOrder = new Order({
      user: req.user.id,
      cart,
      address,
      total,
    });

    const savedOrder = await newOrder.save();

    // TODO: Send order confirmation email to restaurant owner/admin
    // You can use packages like nodemailer for sending emails

    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
