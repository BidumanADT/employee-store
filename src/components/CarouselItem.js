import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "./CarouselItem.module.css"

const CarouselItem = () => {
  const data = useStaticQuery(graphql`
    query CarouselItemQuery {
      allInventoryJson {
        edges {
          node {
            id
            OriginalName
            NewName
            Image {
              publicURL
            }
          }
        }
      }
    }
  `)

  const products = data.allInventoryJson.edges

  return (
    <>
      {products.map(({ node }) => (
        <div key={node.id}>
          <img
            src={node.Image.publicURL}
            alt={node.NewName ? node.NewName : node.OriginalName}
            className="productImage"
          />
          <h2>
            {node.NewName ? node.NewName : node.OriginalName}
          </h2>
        </div>
      ))}
    </>
  )
}

export default CarouselItem
