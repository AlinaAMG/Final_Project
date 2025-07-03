import styles from './Checkout.module.css';
import { Link } from 'react-router-dom';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from 'react-icons/fa';

const CheckoutPage = () => {
  return (
    <div className={styles['container-payment']}>
      <div className={styles['form-group']}>
        <h2>1.Contact informations</h2>
        <p>
          We'll use this email to send you details and updates about your order.
        </p>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Email" required />
        <p>You are currently checking out as a guest.</p>
        <div className={styles['login-redirect']}>
          <p>
            Already have an account?{' '}
            <Link className={styles.return} to="/login">
              LogIn here
            </Link>
          </p>
        </div>
      </div>

      <h2>2.Shipping and Payment Information</h2>

      <form className={styles.form}>
        <div className={styles['form-group']}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter your address"
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" placeholder="Enter your city" required />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Postal code"
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter your country"
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="expirationDate">Expiration Date</label>
          <input type="text" id="expirationDate" placeholder="MM/YY" required />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" placeholder="123" required />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="cardHolder">Cardholder Name</label>
          <input
            type="text"
            id="cardHolder"
            placeholder="Cardholder Name"
            required
          />
        </div>

        <div className={styles['card-icons']}>
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcAmex />
          <FaCcPaypal />
        </div>

        <div className={styles['container-pay']}>
          <Link className={styles.return} to="/cart">
            <i className="bi bi-arrow-left" style={{ color: '#4b2e2a' }}></i>{' '}
            Return to Basket
          </Link>
          <div className={styles['btn-payment']}>
            <button type="submit" className={styles['primary-button']}>
              Submit Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
