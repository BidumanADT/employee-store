import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import CartModal from './CartModal';
import * as styles from  './CartIcon.module.css';

const CartIcon = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    return (
        <>
            <Button className={styles.cartIcon} onClick={toggleModal}>
                <FaShoppingCart size={24} />
            </Button>
            <CartModal show={showModal} onHide={toggleModal} />
        </>
    );
};

export default CartIcon;