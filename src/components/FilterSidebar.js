import React, {useState} from 'react';
import * as styles from './FilterSidebar.module.css';

// The FilterSidebar component is responsible for rendering filter options and handling user interactions.
const FilterSidebar = ({
  categories, // The list of all categories available for filtering
  categoryCounts, // Object containing counts of items per category
  sizes, // The list of all sizes available for filtering
  selectedCategories, // Currently selected categories by the user
  selectedSizes, // Currently selected sizes by the user
  selectedPrice, // Currently selected price range by the user
  handleCategoryChange, // Function to update the state when a category is selected or deselected
  handleSizeChange, // Function to update the state when a size is selected or deselected
  handlePriceChange, // Function to update the state when a price range is selceted or deselected
  applyFilters, // Function to apply the selected filters to the product listing
  clearFilters // Function to clear all selected filters
}) => {

  const [showCategories, setShowCategories] = useState(false);
  const [showPrices, setShowPrices] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  // Price filter options
  const priceFilters = ["Under $15.00", "$25.00 or less", "$50.00 or less"]

  return (
    <div className={styles.filterSidebar}>
      <p>Filter by:</p>
      {/* Categories section */}
      <h5 className={styles.filterHeader} onClick={() => setShowCategories(!showCategories)}>
        Category {showCategories ? '▲' : '▼'}
      </h5>
      {showCategories && categories.map(category => (
        <div key={category} className={styles.filterOption}>
          <input
            type="checkbox"
            id={`category-${category}`}
            name={`category-${category}`}
            value={category}
            className={styles.filterCheckbox}
            onChange={(e) => handleCategoryChange(category, e.target.checked)}
            checked={selectedCategories.includes(category)}
          />
          <label htmlFor={`category-${category}`} className={styles.filterLabel}>
            {category} ({categoryCounts[category] || 0})
          </label>
        </div>
      ))}

      {/* Price section */}
      <h5 className={styles.filterHeader} onClick={() => setShowPrices(!showPrices)}>
        Price {showPrices ? '▲' : '▼'}
      </h5>
      {showPrices && priceFilters.map((priceFilter, index) => (
        <div key={index} className={styles.filterOption}>
          <input
            type="radio"
            id={`price-${index}`}
            name="price"
            value={priceFilter}
            className={styles.filterCheckbox}
            onChange={handlePriceChange}
            checked={selectedPrice.includes(priceFilter)}
          />
          <label htmlFor={`price-${index}`} className={styles.filterLabel}>{priceFilter}</label>
        </div>
      ))}

      {/* Sizes section */}
      <h5 className={styles.filterHeader} onClick={() => setShowSizes(!showSizes)}>
        Sizes {showSizes ? '▲' : '▼'}
      </h5>
      {showSizes && sizes.map(size => (
        <div key={size} className={styles.filterOption}>
          <input
            type="checkbox"
            id={`size-${size}`}
            name={`size-${size}`}
            value={size}
            className={styles.filterCheckbox}
            onChange={(e) => handleSizeChange(size, e.target.checked)}
            checked={selectedSizes.includes(size)}
          />
          <label htmlFor={`size-${size}`} className={styles.filterLabel}>
            {size}
          </label>
        </div>
      ))}

      {/* Button Container */}
      <div className={styles.buttonsContainer}>
        <button className={styles.applyButton} onClick={applyFilters}>
          Apply Filters
        </button>
        <button className={styles.clearButton} onClick={clearFilters}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;