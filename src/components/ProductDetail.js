import React from "react";
import { Modal, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';

const ProductDetail = ({ product, show, onHide }) => {
  // Function to format and display sizes and prices
  const renderSizes = (product) => {
    if (!product) return null; // Ensure product data is available

    if (product.OneSize) {
      // Display for one-size products
      return (
        <ListGroup.Item>Price: ${product._1SizePrice}</ListGroup.Item>
      );
    } else {
      // Display for products with multiple sizes
      const sizes = ["Xs", "Sm", "Md", "Lg", "Xl", "_2x", "_3x", "_4x", "_6x"];
      return sizes.map(size => {
        const inventoryKey = `${size}Inv`;
        const priceKey = `${size}Price`;
        const inventoryCount = product[inventoryKey];
        const price = product[priceKey];

        if (inventoryCount && price) {
          // Convert size codes to readable format
          const sizeFormat = size.replace('_', '').toUpperCase();
          return (
            <ListGroup.Item key={size}>
              Size {sizeFormat}: {inventoryCount} available | ${price} each
            </ListGroup.Item>
          );
        }
        return null;
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {product?.NewName || product?.OriginalName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <img
                src={product?.Image?.publicURL || "./data/images/default.jpeg"}
                alt={product?.OriginalName || "Product Image"}
                style={{ maxWidth: "100%", maxHeight: "400px", width: "auto", height: "auto" }}
              />
            </Col>
            <Col xs={12} md={6}>
              <p>{product?.Description}</p>
              <ListGroup>
                {renderSizes(product)}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetail;