import React from "react";
import { useCart } from "./CartContext"; // Importing useCart to manage cart operations
import { useAppContext } from "./AppContext"; // Importing useAppContext to manage application-level state
import { Button, Table, Form, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap"; // Importing components from react-bootstrap
import * as styles from "./CheckoutPage.module.css"; // Importing CSS module for styling

const CheckoutPage = () => {
  const { cart, updateCartItem, removeCartItem } = useCart(); // Destructuring methods from CartContext
  const { setIsCheckoutVisible } = useAppContext(); // Method to toggle checkout visibility

  // Increment the quantity of an item
  const incrementQuantity = item => {
    if (item.quantity < 999) {
      updateCartItem({ ...item, quantity: item.quantity + 1 });
    }
  };

  // Decrement the quantity of an item
  const decrementQuantity = item => {
    if (item.quantity > 1) {
      updateCartItem({ ...item, quantity: item.quantity - 1 });
    }
  };

  // Remove an item from the cart
  const handleRemoveItem = item => {
    removeCartItem(item.name, item.size);
  };

  // Toggle back to the product listing page
  const handleReturnToProducts = () => {
    setIsCheckoutVisible(false);
  };

  // Calculate the subtotal, tax, and grand total
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.10;
  const grandTotal = subtotal + tax;

  // Initialize employee data form state
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    employeeNumber: '',
    employeeEmail: ''
  });

  // Handle employee data form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className={styles.checkoutPage}>
      <h2>Checkout</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={styles.tableProductHeading}>Product</th>
            <th className={styles.tableSize}>Size</th>
            <th className={styles.tableQuantity}>Quantity</th>
            <th className={styles.tablePrice}>Each</th>
            <th className={styles.tableTotal}>Total</th>
            <th className={styles.tableRemove}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={`${item.name}-${item.size}`}>
              <td className={styles.tableProduct}>
                <img
                  className={styles.thumbImage}
                  src={item.image}
                  alt={item.OriginalName || "Product Image"}
                />
                {item.name}
              </td>
              <td className={styles.tableSize}>{item.size === "OneSize" ? "One Size" : item.size.replace("_", "").toUpperCase()}</td>
              <td className={styles.tableQuantity}>
                <Button variant="light" onClick={() => decrementQuantity(item)}>
                  -
                </Button>{" "}
                {item.quantity}{" "}
                <Button variant="light" onClick={() => incrementQuantity(item)}>
                  +
                </Button>
              </td>
              <td className={styles.tablePrice}>${item.price.toFixed(2)}</td>
              <td className={styles.tableTotal}>${(item.price * item.quantity).toFixed(2)}</td>
              <td className={styles.tableRemove}>
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveItem(item)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
          {/* Display the financial summary */}
          <tr>
            <td colSpan="4" className={styles.subtotalRight}>Sub-Total</td>
            <td colSpan="2">${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="4" className={styles.subtotalRight}>Tax (10%)</td>
            <td colSpan="2">${tax.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="4" className={styles.subtotalRight}>Grand Total</td>
            <td colSpan="2">${grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
      {/* Employee Information Form */}
      <div className={styles.employeeInfoForm}>
        <h4>Employee Information</h4>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>First Name</FormLabel>
                <FormControl type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Last Name</FormLabel>
                <FormControl type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Employee Number</FormLabel>
                <FormControl type="text" name="employeeNumber" value={formData.employeeNumber} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Employee Email</FormLabel>
                <FormControl type="email" name="employeeEmail" value={formData.employeeEmail} onChange={handleInputChange} />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles.checkoutActions}>
        <Button variant="outline-secondary" onClick={handleReturnToProducts}>
          Back to Products
        </Button>
        <Button variant="outline-success">Confirm Checkout</Button> {/* Placeholder for checkout functionality */}
      </div>
    </div>
  );
};

export default CheckoutPage;