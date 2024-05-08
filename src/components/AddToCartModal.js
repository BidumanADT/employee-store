import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { useCart } from "./CartContext";
import { formatCurrency } from "./utils";

const AddToCartModal = ({ product, show, onHide }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.OneSize ? "OneSize" : "XS"); // Default to "XS" for multi-size products
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const priceKey = selectedSize === "OneSize" ? "_1SizePrice" : `${selectedSize.charAt(0).toUpperCase()}${selectedSize.slice(1).toLowerCase()}Price`;
    const price = product[priceKey];

    console.log(`Selected Size: ${selectedSize}, Price Key: ${priceKey}, Price: ${price}`); // Debugging output

    if (price && quantity > 0) {
      addToCart({
        name: product.NewName || product.OriginalName,
        price,
        size: selectedSize,
        quantity,
      });
      onHide(); // Close modal after adding to cart
    } else {
      console.error("Failed to add to cart: Price not found or quantity invalid.");
    }
  };

  const renderSizeOptions = () => {
    if (!product) return null;

    if (product.OneSize) {
      return <option value="OneSize">One Size - {formatCurrency(product._1SizePrice)}</option>;
    } else {
      const sizes = ["Xs", "Sm", "Md", "Lg", "Xl", "_2x", "_3x", "_4x", "_6x"];
      return sizes.map(size => {
        const sizeKey = size.replace('_', '').toLowerCase(); // Ensure correct format for key
        const priceKey = `${size}Price`;
        const inventoryKey = `${size}Inv`;
        const price = product[priceKey];
        const inventory = product[inventoryKey];

        return inventory > 0 ? (
          <option key={size} value={sizeKey.toUpperCase()}>
            {sizeKey.toUpperCase()} | {formatCurrency(price)} | {inventory} available
          </option>
        ) : null;
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add to Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Form.Group controlId="productSize">
              <Form.Label>Size</Form.Label>
              <Form.Control as="select" value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                {renderSizeOptions()}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="productQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" value={quantity} min="1" onChange={e => setQuantity(parseInt(e.target.value, 10))} />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddToCartModal;