import React from 'react';
import { useCart } from './CartContext';

const CheckoutModal = () => {
    const { cart, updateCartItem, removeCartItem, clearCart } = useCart();

    return (
        <div>
            <h2>Checkout</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={`${item.name}-${item.size}`}>
                            <td>{item.name}</td>
                            <td>{item.size}</td>
                            <td>
                                <input type="number" value={item.quantity} onChange={e => updateCartItem({ ...item, quantity: Math.max(1, parseInt(e.target.value)) })} min={1} max={100} />
                            </td>
                            <td>{item.price.toFixed(2)}</td>
                            <td>{(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <button onClick={() => removeCartItem(item.name, item.size)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={clearCart}>Clear Cart</button>
            <button>Checkout</button> {/* Placeholder for checkout functionality */}
        </div>
    );
};

export default CheckoutModal;