import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useCart } from './CartContext';

const CartModal = ({ show, onHide }) => {
    const { cart } = useCart(); // Use the hook to access cart

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
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CartModal;