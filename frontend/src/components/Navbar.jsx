import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiSearch, FiShoppingCart, FiMenu, FiMapPin, FiChevronDown } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" id="main-navbar">
        <Link to="/" className="navbar-logo" id="logo-link">
          <span className="logo-text">amazon</span>
          <span className="logo-suffix">.clone</span>
        </Link>

        <div className="navbar-delivery" id="delivery-address">
          <FiMapPin className="delivery-icon" />
          <div className="delivery-text">
            <span className="deliver-to">Deliver to</span>
            <span className="delivery-location">India</span>
          </div>
        </div>

        <form className="navbar-search" id="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            id="search-input"
            placeholder="Search Amazon Clone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" id="search-btn">
            <FiSearch />
          </button>
        </form>

        <div className="navbar-actions">
          <Link to="/orders" className="nav-link" id="orders-link">
            <span className="nav-link-top">Returns</span>
            <span className="nav-link-bottom">& Orders</span>
          </Link>

          <Link to="/cart" className="nav-cart" id="cart-link">
            <div className="cart-icon-wrapper">
              <FiShoppingCart className="cart-icon" />
              <span className="cart-count" id="cart-count">{cartCount}</span>
            </div>
            <span className="cart-text">Cart</span>
          </Link>
        </div>
      </nav>

      <div className="sub-navbar" id="sub-navbar">
        <Link to="/" className="sub-nav-link">All</Link>
        <Link to="/?category=Electronics" className="sub-nav-link">Electronics</Link>
        <Link to="/?category=Clothing" className="sub-nav-link">Clothing</Link>
        <Link to="/?category=Home%20%26%20Kitchen" className="sub-nav-link">Home & Kitchen</Link>
        <Link to="/?category=Books" className="sub-nav-link">Books</Link>
        <Link to="/?category=Sports" className="sub-nav-link">Sports</Link>
        <Link to="/orders" className="sub-nav-link">Order History</Link>
      </div>
    </header>
  );
}

export default Navbar;
