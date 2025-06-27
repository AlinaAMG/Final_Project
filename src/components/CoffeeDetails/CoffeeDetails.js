import './CoffeeDetail.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Importing heart icons
import ShareIcon from './ShareIcon';
import StarRating from '../StarRating/StarRating';



function CoffeeDetail() {
  const { id } = useParams();
  const [coffee, setCoffee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWeight, setSelectedWeight] = useState('250g');
  const [selectedRoast, setSelectedRoast] = useState('Light');
  const [selectedBeanType, setSelectedBeanType] = useState('Whole Beans'); // New state for bean type
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    axios
      .get(`http://coffeeapp-firstsip.onrender.com/api/coffees/coffee/${id}`)
      .then((res) => {
        setCoffee(res.data);
        setLoading(false);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavoriteCoffee = favorites.some((fav) => fav.id === id);
        setIsFavorite(isFavoriteCoffee);
      })
      .catch((err) => {
        console.error('Error fetching coffee details:', err);
        setLoading(false);
      });
  }, [id]);

  const handleWeightChange = (e) => setSelectedWeight(e.target.value);
  const handleRoastChange = (e) => setSelectedRoast(e.target.value);
  const handleBeanTypeChange = (e) => setSelectedBeanType(e.target.value); // Handler for bean type dropdown
  const handleQuantityChange = (e) => setQuantity(e.target.value);

  const getDisplayedPrice = () => {
    if (!coffee || !coffee.price) return '0.00';

    let basePrice = coffee.price;
    let weightMultiplier = 1;

    if (selectedWeight === '1000g') {
      weightMultiplier = 4;
    }

    const totalPrice = basePrice * weightMultiplier * quantity;
    return totalPrice.toFixed(2);
  };

  const handleAddToCart = () => {
    if (selectedWeight === 'choose') {
      alert('Please select a weight!');
      return;
    }

    const cartItem = { coffee, selectedWeight, selectedBeanType, quantity }; // Include selected bean type
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    const itemIndex = currentCart.findIndex(
      (item) =>
        item.coffee && item.coffee._id === cartItem.coffee._id &&
        item.selectedWeight === cartItem.selectedWeight &&
        item.selectedBeanType === cartItem.selectedBeanType // Compare bean type
    );

    if (itemIndex > -1) {
      currentCart[itemIndex].quantity += cartItem.quantity;
    } else {
      currentCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));

    const currentCartCount = currentCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    localStorage.setItem('cartCount', currentCartCount);
    window.dispatchEvent(new Event('cartUpdated'));

    alert('Item added to the cart!');
  };

  useEffect(() => {
    if (!coffee) return;

    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = stored.some((fav) => fav._id === coffee._id);
    setIsFavorite(exists);
  }, [coffee]);

  const handleAddToFavorites = () => {
    const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = currentFavorites.some(
      (fav) => fav._id === coffee._id
    );
    let updatedFavorites;

    if (isAlreadyFavorite) {
      updatedFavorites = currentFavorites.filter(
        (fav) => fav._id !== coffee._id
      );
      setIsFavorite(false);
      alert('Removed from favorites!');
    } else {
      updatedFavorites = [
        ...currentFavorites,
        {
          _id: coffee._id,
          name: coffee.name,
          imageUrl: coffee.imageUrl,
          price: coffee.price,
        },
      ];
      setIsFavorite(true);
      alert('Added to favorites!');
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  if (loading) return <p>Loading...</p>;
  if (!coffee) return <p>Coffee not found</p>;

  return (
    <div className="coffee-single-wrapper">
      <Link to="/shop/all-coffees">
        <i className="bi bi-arrow-left" style={{ color: '#4b2e2a' }}></i>
      </Link>
      <div className="coffee-single-container">
        <div className="coffee-single-image-box">
          <img
            src={coffee.imageUrl}
            alt={coffee.name}
            className="coffee-single-image"
          />
        </div>

        <div className="coffee-single-info">
          <h1 className="coffee-single-title">{coffee.name}</h1>
          <div className="icons-container">
            <div
              className="favorite-icon"
              onClick={handleAddToFavorites}
              style={{
                cursor: 'pointer',
                fontSize: '2rem',
              }}
            >
              {isFavorite ? (
                <FaHeart style={{ color: 'rgb(230, 207, 53)' }} />
              ) : (
                <FaRegHeart className="heart" />
              )}
            </div>
            <ShareIcon />
          </div>

          <p className="coffee-single-description">{coffee.description}</p>
          <p>
            <strong >Notes:</strong>{' '}
            {coffee.notes.join(', ')}
          </p>
          <p>
            <strong >Category:</strong>{' '}
            {coffee.category}
          </p>
          <div className="coffee-rating">
            <strong>Rating: </strong>
            <StarRating rating={coffee.rating} />
          </div>
          <p>
            <strong >Region:</strong> {coffee.region}
          </p>

          <div className="dropdown-parent">
            <div className="coffee-single-weight">
              <label>Select Weight: </label>
              <select value={selectedWeight} onChange={handleWeightChange}>
                <option value="choose">Choose an option</option>
                <option value="250g">250g</option>
                <option value="1000g">1000g</option>
              </select>
            </div>

            <div className="coffee-single-roast">
              <label>Select Roast: </label>
              <select value={selectedRoast} onChange={handleRoastChange}>
                <option value="choose">Choose an option</option>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Dark">Dark</option>
              </select>
            </div>

            <div className="coffee-single-bean-type">
              <label>Type: </label>
              <select value={selectedBeanType} onChange={handleBeanTypeChange}>
              <option value="choose">Choose an option</option>
                <option value="Whole Beans">Whole Beans</option>
                <option value="Ground">Ground</option>
              </select>
            </div>

            <div className="coffee-single-quantity">
              <label>Quantity: </label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
              />
            </div>
          </div>

          <p className="totalPrice">
            <strong >Total:</strong>&euro;
            {getDisplayedPrice()}
          </p>

          <button className="coffee-single-add-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="coffee-single-long-description">
        <h4>Product Description</h4>
        {coffee.longDescription.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default CoffeeDetail;
