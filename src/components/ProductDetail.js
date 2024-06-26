import React, { useState } from "react"
import { Modal, Button, Table, Container, Row, Col } from "react-bootstrap"
import { formatCurrency } from "./utils"
import AddToCartModal from "./AddToCartModal"

const ProductDetail = ({ product, show, onHide }) => {
  const [showAddToCart, setShowAddToCart] = useState(false)

  const renderSizes = product => {
    if (!product) return null // Ensure product data is available

    if (product.OneSize) {
      // Display for one-size products
      return (
        <tr>
          <td>One Size</td>
          <td>{formatCurrency(product._1SizePrice)}</td>
          <td>{product._1SizeInv} available</td>
        </tr>
      )
    } else {
      // Display for products with multiple sizes
      const sizes = ["Xs", "Sm", "Md", "Lg", "Xl", "_2x", "_3x", "_4x", "_6x"]
      return sizes.map(size => {
        const inventoryKey = `${size}Inv`
        const priceKey = `${size}Price`
        const price = product[priceKey]
        const inventoryCount = product[inventoryKey]

        if (inventoryCount && price) {
          const sizeFormat = size.replace("_", "").toUpperCase()
          return (
            <tr key={size}>
              <td>{sizeFormat}</td>
              <td>{formatCurrency(price)} each</td>
              <td>{inventoryCount} available</td>
            </tr>
          )
        }
        return null
      })
    }
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide()
        setShowAddToCart(false)
      }}
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
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  width: "auto",
                  height: "auto",
                }}
              />
            </Col>
            <Col xs={12} md={6}>
              <p>{product?.Description}</p>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>{renderSizes(product)}</tbody>
              </Table>
              <Button variant="outline-primary" onClick={() => setShowAddToCart(true)}>
                Add to Cart
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
      <AddToCartModal
        product={product}
        show={showAddToCart}
        onHide={() => setShowAddToCart(false)}
      />
    </Modal>
  )
}

export default ProductDetail
