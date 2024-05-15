import React from "react"
import Layout from "../components/layout"
import ErrorBoundary from "../components/ErrorBoundary"
import ProductListing from "../components/ProductListing"

const ProductPage = () => {
  return (
    <>
      <Layout>
        <div>
          <ErrorBoundary>
            <ProductListing />
          </ErrorBoundary>
        </div>
      </Layout>
    </>
  )
}

export default ProductPage
