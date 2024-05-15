import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import Layout from "./src/components/layout"
import { CartProvider } from "./src/components/CartContext"
import { AppProvider } from "./src/components/AppContext"

export const wrapRootElement = ({ element }) => (
  <AppProvider>
    <CartProvider>{element}</CartProvider>
  </AppProvider>
)

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
