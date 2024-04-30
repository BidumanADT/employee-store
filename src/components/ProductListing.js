import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import FilterSidebar from "./FilterSidebar"
import Card from "react-bootstrap/Card"
import { Container, Row, Col, Button } from "react-bootstrap"
import ListGroup from "react-bootstrap/ListGroup"
import * as styles from "./ProductListing.module.css"
import ProductDetail from "./ProductDetail"
import Footer from "./Footer"
import { formatCurrency } from "./utils"
import { useCart } from "./CartContext"; 


// conditional rendering for a listing of all products
const ProductListing = () => {
  const [showDetail, setShowDetail] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categoryCounts, setCategoryCounts] = useState({})
  const [sizes, setSizes] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedPrice, setSelectedPrice] = useState([])

  const { addToCart } = useCart();

  // pull all data from GraphQL backend
  const data = useStaticQuery(graphql`
    query ProductListingQuery {
      allInventoryJson {
        edges {
          node {
            id
            OriginalName
            NewName
            Description
            Category
            Image {
              publicURL
            }
            Active
            OneSize
            _1SizeInv
            XsInv
            SmInv
            MdInv
            LgInv
            XlInv
            _2xInv
            _3xInv
            _4xInv
            _6xInv
            Total
            _1SizePrice
            XsPrice
            SmPrice
            MdPrice
            LgPrice
            XlPrice
            _2xPrice
            _3xPrice
            _4xPrice
            _6xPrice
          }
        }
      }
    }
  `)

  const sizeOrder = [
    "One Size",
    "XS",
    "SM",
    "MD",
    "LG",
    "XL",
    "2X",
    "3X",
    "4X",
    "6X",
  ]

  // useEffect to filter product listing by category
  useEffect(() => {
    const fetchedCategories = new Set()
    const fetchedSizes = new Set(["One Size"])
    const categoryCounts = {}

    data.allInventoryJson.edges.forEach(({ node }) => {
      fetchedCategories.add(node.Category)

      if (node.OneSize) {
        fetchedSizes.add("One Size")
      } else {
        // Iterate over size keys
        const sizeKeys = [
          "One Size",
          "XsInv",
          "SmInv",
          "MdInv",
          "LgInv",
          "XlInv",
          "_2xInv",
          "_3xInv",
          "_4xInv",
          "_6xInv",
        ]
        sizeKeys.forEach(sizeKey => {
          if (node[sizeKey] > 0) {
            const displaySize = sizeKey
              .replace("Inv", "")
              .replace("_", "")
              .toUpperCase() // Ensure correct format
            fetchedSizes.add(displaySize)
          }
        })
      }

      // Init or increment count for this category
      categoryCounts[node.Category] = (categoryCounts[node.Category] || 0) + 1
    })

    setCategories([...fetchedCategories])
    setSizes(sizeOrder.filter(s => fetchedSizes.has(s))) // Ensure sizes are set in the correct order
    setFilteredProducts(data.allInventoryJson.edges)
    setCategoryCounts(categoryCounts)
  }, [])

  // Function to track which categories are selected in the filter products sidebar
  const handleCategoryChange = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category))
    }
  }

  // Function to track which sizes are selected in the filter products sidebar
  const handleSizeChange = (size, isChecked) => {
    if (isChecked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size))
    }
  }

  // Function to apply filters to product listing
  const applyFilters = () => {
    let filtered = data.allInventoryJson.edges

    // Filter by selected categories if any
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(({ node }) =>
        selectedCategories.includes(node.Category)
      )
    }

    // Further filter by selected sizes if any
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(({ node }) => {
        if (selectedSizes.includes("One Size") && node.OneSize) {
          return true // Show products marked as "One Size"
        }

        const sizeKeys = selectedSizes.map(
          size =>
            `${size.toLowerCase()}Inv`.charAt(0).toUpperCase() +
            `${size.toLowerCase()}Inv`.slice(1)
        )

        return sizeKeys.some(sizeKey => node[sizeKey] && node[sizeKey] > 0)
      })
    }

    // Filter by selected price range
    if (selectedPrice.length > 0) {
      filtered = filtered.filter(({ node }) => {
        const priceCheck = selectedPrice[0] // Assuming only one price filter can be selected at a time

        const prices = Object.keys(node)
          .filter(key => key.includes("Price") && node[key] !== null)
          .map(priceKey => node[priceKey])

        if (prices.length === 0) return false // Skip if no price available

        // Get minimum price for products with multiple sizes
        const minPrice = Math.min(...prices)

        switch (priceCheck) {
          case "Under $15.00":
            return minPrice < 15
          case "$25.00 or less":
            return minPrice <= 25
          case "$50.00 or less":
            return minPrice <= 50
          default:
            return true
        }
      })
    }

    setFilteredProducts(filtered)
  }

  // Function to handle price filters
  const handlePriceChange = event => {
    const price = event.target.value
    setSelectedPrice(selectedPrice.includes(price) ? [] : [price])
  }

  // Function to handle clearing all filters
  const clearFilters = () => {
    setSelectedCategories([]) // Clear selected categories
    setSelectedSizes([])
    setSelectedPrice([])
    setFilteredProducts(data.allInventoryJson.edges) // Reset to show all products
  }

  // Funcion to handle launching of the product detail modal
  const handleShowDetail = (product, event) => {
    event.preventDefault() // Prevent the default anchor behavior
    setSelectedProduct(product) // Set the selected product for the modal
    setShowDetail(true) // Show the modal
  }

  const handleAddToCart = (product) => {
    const newItem = {
      name: product.NewName || product.OriginalName,
      price: product._1SizePrice || product.XsPrice || 0, // Example logic to pick a price
      size: product.OneSize ? 'One Size' : sizes[0], // Default to first size if multiple
      quantity: 1 // Default quantity
    };
    addToCart(newItem);
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.welcomeSection}>
        <h2>Welcome to the Company Store!</h2>
        <h4>Explore our latest products and offers.</h4>
        <p>
          Qui irure amet amet laboris sint anim aliquip consectetur sint ipsum...
        </p>
      </div>
      <div className={styles.sidebarAndListing}>
        <FilterSidebar
          categories={categories}
          categoryCounts={categoryCounts}
          sizes={sizes}
          selectedCategories={selectedCategories}
          selectedSizes={selectedSizes}
          selectedPrice={selectedPrice}
          handleCategoryChange={handleCategoryChange}
          handleSizeChange={handleSizeChange}
          handlePriceChange={handlePriceChange}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
        <Container className={styles.productContainer}>
          <Row>
            {filteredProducts.map(({ node }) => (
              <Col xs={12} sm={6} lg={3} key={node.id}>
                <Card className={styles.cardStyle}>
                  <Card.Img
                    variant="top"
                    src={node.Image?.publicURL || "./data/images/default.jpeg"}
                    alt={node.OriginalName || "Default Image"}
                    onClick={e => handleShowDetail(node, e)}
                    className={styles.clickableImage}
                  />
                  <Card.Body className={styles.cardBodyStyle}>
                    <Card.Title>{node.NewName ? node.NewName : node.OriginalName}</Card.Title>
                    <Card.Text>
                      {node.Description && node.Description.substring(0, 100)}
                      {node.Description && node.Description.length > 100 ? "..." : ""}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>{node.OneSize ? "One Size Fits Most" : "Multiple Sizes Available"}</ListGroup.Item>
                    <ListGroup.Item>Price: {node.OneSize ? `${formatCurrency(node._1SizePrice)}` : "Varies"}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                  <Button variant="outline-success" onClick={e => handleShowDetail(node, e)}>Show Details</Button>
                  <Button variant="outline-primary" onClick={() => handleAddToCart(node)}>Add To Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
  
      <ProductDetail
        product={selectedProduct}
        show={showDetail}
        onHide={() => setShowDetail(false)}
      />
      <Footer />
    </div>
  )
}

export default ProductListing
