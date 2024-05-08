import React, { useState } from "react"
import { Modal, Button, Form, Container } from "react-bootstrap"
import { useCart } from "./CartContext"
import { formatCurrency } from "./utils"

const AddToCartModal = ({ product, show, onHide }) => {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(
    product?.OneSize ? "One Size" : ""
  )
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (quantity > 0 && selectedSize) {
      const priceKey =
        selectedSize === "OneSize" ? "_1SizePrice" : `${selectedSize}Price`
      const price = product[priceKey]
      if (price) {
        addToCart({
          name: product.NewName || product.OriginalName,
          price,
          size: selectedSize.replace("Size", ""), // Ensure the size is correctly formatted without 'Size' suffix
          quantity,
        })
        onHide() // Close modal after adding to cart
      }
    }
  }

  const renderSizeOptions = product => {
    if (!product) return null // Ensure product data is available

    if (product.OneSize) {
      return (
        <option value="One Size">
          One Size - {formatCurrency(product._1SizePrice)}
        </option>
      )
    } else {
      const sizes = ["Xs", "Sm", "Md", "Lg", "Xl", "_2x", "_3x", "_4x", "_6x"]
      return sizes.map(size => {
        const inventoryKey = `${size}Inv`
        const priceKey = `${size}Price`
        const price = product[priceKey]
        const inventoryCount = product[inventoryKey]

        if (inventoryCount > 0) {
          const sizeFormat = size.replace("_", "").toUpperCase()
          return (
            <option key={size} value={sizeFormat}>
              {sizeFormat} - {formatCurrency(price)} - {inventoryCount}{" "}
              available
            </option>
          )
        }
        return null
      })
    }
  }

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
              <Form.Control
                as="select"
                value={selectedSize}
                onChange={e => setSelectedSize(e.target.value)}
              >
                {renderSizeOptions(product)}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="productQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                min="1"
                onChange={e => setQuantity(parseInt(e.target.value, 10))}
              />
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
  )
}

export default AddToCartModal
