import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCart as apiAddToCart, updateCartItem as apiUpdateCart, removeFromCart as apiRemoveFromCart } from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [subtotal, setSubtotal] = useState('0.00');
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCart();
      const { items, count, subtotal } = response.data.data;
      setCartItems(items);
      setCartCount(count);
      setSubtotal(subtotal);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await apiAddToCart(productId, quantity);
      setCartCount(response.data.cartCount);
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await apiUpdateCart(productId, quantity);
      setCartCount(response.data.cartCount);
      await fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await apiRemoveFromCart(productId);
      setCartCount(response.data.cartCount);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    setSubtotal('0.00');
  };

  return (
    <CartContext.Provider value={{
      cartItems, cartCount, subtotal, loading,
      addToCart, updateQuantity, removeItem, clearCart, fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
