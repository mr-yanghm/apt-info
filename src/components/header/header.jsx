import React, { memo } from 'react';
import styles from './header.module.css';

const Header = memo(({ onLogout }) => (
  <header className={styles.header}>
    {onLogout && (
      <button className={styles.logout} onClick={onLogout}>
        Logout
      </button>
    )}
    {/* <img className={styles.logo} src="/images/logo.png" alt="logo" /> */}
    <h1 className={styles.title}>실거래가 확인</h1>
    <h3 className={styles.title}>주변시세</h3>

  </header>
));

export default Header;
