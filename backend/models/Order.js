const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cart: [
    {
      dessertId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Dessert',
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less than 1.'],
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  address: {
    type: String,
    required: true,
    trim: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
