import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
// import "./ProductListing.module.css"
import Card from "react-bootstrap/Card"
import { Container, Row, Col } from "react-bootstrap"
import ListGroup from "react-bootstrap/ListGroup"
// import styles from "./ProductListing.module.css"
import ProductDetail from "./ProductDetail"

// conditional rendering for a listing of all products
const ProductListing = () => {
  const [showDetail, setShowDetail] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

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

  // mapping for sizes and prices of non-1-size items
  const renderSizes = node => {
    // list of keys for sizes and prices and map display names to sizes
    const sizeKeys = [
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
    const sizeDisplayNames = {
      XsInv: "X-Small",
      SmInv: "Small",
      MdInv: "Medium",
      LgInv: "Large",
      XlInv: "X-Large",
      _2xInv: "2X-Large",
      _3xInv: "3X-Large",
      _4xInv: "4X-Large",
      _6xInv: "6X-Large",
    }
    const priceKeys = [
      "XsPrice",
      "SmPrice",
      "MdPrice",
      "LgPrice",
      "XlPrice",
      "_2xPrice",
      "_3xPrice",
      "_4xPrice",
      "_6xPrice",
    ]

    // map the keys together from the node data
    return sizeKeys.map((sizeKey, index) => {
      const inventoryCount = node[sizeKey]
      const price = node[priceKeys[index]]
      const displayName = sizeDisplayNames[sizeKey]

      // render the mapping
      return inventoryCount ? (
        <div key={sizeKey}>
          <p>
            {displayName}: {inventoryCount} available | ${price} each.
          </p>
          <br />
        </div>
      ) : null
    })
  }

  const handleShowDetail = (product, event) => {
    event.preventDefault() // Prevent the default anchor behavior
    setSelectedProduct(product) // Set the selected product for the modal
    setShowDetail(true) // Show the modal
  }

  return (
    <div>
      <Container>
        <Row>
          {products.map(({ node }) => (
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
