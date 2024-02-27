import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
// import "./ProductListing.module.css"
import Card from "react-bootstrap/Card"
import { Container, Row, Col } from "react-bootstrap"
import ListGroup from "react-bootstrap/ListGroup"
import * as styles from "./ProductListing.module.css"
import ProductDetail from "./ProductDetail"


// conditional rendering for a listing of all products
const ProductListing = () => {
  const [showDetail, setShowDetail] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

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

  const products = data.allInventoryJson.edges

  useEffect(() => {
    const fetchedCategories = new Set()
    data.allInventoryJson.edges.forEach(({ node }) => {
      fetchedCategories.add(node.Category)
    })
    setCategories([...fetchedCategories])
    setFilteredProducts(data.allInventoryJson.edges)
  }, [data])

  const handleCategoryChange = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category))
    }
  }

  const applyFilters = () => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(data.allInventoryJson.edges)
    } else {
      const filtered = data.allInventoryJson.edges.filter(({ node }) =>
        selectedCategories.includes(node.Category)
      )
      setFilteredProducts(filtered)
    }
  }

  const handleShowDetail = (product, event) => {
    event.preventDefault() // Prevent the default anchor behavior
    setSelectedProduct(product) // Set the selected product for the modal
    setShowDetail(true) // Show the modal
  }

  return (
    <div className={styles.mainContent}>
      <div className={styles.filterSidebar}>
        <h5 className={styles.filterHeader}>Category</h5>
        {categories.map(category => (
          <div key={category} className={styles.filterOption}>
            <input
              type="checkbox"
              id={category}
              name={category}
              value={category}
              className={styles.filterCheckbox}
              onChange={e => handleCategoryChange(category, e.target.checked)}
            />
            <label htmlFor={category} className={styles.filterLabel}>{category}</label>
          </div>
        ))}
        <button className={styles.applyButton} onClick={() => applyFilters()}>Apply Filters</button>
      </div>
      <Container className={styles.productContainer}>
        <Row>
          {filteredProducts.map(({ node }) => (
            <Col xs={12} sm={6} md={4} lg={3} key={node.id}>
              <Card style={{ width: "18rem", margin: "10px" }}>
                <Card.Img
                  variant="top"
                  src={node.Image?.publicURL || "./data/images/default.jpeg"}
                  alt={node.OriginalName || "Default Image"}
                  style={{ height: "200px", objectFit: "cover" }} // Ensures images are the same size
                />
                <Card.Body style={{ minHeight: "210px" }}>
                  {" "}
                  {/* Adjust minHeight as needed */}
                  <Card.Title>
                    {node.NewName ? node.NewName : node.OriginalName}
                  </Card.Title>
                  <Card.Text>
                    {node.Description && node.Description.substring(0, 100)}
                    {node.Description && node.Description.length > 100
                      ? "..."
                      : ""}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    {node.OneSize
                      ? "One Size Fits Most"
                      : "Multiple Sizes Available"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: {node.OneSize ? `$${node._1SizePrice}` : "Varies"}
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Card.Link href="#" onClick={e => handleShowDetail(node, e)}>
                    Details (FIP)
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        show={showDetail}
        onHide={() => setShowDetail(false)}
      />
    </div>
  )
}

export default ProductListing
