import { Link } from 'react-router-dom';
import styles from './404.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles['notfound-container']}>
      <h1 className={styles['notfound-heading']}>404</h1>
      <p className={styles['notfound-text']}>Oops! This page doesn’t exist.</p>
      <p className={styles['notfound-subtext']}>
        Maybe you need a sip of coffee first ☕
      </p>
      <Link to="/" className={styles['notfound-button']}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
