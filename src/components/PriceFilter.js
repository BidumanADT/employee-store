import React from 'react';
import * as styles from './PriceFilter.module.css';

const PriceFilter = ({ handlePriceChange, selectedPrice }) => {
  const priceRanges = ["Under $15.00", "$25.00 or less", "$50.00 or less"];

  return (
    <div className={styles.priceFilter}>
      <h5 className={styles.filterHeader}>Price</h5>
      {priceRanges.map((price, index) => (
        <div key={index} className={styles.filterOption}>
          <input
            type="checkbox"
            id={`price-${index}`}
            name="price"
            value={price}
            className={styles.filterCheckbox}
            onChange={handlePriceChange}
            checked={selectedPrice.includes(price)}
          />
          <label htmlFor={`price-${index}`} className={styles.filterLabel}>
            {price}
          </label>
        </div>
      ))}
    </div>
  );
};

export default PriceFilter;