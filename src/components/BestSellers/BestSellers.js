import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BestSellers.module.css';
import { Link } from 'react-router-dom';

function BestSellers() {
  const [coffees, setCoffees] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://coffeeapp-firstsip.onrender.com/api/coffees/best-sellers')
      .then((response) => {
        console.log(response.data);
        setCoffees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching coffee data:', error);
        setLoading(false);
      });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % coffees.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? coffees.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <p>Loading...</p>;
  if (coffees.length === 0) return <p>No coffee data available.</p>;

  const currentCoffee = coffees[currentIndex];
  return (
    <div className={styles['carousel-container']}>
      <h2 className={styles.heading}>Our Best Sellers</h2>
      <p className={styles['carousel-subtext']}>
        Discover our handpicked best-selling coffees, freshly roasted and
        delivered to your door.
      </p>

      <button
        onClick={prevSlide}
        className={`${styles['carousel-button']} ${styles['prev-button']}`}
      >
        &lt;
      </button>

      <div className={styles['carousel-slide']}>
        <img src={currentCoffee.imageUrl} alt={currentCoffee.name} />
        <h3>{currentCoffee.name}</h3>
        <p>{currentCoffee.description}</p>
        <p>
          <strong>Price:</strong> €{currentCoffee.price}
        </p>
      </div>

      <button
        onClick={nextSlide}
        className={`${styles['carousel-button']} ${styles['next-button']}`}
      >
        &gt;
      </button>

      <Link to={`/shop/${currentCoffee._id}`}>
        <button className={styles['details-button']}>View Details</button>
      </Link>
    </div>
  );
}

export default BestSellers;
