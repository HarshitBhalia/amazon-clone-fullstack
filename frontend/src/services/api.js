import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://amazon-clone-backend-1ovu.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product APIs
export const getProducts = (search = '', category = '') => {
  const params = {};
  if (search) params.search = search;
  if (category) params.category = category;
  return api.get('/products', { params });
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

export const getCategories = () => {
  return api.get('/products/categories');
};

// Cart APIs
export const getCart = (userId = 1) => {
  return api.get('/cart', { params: { userId } });
};

export const addToCart = (productId, quantity = 1, userId = 1) => {
  return api.post('/cart/add', { userId, productId, quantity });
};

export const updateCartItem = (productId, quantity, userId = 1) => {
  return api.put('/cart/update', { userId, productId, quantity });
};

export const removeFromCart = (productId, userId = 1) => {
  return api.delete('/cart/remove', { data: { userId, productId } });
};

// Order APIs
export const placeOrder = (shippingDetails, userId = 1) => {
  return api.post('/orders', { userId, shippingDetails });
};

export const getOrdersByUser = (userId = 1) => {
  return api.get(`/orders/${userId}`);
};

export const getOrderById = (orderId) => {
  return api.get(`/orders/detail/${orderId}`);
};

export default api;
