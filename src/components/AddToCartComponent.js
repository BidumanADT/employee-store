import React, { useState } from 'react';
import { useCart } from './CartContext'; // Import the useCart hook

const AddToCartComponent = ({ product }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(product.sizes ? product.sizes[0] : 'One Size');

    const handleAddToCart = () => {
        addToCart({ name: product.name, quantity, size, price: product.price });
    };

    return (
        <div>
            {product.sizes && (
                <select value={size} onChange={e => setSize(e.target.value)}>
                    {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            )}
            <input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value)))} min={1} max={100} />
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default AddToCartComponent;