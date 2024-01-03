import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const data = useStaticQuery(graphql`
  query MyQuery {
    allInventoryJson {
      edges {
        node {
          OriginalName
          NewName
          Description
          Category
          Image {
            publicURL
          }
          Active
          OneSize
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

const ProductListing = () => {
  const products = data.allInventoryJson.edges

  return (
    <div>
      {products.map(({ node }) => (
        <div key={node.Original_Name}>
          <h2>{node.Original_Name}</h2>
          <p>{node.Description}</p>
        </div>
      ))}
    </div>
  )
}
