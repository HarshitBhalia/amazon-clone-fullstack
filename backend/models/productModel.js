const pool = require('../config/db');

const productModel = {
  // Get all products with optional search and category filter
  async getAllProducts(search, category) {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (search) {
      query += ` AND LOWER(name) LIKE LOWER($${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (category) {
      query += ` AND LOWER(category) = LOWER($${paramIndex})`;
      params.push(category);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    return result.rows;
  },

  // Get a single product by ID
  async getProductById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Get all unique categories
  async getCategories() {
    const result = await pool.query('SELECT DISTINCT category FROM products ORDER BY category');
    return result.rows.map(row => row.category);
  }
};

module.exports = productModel;
