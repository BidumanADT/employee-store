import React from 'react';
// If using CSS modules, import your CSS file here
import * as styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} Your Company Name. All rights reserved.
    </footer>
  );
};

export default Footer;