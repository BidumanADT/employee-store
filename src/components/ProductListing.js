import React from "react"
import { useStaticQuery, graphql } from "gatsby"

// pull all data from GraphQL backend
const data = useStaticQuery(graphql`
  query MyQuery {
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

// conditional rendering for a listing of all products
const ProductListing = () => {
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
      "XsInv": "X-Small",
      "SmInv": "Small",
      "MdInv": "Medium",
      "LgInv": "Large",
      "XlInv": "X-Large",
      "_2xInv": "2X-Large",
      "_3xInv": "3X-Large",
      "_4xInv": "4X-Large",
      "_6xInv": "6X-Large",
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

  return (
    <div>
      {products.map(({ node }) => (
        <div key={node.id}>
          <h2>{node.NewName ? node.NewName : node.OriginalName}</h2>
          {node.OneSize ? (
            <>
              <img src={node.Image.publicURL} />
              <br />
              <p>{node.Category}</p>
              <br />
              <p>{node.Description}</p>
              <br />
              <p>Number Available: {node._1SizeInv}</p>
              <br />
              <p>Price: {node._1SizePrice}</p>
              <br />
            </>
          ) : (
            <>
              <img src={node.Image.publicURL} />
              <br />
              <p>{node.Category}</p>
              <br />
              <p>{node.Description}</p>
              <br />
              {renderSizes(node)}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
