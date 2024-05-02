import React from 'react';
import Layout from './src/components/layout';
import { CartProvider } from './src/components/CartContext'; 

export const wrapRootElement = ({ element }) => (
    <CartProvider>
        {element}
    </CartProvider>
);

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` });
};

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};