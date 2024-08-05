const express = require('express');
const Stripe = require('stripe');
const Order = require('../models/Order');

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Handle Payment
router.post('/', async (req, res) => {
  try {
    const { amount, token } = req.body;
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source: token,
      description: 'E-Commerce Payment',
    });
    res.send(charge);
  } catch (error) {
    res.status(500).send('Payment error');
  }
});

module.exports = router;
