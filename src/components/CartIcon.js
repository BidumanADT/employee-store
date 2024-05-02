import React, { useState } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import CartModal from './CartModal';
import * as styles from  './CartIcon.module.css';
import { useCart } from './CartContext';

const CartIcon = () => {
    const [showModal, setShowModal] = useState(false);
    const { cart } = useCart(); // Access cart from the context

    // Function to show/hide modal
    const toggleModal = () => setShowModal(!showModal);

    // Function to calculate total number of items in the cart
    const getItemCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <>
            <Button className={styles.cartIcon} onClick={toggleModal}>
                <FaShoppingCart size={24} />
                {/* Display item count badge if there are items in the cart */}
                {cart.length > 0 && (
                    <Badge className={styles.badge}>{getItemCount()}</Badge>
                )}
            </Button>
            <CartModal show={showModal} onHide={toggleModal} />
        </>
    );
};

export default CartIcon;