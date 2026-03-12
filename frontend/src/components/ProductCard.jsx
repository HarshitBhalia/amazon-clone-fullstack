import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    const success = await addToCart(product.id);
    setAdding(false);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`star ${i < fullStars ? 'star-filled' : i === fullStars && hasHalf ? 'star-half' : ''}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="product-card" id={`product-card-${product.id}`}>
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card-image-wrapper">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-card-image"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="product-card-discount">-{discount}%</span>
          )}
        </div>
        <div className="product-card-info">
          <h3 className="product-card-title">{product.name}</h3>
          <div className="product-card-rating">
            <div className="stars">{renderStars(product.rating || 0)}</div>
            <span className="rating-count">({product.rating_count?.toLocaleString() || 0})</span>
          </div>
          <div className="product-card-price">
            <span className="price-currency">₹</span>
            <span className="price-value">{parseFloat(product.price).toLocaleString('en-IN')}</span>
            {product.original_price && (
              <span className="price-original">
                ₹{parseFloat(product.original_price).toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <p className="product-card-delivery">FREE Delivery by Amazon</p>
        </div>
      </Link>
      <button
        className={`add-to-cart-btn ${added ? 'added' : ''}`}
        id={`add-to-cart-${product.id}`}
        onClick={handleAddToCart}
        disabled={adding || product.stock === 0}
      >
        {adding ? 'Adding...' : added ? '✓ Added' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductCard;
