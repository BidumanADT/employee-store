const CART_KEY = 'shoppingCart';

// Retrieves the cart from localStorage, or initializes it as an empty array if not present
export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Adds a new item to the cart or updates the quantity if the item already exists
export const addToCart = (item) => {
  const cart = getCart();
  const index = cart.findIndex(i => i.name === item.name && i.size === item.size);
  if (index !== -1) {
    // If the item exists, update its quantity
    cart[index].quantity += item.quantity;
  } else {
    // If the item does not exist, add it to the cart
    cart.push(item);
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Updates the quantity of an existing item in the cart
export const updateCartItem = (item) => {
  const cart = getCart();
  const index = cart.findIndex(i => i.name === item.name && i.size === item.size);
  if (index !== -1) {
    // Set the item's quantity to the new value
    cart[index].quantity = item.quantity;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

// Removes a specific item from the cart
export const removeCartItem = (name, size) => {
  let cart = getCart();
  cart = cart.filter(i => !(i.name === name && i.size === size));
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Clears all items from the cart
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};