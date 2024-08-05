const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Create Product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const product = new Product({ name, description, price, image });
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
