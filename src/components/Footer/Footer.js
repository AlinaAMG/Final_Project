import { Link } from 'react-router-dom';
import './Footer.css';
import { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      setMessage('Thank you for subscribing to our newsletter');
      setEmail('');
    } else {
      setMessage('Fill your email address in..');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Links Section */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Our Story</Link>
            </li>
            <li>
              <Link to="/shop/all-coffees">Products</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Subscription Section */}
        <div className="footer-subscribe">
          <h3>Subscribe for 10% Off</h3>
          <p>Get the latest news, offers, and coffee trends!</p>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Subscribe</button>
          </form>
          {message && (
            <p
              style={{
                marginTop: '10px',
                color: message.includes('Thank you') ? 'green' : 'red',
              }}
            >
              {message}
            </p>
          )}
        </div>

        {/* Social Media Section (Follow Us) - Now on the right */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook"></i>
            </Link>

            <Link
              to="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </Link>

            <Link
              to="https://www.youtube.com/watch?v=yagagM7SlWs&t=2s"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-youtube"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()}{' '}
          <Link to="/" className="link">
            FIRST SIP COFFEE. <i className="bi bi-cup-hot-fill"></i>{' '}
          </Link>
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
