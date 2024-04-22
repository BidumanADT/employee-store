import React from 'react';
import * as styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} Your Company Name. All rights reserved.
    </footer>
  );
};

export default Footer;