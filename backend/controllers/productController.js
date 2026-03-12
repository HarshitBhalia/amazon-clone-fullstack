const productModel = require('../models/productModel');

const productController = {
  // GET /api/products?search=...&category=...
  async getProducts(req, res) {
    try {
      const { search, category } = req.query;
      const products = await productModel.getAllProducts(search, category);
      res.json({ success: true, data: products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ success: false, message: 'Server error fetching products' });
    }
  },

  // GET /api/products/categories
  async getCategories(req, res) {
    try {
      const categories = await productModel.getCategories();
      res.json({ success: true, data: categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ success: false, message: 'Server error fetching categories' });
    }
  },

  // GET /api/products/:id
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productModel.getProductById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.json({ success: true, data: product });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ success: false, message: 'Server error fetching product' });
    }
  }
};

module.exports = productController;
