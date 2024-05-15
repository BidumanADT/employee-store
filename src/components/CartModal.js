import React, { useState } from "react"
import { Modal, Button, Table, Form } from "react-bootstrap"
import { useCart } from "./CartContext"
import * as styles from "./CartModal.module.css"
import CheckoutPage from "./CheckoutPage"

const CartModal = ({ show, onHide }) => {
  const { cart, clearCart, removeCartItem, updateCartItem } = useCart()
  const [editQuantities, setEditQuantities] = useState({})
  const [inputValues, setInputValues] = useState({})
  const [showCheckout, setShowCheckout] = useState(false)

  // Calculate the subtotal of the cart
  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2)
  }

  // Function to clear the cart entirely
  const handleClearCart = () => {
    clearCart()
  }

  // Function to handle the removal of a single item
  const handleRemoveItem = (name, size) => {
    removeCartItem(name, size)
  }

  // Function to handle the submission of a new quantity from the input
  const handleQuantitySubmit = (name, size) => {
    const key = `${name}-${size}`
    const newQuantity = parseInt(inputValues[key], 10)
    if (newQuantity === 0) {
      handleRemoveItem(name, size)
    } else if (newQuantity >= 1 && newQuantity <= 999) {
      updateCartItem({ name, size, quantity: newQuantity })
    }
  }

  // Handle quantity changes for the dropdown and input
  const handleQuantityChange = (name, size, quantity) => {
    const key = `${name}-${size}`
    if (quantity === "10+") {
      setInputValues({ ...inputValues, [key]: "" })
      setEditQuantities({ ...editQuantities, [key]: true })
    } else {
      updateCartItem({ name, size, quantity: parseInt(quantity, 10) })
    }
  }

  // Handle text input changes
  const handleInputChange = (name, size, value) => {
    const key = `${name}-${size}`
    setInputValues({ ...inputValues, [key]: value })
  }

  // Function to make sizes more readable
  const renderSizeDisplay = size => {
    return size.replace("_", "").toUpperCase() // Format size for display
  }

  // Render the quantity field
  const renderQuantityField = item => {
    const key = `${item.name}-${item.size}`
    const isTextInput = editQuantities[key]

    if (isTextInput) {
      return (
        <>
          <Form.Control
            type="text"
            value={inputValues[key]}
            onChange={e =>
              handleInputChange(item.name, item.size, e.target.value)
            }
            className={styles.textInput}
          />
          <Button
            size="sm"
            onClick={() => handleQuantitySubmit(item.name, item.size)}
            className={styles.updateButton}
          >
            Update
          </Button>
        </>
      )
    }

    return (
      <Form.Control
        as="select"
        value={item.quantity.toString()}
        onChange={e =>
          handleQuantityChange(item.name, item.size, e.target.value)
        }
        className={styles.selectInput}
      >
        {[...Array(9).keys()].map(n => (
          <option key={n} value={n + 1}>
            {n + 1}
          </option>
        ))}
        <option value="10+">10+</option>
      </Form.Control>
    )
  }

  // Function to handle sending cart to checkout page.
  const handleCheckout = () => {
    setShowCheckout(true) 
    onHide()
  }

  if (showCheckout) {
    return <CheckoutPage onReturnToCart={() => setShowCheckout(false)} />
  }

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th class={styles.centerText}>Product</th>
                <th class={styles.centerText}>Size</th>
                <th class={styles.centerText}>Quantity</th>
                <th class={styles.centerText}>Price</th>
                <th class={styles.centerText}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={`${item.name}-${item.size}`}>
                  <td>{item.name}</td>
                  <td>{renderSizeDisplay(item.size)}</td>
                  <td>{renderQuantityField(item)}</td>
                  <td>${item.price ? item.price.toFixed(2) : "N/A"}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item.name, item.size)}
                      className={styles.removeButton}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              {cart.length > 0 && (
                <tr>
                  <td colSpan="3" className={styles.subtotalRight}>
                    Subtotal
                  </td>
                  <td colSpan="2">${calculateSubtotal()}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleCheckout}>
            Checkout
          </Button>
          <Button variant="outline-danger" onClick={handleClearCart}>
            Clear Cart
          </Button>
          <Button variant="outline-secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CartModal
