import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShippingFast, FaLeaf, FaAward } from 'react-icons/fa';
import styles from './ChooseUs.module.css';

const WhyChooseUs = () => {
  return (
    <section className={`${styles['why-choose-us']} ${styles.py5}`}>
      <div className={styles.container}>
        <h3 className={styles['mb-4']}>Why People Choose Us</h3>
        <div className={styles.row}>
          <div
            className={`${styles.col} ${styles['col-md-4']} ${styles['mb-4']}`}
          >
            <FaShippingFast size={40} className={styles.icon} />
            <h5>Free Delivery</h5>
            <p>We offer fast & free delivery from €39.99 across the country.</p>
          </div>
          <div
            className={`${styles.col} ${styles['col-md-4']} ${styles['mb-4']}`}
          >
            <FaLeaf size={40} className={styles.icon} />
            <h5>Organic & Sustainable</h5>
            <p>Enjoy our organic coffee beans grown with respect for nature.</p>
          </div>
          <div
            className={`${styles.col} ${styles['col-md-4']} ${styles['mb-4']}`}
          >
            <FaAward size={40} className={styles.icon} />
            <h5>Top Quality</h5>
            <p>
              Premium beans selected by world-class experts for every roast.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
