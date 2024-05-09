import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { useCart } from "./CartContext";
import { formatCurrency } from "./utils";

const AddToCartModal = ({ product, show, onHide }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Update the default size as soon as the product data is available or changes
  useEffect(() => {
    if (product) {
      if (product.OneSize) {
        setSelectedSize("One Size");
      } else {
        const sizes = ["Xs", "Sm", "Md", "Lg", "Xl", "_2x", "_3x", "_4x", "_6x"];
        const availableSize = sizes.find(size => product[`${size}Inv`] > 0);
        if (availableSize) {
          setSelectedSize(availableSize.replace('_', '').toUpperCase());
        }
      }
    }
  }, [product]); // Dependency array to trigger re-evaluation when product changes

  const handleAddToCart = () => {
    const priceKey = selectedSize === "One Size" ? "_1SizePrice" : `${selectedSize.charAt(0).toUpperCase()}${selectedSize.slice(1).toLowerCase()}Price`;
    const price = product[priceKey];

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
      return <option value="One Size">One Size - {formatCurrency(product._1SizePrice)}</option>;
    } else {
      const sizes = ["Xs", "Sm", "Md", "Lg", "Xl", "_2x", "_3x", "_4x", "_6x"];
      return sizes.map(size => {
        const priceKey = `${size}Price`;
        const inventoryKey = `${size}Inv`;
        const price = product[priceKey];
        const inventory = product[inventoryKey];

        if (inventory > 0) {
          return (
            <option key={size} value={size.replace('_', '').toUpperCase()}>
              {size.replace('_', '').toUpperCase()} - {formatCurrency(price)} - {inventory} available
            </option>
          );
        }
        return null;
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="sm">
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
        <Button variant="outline-primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="outline-secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddToCartModal;