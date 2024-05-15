import React, { useState, useEffect } from "react"
import { Modal, Button, Form, Container } from "react-bootstrap"
import { useCart } from "./CartContext"
import { formatCurrency } from "./utils"

const AddToCartModal = ({ product, show, onHide }) => {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  // Effect to set the default selected size based on availability
  useEffect(() => {
    if (product) {
      const sizes = ["Xs", "Sm", "Md", "Lg", "Xl", "_2x", "_3x", "_4x", "_6x"]
      const availableSize = sizes.find(size => product[`${size}Inv`] > 0)
      if (availableSize) {
        setSelectedSize(availableSize) // Keep the original key format for operations
      } else if (product.OneSize) {
        setSelectedSize("OneSize") // Use "OneSize" for one-size products
      }
    }
  }, [product])

  const handleAddToCart = () => {
    const priceKey =
      selectedSize === "OneSize" ? "_1SizePrice" : `${selectedSize}Price`
    const price = product[priceKey]
    const imageUrl = product.Image?.publicURL

    console.log(
      `Selected Size: ${selectedSize}, Price Key: ${priceKey}, Price: ${price}`
    ) // Debugging

    if (price && quantity > 0) {
      addToCart({
        name: product.NewName || product.OriginalName,
        price,
        size: selectedSize, // Send the size key directly as stored in product data
        quantity,
        image: imageUrl
      })
      onHide() // Close modal after adding to cart
    } else {
      console.error(
        "Failed to add to cart: Price not found or quantity invalid."
      )
    }
  }

  // Render dropdown options with user-friendly format but use accurate data keys
  const renderSizeOptions = () => {
    if (!product) return null

    const sizes = ["Xs", "Sm", "Md", "Lg", "Xl", "_2x", "_3x", "_4x", "_6x"]
    return product.OneSize ? (
      <option value="OneSize">
        One Size - {formatCurrency(product._1SizePrice)}
      </option>
    ) : (
      sizes.map(size => {
        const priceKey = `${size}Price`
        const inventoryKey = `${size}Inv`
        const price = product[priceKey]
        const inventory = product[inventoryKey]
        if (inventory > 0) {
          const displaySize = size.replace("_", "").toUpperCase() // Format for display
          return (
            <option key={size} value={size}>{`${displaySize} - ${formatCurrency(
              price
            )} - ${inventory} available`}</option>
          )
        }
        return null
      })
    )
  }

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
              <Form.Control
                as="select"
                value={selectedSize}
                onChange={e => setSelectedSize(e.target.value)}
              >
                {renderSizeOptions()}
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
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddToCartModal
