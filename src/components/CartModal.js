import React, { useState } from 'react';
import { Modal, Button, ListGroup, Form } from 'react-bootstrap';
import { useCart } from './CartContext';

const CartModal = ({ show, onHide }) => {
    const { cart, clearCart, removeCartItem, updateCartItem } = useCart(); // Use the hook to access cart
    const [editQuantities, setEditQuantities] = useState({});  // State to manage input modes for quantities

    // Calculate the subtotal of the cart
    const calculateSubtotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0).toFixed(2); // Round to two decimal places for currency formatting
    };

    // Function to clear the cart entirely
    const handleClearCart = () => {
        clearCart(); // Call the clearCart function to empty the cart
        //onHide(); // Optionally close the modal after clearing the cart
    };

    // Function to handle the removal of a single item
    const handleRemoveItem = (name, size) => {
        removeCartItem(name, size); // Remove the item from the cart
    };

    // Handle quantity changes, including switching between dropdown and text input
    const handleQuantityChange = (name, size, quantity) => {
        const key = `${name}-${size}`;
        if (quantity === "10+") {
            // Switch to text input mode with empty field ready for input
            setEditQuantities({ ...editQuantities, [key]: "" });
        } else if (editQuantities[key] !== undefined) {
            // Update the cart quantity when in text input mode
            updateCartItem({ name, size, quantity: parseInt(quantity, 10) });
            // If selecting a normal number from dropdown, revert to normal mode if not "10+"
            setEditQuantities({ ...editQuantities, [key]: undefined });
        } else {
            // Regular dropdown change
            updateCartItem({ name, size, quantity: parseInt(quantity, 10) });
        }
    };

    // Render the quantity field depending on the state (dropdown or text input)
    const renderQuantityField = (item) => {
        const key = `${item.name}-${item.size}`;
        const isTextInput = editQuantities[key] !== undefined;

        if (isTextInput) {
            return (
                <Form.Control
                    type="number"
                    value={editQuantities[key]}
                    onChange={(e) => handleQuantityChange(item.name, item.size, e.target.value)}
                    onBlur={() => { if (editQuantities[key] === "") setEditQuantities({ ...editQuantities, [key]: undefined }); }}
                    min={1} max={999} // Set max according to inventory if needed
                />
            );
        }

        return (
            <Form.Control
                as="select"
                value={item.quantity.toString()}
                onChange={(e) => handleQuantityChange(item.name, item.size, e.target.value)}
                style={{ width: 'auto' }}>
                {[...Array(9).keys()].map(n => <option key={n} value={n + 1}>{n + 1}</option>)}
                <option value="10+">10+</option>
            </Form.Control>
        );
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {cart.map(item => ( // Use 'cart' directly as defined in the context provider
                        <ListGroup.Item key={`${item.name}-${item.size}`}>
                            {item.name} - {item.size} - Qty: {renderQuantityField(item)} - ${item.price.toFixed(2)}
                            <Button variant="outline-danger" size="sm" onClick={() => handleRemoveItem(item.name, item.size)} style={{ float: 'right', marginLeft: '10px' }}>
                                Remove
                            </Button>
                        </ListGroup.Item>
                    ))}
                    {cart.length > 0 && ( // Only show subtotal if there are items in the cart
                        <ListGroup.Item>
                            <strong>Subtotal:</strong> ${calculateSubtotal()}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClearCart}>Clear Cart</Button>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CartModal;