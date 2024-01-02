import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const data = useStaticQuery(graphql`
  query {
    allInventoryJson {
      edges {
        node {
          Original_Name
          New_Name
          Description
          Category
          Image
          Active
          Total
          XS_Price
          SM_Price
          MD_Price
          LG_Price
          XL_Price
          _2X_Price
          _3X_Price
          _4X_Price
          _6X_Price
        }
      }
    }
  }
`)

const ProductListing = () => {
    const products = data.allInventoryJson.edges;

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