const CART_KEY = 'shoppingCart';

// Retrieves the cart from local storage and parses it from JSON. If no cart is found, returns an empty array.
export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

// Adds an item to the cart. If the item already exists (matched by name and size), it increments the quantity.
export const addToCart = (item) => {
  const cart = getCart();
  const index = cart.findIndex(i => i.name === item.name && i.size === item.size);
  if (index !== -1) {
    // If the item exists, increase the quantity
    cart[index].quantity += item.quantity;
  } else {
    // If the item doesn't exist, add it to the cart
    cart.push(item);
  }
  // Save the updated cart back to local storage
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Updates the quantity of an existing cart item.
export const updateCartItem = (item) => {
  const cart = getCart();
  const index = cart.findIndex(i => i.name === item.name && i.size === item.size);
  if (index !== -1) {
    // Update the item's quantity if it is found
    cart[index].quantity = item.quantity;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

// Removes an item from the cart based on name and size.
export const removeCartItem = (name, size) => {
  let cart = getCart();
  cart = cart.filter(i => !(i.name === name && i.size === size));
  // Save the updated cart back to local storage
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Clears the entire cart by removing the cart item from local storage.
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};