const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products - Get all products (with optional search and category filter)
router.get('/', productController.getProducts);

// GET /api/products/categories - Get all product categories
router.get('/categories', productController.getCategories);

// GET /api/products/:id - Get a single product by ID
router.get('/:id', productController.getProductById);

module.exports = router;
