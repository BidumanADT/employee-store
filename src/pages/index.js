import React from "react"
import Layout from "../components/layout"
import ErrorBoundary from "../components/ErrorBoundary"
import ProductListing from "../components/ProductListing"
import CheckoutPage from "../components/CheckoutPage"
import { useAppContext } from "../components/AppContext"

const ProductPage = () => {
  // Read current state of checkout page visibility
  const { isCheckoutVisible } = useAppContext()

  return (
    <>
      <Layout>
        <div>
          <ErrorBoundary>
            {!isCheckoutVisible ? <ProductListing /> : <CheckoutPage />}
          </ErrorBoundary>
        </div>
      </Layout>
    </>
  )
}

export default ProductPage
