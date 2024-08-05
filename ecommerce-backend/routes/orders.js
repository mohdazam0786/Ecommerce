const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const router = express.Router();

// Create Order
router.post('/', async (req, res) => {
  try {
    const { user, items, total } = req.body;
    const order = new Order({ user, items, total });
    await order.save();
    await Cart.findOneAndDelete({ user }); // Clear cart after order
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get Orders
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('items.product');
    res.send(orders);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
