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

// GET /api/products (Read All Products with Advanced Querying)

// This is the most complex endpoint. It should retrieve all products but also support the following optional query parameters:
// category: Filter products by a specific category.
// minPrice: Filter products with a price greater than or equal to this value.
// maxPrice: Filter products with a price less than or equal to this value.
// sortBy: Sort results. For example, price_asc for ascending price or price_desc for descending price.
// page & limit: For pagination (defaulting to page 1, limit 10).
// Dynamically build the Mongoose query based on which query parameters are provided.
// Respond with an array of the resulting products.

router.get('/products', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (minPrice !== undefined) {
      query.price = { ...query.price, $gte: parseFloat(minPrice) };
    }

    if (maxPrice !== undefined) {
      query.price = { ...query.price, $lte: parseFloat(maxPrice) };
    }

    let sort = {};
    if (sortBy === 'price_asc') {
      sort.price = 1;
    } else if (sortBy === 'price_desc') {
      sort.price = -1;
    }

    const products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;