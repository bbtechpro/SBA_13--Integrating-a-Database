//  API Routes and Logic
// In routes/productRoutes.js, use express.Router() to define your API endpoints. The logic for each route should be handled directly within the route file for this assessment.

const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, category, inStock, tags } = req.body;
    const newProduct = new Product({ name, description, price, category, inStock, tags });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a product by ID
router.get('/products/:id', async (req, res) => {
  try {    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product by ID
router.put('/products/:id', async (req, res) => {
  try {
    const { name, description, price, category, inStock, tags } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, inStock, tags },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  try {    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;