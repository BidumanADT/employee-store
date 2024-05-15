import React from "react"
import { useCart } from "./CartContext"
import { useAppContext } from "./AppContext"
import { Button, Table } from "react-bootstrap"
import * as styles from "./CheckoutPage.module.css"

const CheckoutPage = () => {
  const { cart, updateCartItem, removeCartItem } = useCart()
  const { setIsCheckoutVisible } = useAppContext()

  // Functions to alter quantities
  const incrementQuantity = item => {
    if (item.quantity < 999) {
      updateCartItem({ ...item, quantity: item.quantity + 1 })
    }
  }
  const decrementQuantity = item => {
    if (item.quantity > 1) {
      updateCartItem({ ...item, quantity: item.quantity - 1 })
    }
  }

  // Function to remove item
  const handleRemoveItem = item => {
    removeCartItem(item.name, item.size)
  }

  // Function to handle navigating back to products page
  const handleReturnToProducts = () => {
    setIsCheckoutVisible(false)
  }

  return (
    <div className={styles.checkoutPage}>
      <h2>Checkout</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={styles.tableProduct}>Product</th>
            <th className={styles.tableSize}>Size</th>
            <th className={styles.tableQuantity}>Quantity</th>
            <th className={styles.tablePrice}>Price</th>
            <th className={styles.tableTotal}>Total</th>
            <th className={styles.tableRemove}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={`${item.name}-${item.size}`}>
              <td className={styles.tableHeader}>
                <img
                  className={styles.thumbImage}
                  src={item.image}
                  alt={item.OriginalName || "Product Image"}
                />
                {item.name}
              </td>
              <td className={styles.tableSize}>{item.size.replace("_", "").toUpperCase()}</td>
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
        </tbody>
      </Table>
      <div className={styles.checkoutActions}>
        <Button variant="outline-secondary" onClick={handleReturnToProducts}>
          Back to Products
        </Button>
        <Button variant="outline-success">Confirm Checkout</Button>{" "}
        {/* Placeholder for checkout functionality */}
      </div>
    </div>
  )
}
export default CheckoutPage
