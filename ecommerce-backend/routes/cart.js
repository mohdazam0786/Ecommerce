const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

// Add Item to Cart
router.post('/', async (req, res) => {
  try {
    const { user, product, quantity } = req.body;
    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = new Cart({ user, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === product);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get Cart Items
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    res.send(cart);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
