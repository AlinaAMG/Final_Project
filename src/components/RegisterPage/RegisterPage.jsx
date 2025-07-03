import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogIn from '../../components/LogIn/LogIn';
import SignUp from '../../components/SignUp/SignUp';

function RegisterPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // true = show login

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const handleLogin = useCallback(
    async (user) => {
      try {
        const response = await axios.post(
          'https://coffeeapp-firstsip.onrender.com/api/auth/signin',
          user
        );
        console.log('login payload', user);
        const { token, user: loggedInUser } = response.data;
        console.log(response.data.user);
        localStorage.setItem('username', loggedInUser.name);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(loggedInUser));

        if (loggedInUser.role === 'ADMIN') {
          console.log(loggedInUser);
          localStorage.setItem('admin', JSON.stringify(loggedInUser));
          navigate('/dashboard');
        } else navigate('/');
      } catch (error) {
        alert(
          'Login failed: ' + (error.response?.data?.message || error.message)
        );
      }
    },
    [navigate]
  );

  const handleSignUp = useCallback(async (user) => {
    try {
      await axios.post(
        'https://coffeeapp-firstsip.onrender.com/api/auth/signup',
        user
      );
      alert('Registration successful! Please log in.');
      setIsLogin(true);
    } catch (error) {
      alert(
        'Registration failed: ' +
          (error.response?.data?.message || error.message)
      );
    }
  }, []);

  return (
    <div className="register-wrap">
      {isLogin ? (
        <LogIn onLogin={handleLogin} />
      ) : (
        <SignUp onSignUp={handleSignUp} />
      )}

      <div className="toggle-link">
        {isLogin ? (
          <p className="toggle-text">
            Don’t have an account?{' '}
            <button onClick={toggleForm} className="toggle-button">
              Sign Up
            </button>
          </p>
        ) : (
          <p className="toggle-text">
            Already have an account?{' '}
            <button onClick={toggleForm} className="toggle-button">
              Log In
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
export default RegisterPage;
