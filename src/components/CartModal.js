import React, { useState } from "react"
import { Modal, Button, ListGroup, Form } from "react-bootstrap"
import { useCart } from "./CartContext"

const CartModal = ({ show, onHide }) => {
  const { cart, clearCart, removeCartItem, updateCartItem } = useCart() // Use the hook to access cart
  const [editQuantities, setEditQuantities] = useState({}) // State to manage input modes for quantities
  const [inputValues, setInputValues] = useState({}) // State to manage keyboard input

  // Calculate the subtotal of the cart
  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => {
        return total + item.quantity * item.price
      }, 0)
      .toFixed(2) // Round to two decimal places for currency formatting
  }

  // Function to clear the cart entirely
  const handleClearCart = () => {
    clearCart() // Call the clearCart function to empty the cart
    //onHide(); // Optionally close the modal after clearing the cart
  }

  // Function to handle the removal of a single item
  const handleRemoveItem = (name, size) => {
    removeCartItem(name, size) // Remove the item from the cart
  }

  // Function to handle the submission of a new quantity from the input
  const handleQuantitySubmit = (name, size) => {
    const key = `${name}-${size}`
    const newQuantity = parseInt(inputValues[key], 10)
    if (newQuantity >= 1 && newQuantity <= 999) {
      // Validate quantity range
      updateCartItem({ name, size, quantity: newQuantity })
    }
  }

  // Handle quantity changes for the dropdown and input
  const handleQuantityChange = (name, size, quantity) => {
    const key = `${name}-${size}`
    if (quantity === "10+") {
      // Switch to text input mode
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
            style={{
              width: "auto",
              display: "inline-block",
              marginRight: "10px",
            }}
          />
          <Button
            size="sm"
            onClick={() => handleQuantitySubmit(item.name, item.size)}
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
        style={{ width: "auto" }}
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

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {cart.map(
            (
              item // Use 'cart' directly as defined in the context provider
            ) => (
              <ListGroup.Item key={`${item.name}-${item.size}`}>
                {item.name} - {item.size} - Qty: {renderQuantityField(item)} - $
                {item.price.toFixed(2)}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemoveItem(item.name, item.size)}
                  style={{ float: "right", marginLeft: "10px" }}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            )
          )}
          {cart.length > 0 && ( // Only show subtotal if there are items in the cart
            <ListGroup.Item>
              <strong>Subtotal:</strong> ${calculateSubtotal()}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClearCart}>
          Clear Cart
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CartModal
