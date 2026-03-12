import { Link } from 'react-router-dom';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <button className="back-to-top" onClick={scrollToTop}>
        Back to top
      </button>
      <div className="footer-content">
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Get to Know Us</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press Releases</a></li>
              <li><a href="#">Amazon Science</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect with Us</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Make Money with Us</h4>
            <ul>
              <li><a href="#">Sell on Amazon</a></li>
              <li><a href="#">Sell under Amazon Accelerator</a></li>
              <li><a href="#">Protect and Build Your Brand</a></li>
              <li><a href="#">Amazon Global Selling</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Let Us Help You</h4>
            <ul>
              <li><Link to="/orders">Your Orders</Link></li>
              <li><a href="#">Returns Centre</a></li>
              <li><a href="#">Recalls and Product Safety Alerts</a></li>
              <li><Link to="/cart">Your Cart</Link></li>
              <li><a href="#">Help</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <Link to="/" className="footer-logo">
          <span className="logo-text">amazon</span>
          <span className="logo-suffix">.clone</span>
        </Link>
        <p className="footer-copyright">
          © 2026 Amazon Clone. This is a demo project for educational purposes only.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
