import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home';
import Footer from './components/Footer/Footer';

// import CoffeeQuiz from './components/Quiz/Quiz';
// import OurStory from './components/OurStory/OurStory';
// import OurOrigins from './components/OurOrigins/OurOrigins';
// import CoffeeBox from './components/CoffeeBox/CoffeeBox';

// import RegisterPage from './components/RegisterPage/RegisterPage';

// import AllCoffees from './components/AllCoffees/AllCoffees';
// import ContactForm from './components/ContactForm/ContactForm';
// import CoffeeDetail from './components/CoffeeDetails/CoffeeDetails';
// import FavoritesPage from './components/Favorites/Favorites';
// import Cart from './components/CartPage/Cart';

// import CheckoutPage from './components/CheckoutPage/CheckoutPage';
// import CoffeeBlog from './components/CoffeeBlog/CoffeeBlog';
// import ReviewsPage from './components/ReviewsPage/ReviewsPage';

// import DashBoard from './pages/DashBoard';
// import NotFoundPage from './components/404Page/404';

const CoffeeQuiz = lazy(() => import('./components/Quiz/Quiz'));
const OurStory = lazy(() => import('./components/OurStory/OurStory'));
const OurOrigins = lazy(() => import('./components/OurOrigins/OurOrigins'));
const CoffeeBox = lazy(() => import('./components/CoffeeBox/CoffeeBox'));

const RegisterPage = lazy(() =>
  import('./components/RegisterPage/RegisterPage')
);
const AllCoffees = lazy(() => import('./components/AllCoffees/AllCoffees'));
const ContactForm = lazy(() => import('./components/ContactForm/ContactForm'));
const CoffeeDetail = lazy(() =>
  import('./components/CoffeeDetails/CoffeeDetails')
);
const FavoritesPage = lazy(() => import('./components/Favorites/Favorites'));
const Cart = lazy(() => import('./components/CartPage/Cart'));
const CheckoutPage = lazy(() =>
  import('./components/CheckoutPage/CheckoutPage')
);
const CoffeeBlog = lazy(() => import('./components/CoffeeBlog/CoffeeBlog'));
const ReviewsPage = lazy(() => import('./components/ReviewsPage/ReviewsPage'));
const DashBoard = lazy(() => import('./pages/DashBoard'));
const NotFoundPage = lazy(() => import('./components/404Page/404'));

const App = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Function to retrieve and set the cart count from localStorage
    const updateCartCount = () => {
      const storedCartCount = localStorage.getItem('cartCount');
      const count = storedCartCount ? parseInt(storedCartCount, 10) : 0;
      setCartCount(count);
    };

    // Initial update when the component mounts
    updateCartCount();

    // Event listener to update cart count whenever it's updated
    const handleCartUpdate = () => {
      updateCartCount(); // Update cart count when event fires
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<CoffeeQuiz />} />

          <Route path="/shop/all-coffees" element={<AllCoffees />} />
          <Route path="/our-origins" element={<OurOrigins />} />
          <Route path="/shop/:id" element={<CoffeeDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/check-out" element={<CheckoutPage />} />

          <Route path="/blog" element={<CoffeeBlog />} />
          <Route path="/reviews" element={<ReviewsPage />} />

          <Route path="/coffee-box" element={<CoffeeBox />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/about" element={<OurStory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
