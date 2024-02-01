import React from "react"
import { useStaticQuery, graphql } from "gatsby"
// import "./ProductListing.module.css"
import Card from "react-bootstrap/Card"
import { Container, Row, Col } from "react-bootstrap"
import ListGroup from "react-bootstrap/ListGroup"

// conditional rendering for a listing of all products
const ProductListing = () => {
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
          }
        }
      }
    }
  `)

  const products = data.allInventoryJson.edges

  return (
    <div>
      <Container>
        <Row>
          {products.map(({ node }) => (
            <Col xs={12} sm={6} md={4} lg={3} key={node.id}>
              <Card key={node.id} style={{ width: "18rem", margin: "10px" }}>
                <Card.Img
                  variant="top"
                  src={node.Image?.publicURL || "./data/images/default.jpeg"}
                  alt={node.OriginalName || "Default Image"}
                />
                <Card.Body>
                  <Card.Title>
                    {node.NewName ? node.NewName : node.OriginalName}
                  </Card.Title>
                  <Card.Text>
                    {node.Description.substring(0, 20)}
                    {node.Description.length > 20 ? "..." : ""}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    {node.OneSize
                      ? "One Size Fits Most"
                      : "Multiple Sizes Available"}
                  </ListGroup.Item>
                  {/* Additional ListGroup items can be added here */}
                </ListGroup>
                <Card.Body>
                  <Card.Text>Category: {node.Category}</Card.Text>
                  <Card.Text>
                    Price: {node.OneSize ? `$${node._1SizePrice}` : "Varies"}
                  </Card.Text>
                  {/* Conditional rendering of sizes and prices for non-1-size items */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default ProductListing
