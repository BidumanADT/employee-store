import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useCart } from './CartContext';

const CartModal = ({ show, onHide }) => {
    const { cart, clearCart, removeCartItem } = useCart(); // Use the hook to access cart

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

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {cart.map(item => ( // Use 'cart' directly as defined in the context provider
                        <ListGroup.Item key={`${item.name}-${item.size}`}>
                            {item.name} - {item.size} - Qty: {item.quantity} - ${item.price.toFixed(2)}
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