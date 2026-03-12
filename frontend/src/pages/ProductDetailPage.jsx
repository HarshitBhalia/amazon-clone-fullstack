import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getProductById(id);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setAdding(true);
    const success = await addToCart(product.id, quantity);
    setAdding(false);
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    }
  };

  const handleBuyNow = async () => {
    const success = await addToCart(product.id, quantity);
    if (success) {
      navigate('/checkout');
    }
  };

  const images = product?.images || [product?.image_url];
  const discount = product?.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`star ${i < Math.floor(rating) ? 'star-filled' : ''}`}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="detail-skeleton-left">
          <div className="skeleton-image large"></div>
        </div>
        <div className="detail-skeleton-right">
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
          <div className="skeleton-text shorter"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')}>Go back to shopping</button>
      </div>
    );
  }

  return (
    <div className="product-detail-page" id="product-detail-page">
      <div className="product-detail-container">
        {/* Left - Image Gallery */}
        <div className="product-gallery">
          <div className="gallery-thumbnails">
            {images.map((img, index) => (
              <button
                key={index}
                className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} />
              </button>
            ))}
          </div>
          <div className="gallery-main">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="main-image"
            />
            {images.length > 1 && (
              <>
                <button
                  className="gallery-nav gallery-prev"
                  onClick={() => setSelectedImage(prev => (prev - 1 + images.length) % images.length)}
                >
                  <FiChevronLeft />
                </button>
                <button
                  className="gallery-nav gallery-next"
                  onClick={() => setSelectedImage(prev => (prev + 1) % images.length)}
                >
                  <FiChevronRight />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Middle - Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          {product.brand && <p className="product-brand">by <span>{product.brand}</span></p>}

          <div className="product-rating-section">
            <div className="stars">{renderStars(product.rating || 0)}</div>
            <span className="rating-value">{product.rating}</span>
            <span className="rating-count">{product.rating_count?.toLocaleString()} ratings</span>
          </div>

          <div className="product-price-section">
            {discount > 0 && <span className="discount-badge">-{discount}%</span>}
            <div className="price-row">
              <span className="price-symbol">₹</span>
              <span className="price-whole">{parseFloat(product.price).toLocaleString('en-IN')}</span>
            </div>
            {product.original_price && (
              <p className="mrp">M.R.P.: <s>₹{parseFloat(product.original_price).toLocaleString('en-IN')}</s></p>
            )}
            <p className="tax-info">Inclusive of all taxes</p>
          </div>

          <hr className="section-divider" />

          <div className="product-description">
            <h3>About this item</h3>
            <p>{product.description}</p>
          </div>

          {product.specifications && (
            <div className="product-specifications">
              <h3>Technical Details</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(
                    typeof product.specifications === 'string'
                      ? JSON.parse(product.specifications)
                      : product.specifications
                  ).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-key">{key}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right - Buy Box */}
        <div className="buy-box">
          <div className="buy-box-card">
            <div className="buy-box-price">
              <span className="price-symbol">₹</span>
              <span className="price-whole">{parseFloat(product.price).toLocaleString('en-IN')}</span>
            </div>
            <p className="delivery-info">
              <span className="free-delivery">FREE delivery</span>
              <span className="delivery-date"> Tomorrow</span>
            </p>

            <div className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? (
                <>
                  <FiCheck className="stock-icon" />
                  <span>In Stock</span>
                  {product.stock < 10 && (
                    <span className="low-stock"> — Only {product.stock} left!</span>
                  )}
                </>
              ) : (
                <span>Currently unavailable</span>
              )}
            </div>

            {product.stock > 0 && (
              <>
                <div className="quantity-selector">
                  <label htmlFor="qty-select">Quantity:</label>
                  <select
                    id="qty-select"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  >
                    {[...Array(Math.min(10, product.stock))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <button
                  className={`buy-box-btn add-to-cart-btn ${added ? 'added' : ''}`}
                  id="detail-add-to-cart"
                  onClick={handleAddToCart}
                  disabled={adding}
                >
                  {adding ? 'Adding...' : added ? '✓ Added to Cart' : 'Add to Cart'}
                </button>

                <button
                  className="buy-box-btn buy-now-btn"
                  id="detail-buy-now"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </>
            )}

            <div className="buy-box-meta">
              <div className="meta-row">
                <span className="meta-label">Ships from</span>
                <span className="meta-value">Amazon Clone</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Sold by</span>
                <span className="meta-value">{product.brand || 'Amazon Clone'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
