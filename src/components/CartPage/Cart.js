import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBasket, FaTrash } from 'react-icons/fa';
import styles from './Cart.module.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart loaded:', storedCart);
    setCartItems(storedCart);
  }, []);

  const handleQuantityChange = useCallback(
    (index, newQuantity) => {
      const updatedCart = [...cartItems];
      updatedCart[index].quantity = parseInt(newQuantity);
      setCartItems(updatedCart);

      // Save updated cart in localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Update cart count in localStorage
      const updatedCartCount = updatedCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      localStorage.setItem('cartCount', updatedCartCount);

      // Dispatch event to update navbar cart count
      window.dispatchEvent(new Event('cartUpdated'));
    },
    [cartItems]
  );

  const handleDelete = useCallback(
    (index) => {
      const updatedCart = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCart);

      // Save the updated cart in localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Update cart count in localStorage after deleting an item
      const updatedCartCount = updatedCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      localStorage.setItem('cartCount', updatedCartCount);

      // Dispatch event to notify that the cart has been updated
      window.dispatchEvent(new Event('cartUpdated'));
    },
    [cartItems]
  );

  const getTotalPrice = useCallback(() => {
    return cartItems
      .reduce((total, item) => {
        const isSubscription = item.type === 'subscription';

        if (isSubscription) {
          // Subscription box: flat price
          return total + item.price * item.quantity;
        } else {
          // Regular coffee item
          const basePrice = item.coffee?.price || 0;
          const weightMultiplier = item.selectedWeight === '1000g' ? 4 : 1;
          return total + basePrice * weightMultiplier * item.quantity;
        }
      }, 0)
      .toFixed(2);
  }, [cartItems]);

  const handleClick = useCallback(() => {
    // you could add logic here first
    navigate('/check-out');
  }, [navigate]);

  // Calculate shipping fee
  const totalPrice = useMemo(
    () => parseFloat(getTotalPrice()),
    [getTotalPrice]
  );
  const shippingFee = useMemo(
    () => (totalPrice >= 39.99 ? 0 : 4.99),
    [totalPrice]
  );
  const totalWithShipping = useMemo(
    () => totalPrice + shippingFee,
    [shippingFee, totalPrice]
  );

  if (cartItems.length === 0) {
    return (
      <div className={styles['cart-empty']}>
        <FaShoppingBasket size={120} color="#ccc" />
        <h2>Your cart is currently empty</h2>
        <Link to="/shop/all-coffees" className={styles['btn-back']}>
          Go back to shop
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h2 className={styles.title}>Shopping Cart</h2>
      <div className={styles['cart-wrapper']}>
        <div className={styles['cart-items']}>
          {cartItems.map((item, index) => {
            const isSubscription = item.type === 'subscription';

            return (
              <div className={styles['cart-item']} key={index}>
                <img
                  src={
                    isSubscription
                      ? !item.imageUrl
                        ? 'path/to/placeholder.jpg'
                        : item.imageUrl
                      : !item.coffee?.imageUrl
                      ? 'path/to/placeholder.jpg'
                      : item.coffee?.imageUrl
                  }
                  alt={
                    isSubscription
                      ? item.name || 'Coffee Box'
                      : item.coffee?.name || 'Coffee'
                  }
                  className={styles['cart-item-img']}
                />

                <div className={styles['cart-item-info']}>
                  <h4>{isSubscription ? item.name : item.coffee?.name}</h4>

                  <p>
                    Weight:{' '}
                    {isSubscription ? `${item.weight}g` : item.selectedWeight}
                  </p>

                  <p className={styles.qty}>
                    Quantity:
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    >
                      {[...Array(10).keys()].map((n) => (
                        <option key={n + 1} value={n + 1}>
                          {n + 1}
                        </option>
                      ))}
                    </select>
                  </p>

                  <p>
                    Price: €
                    {isSubscription
                      ? (item.price * item.quantity).toFixed(2)
                      : (
                          item.coffee?.price *
                          (item.selectedWeight === '1000g' ? 4 : 1) *
                          item.quantity
                        ).toFixed(2)}
                  </p>

                  <button
                    className={styles['delete-btn']}
                    onClick={() => handleDelete(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles['cart-summary']}>
          <div className={styles.price}>
            <h4>Total</h4>
            <h5>€{getTotalPrice()}</h5>
          </div>

          <div className={styles.shipping}>
            <h3>Shipping:</h3>
            <h5>
              {shippingFee === 0
                ? 'Free Shipping'
                : ` €${shippingFee.toFixed(2)}`}
            </h5>
          </div>

          <div className={styles.total}>
            <h4>Total with Shipping:</h4>
            <h5>
              <strong>€{totalWithShipping.toFixed(2)}</strong>
            </h5>
          </div>

          <div className={styles['cart-actions']}>
            <Link to="/shop/all-coffees" className={styles['btn-back']}>
              Continue Shopping
            </Link>
            <button onClick={handleClick} className={styles['btn-purchase']}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartPage;
