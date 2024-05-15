import React, { createContext, useContext, useState } from "react"

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  // State to manage visibility of checkout/product pages
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false)

  // Functions to toggle state
  const showCheckout = () => setIsCheckoutVisible(true)
  const hideCheckout = () => setIsCheckoutVisible(false)

  return (
    <AppContext.Provider
      value={{ isCheckoutVisible, showCheckout, hideCheckout }}
    >
      {children}
    </AppContext.Provider>
  )
}
