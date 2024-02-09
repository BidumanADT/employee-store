import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ProductDetail = ({ product, show, onHide }) => {
  if (!product) return null; // Return null if no product is provided

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
          {product.NewName || product.OriginalName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={product.Image?.publicURL || "./data/images/default.jpeg"} alt={product.OriginalName} style={{ width: '100%', marginBottom: '20px' }} />
        <p>{product.Description}</p>
        {/* Add more product details here */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetail;