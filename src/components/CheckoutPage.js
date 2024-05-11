import React from 'react'
import { useCart } from './CartContext'
import { Button, Table } from 'react-bootstrap'
import * as styles from './CheckoutPage.module.css'

const CheckoutPage = ({ onReturnToCart }) => {
    const {cart, updateCartItem, removeCartItem } = useCart()

    // Functions to alter quantities
    const incrementQuantity = (item) => {
        if (item.quantity < 999) {
            updateCartItem({ ...item, quantity: item.quantity + 1})
        }
    }
    const decrementQuantity = (item) => {
        if (item.quantity > 1) {
            updateCartItem({ ...item, quantity: item.quantity - 1})
        }
    }

    // Function to remove item
    const handleRemoveItem = (item) => {
        removeCartItem(item.name, item.size)
    }

    return (
        <div className={styles.checkoutPage}>
            <h2>Checkout</h2>
            <Table striped bordered hover>
                <thread>
                    <tr>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thread>
                <tbody>
                    {cart.map(item => (
                        <tr key={`${item.name}-${item.size}`}>
                            <td>{item.name}</td>
                            <td>{item.size.replace('_', '').toUppercase()}</td>
                            <td>
                                <Button variant='light' onClick={()=> decrementQuantity(item)}>-</Button>
                                {' '}{item.quantity}{' '}
                                <Button variant='light' onClick={()=> incrementQuantity(item)}>+</Button>
                            </td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <Button variant='outline-danger' onClick={()=> handleRemoveItem(item)}>Remove</Button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </Table>
            <div className={styles.checkoutActions}>
                <Button variant='outline-secondary' onClick={onReturnToCart}>Return to Cart</Button>
                <Button variant='outline-success'>Confirm Checkout</Button> {/* Placeholder for checkout functionality */}
            </div>
        </div>
    )
}