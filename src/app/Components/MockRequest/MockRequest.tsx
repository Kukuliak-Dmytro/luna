import React from 'react';
import styles from './MockRequest.module.css';

const MockRequest: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loading}>Loading...</p>
    </div>
  );
};

export default MockRequest;