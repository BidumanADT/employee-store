import React from 'react';
import CartIcon from './CartIcon';

const Layout = ({ children }) => {
    return (
        <div>
            <CartIcon />
            <main>{children}</main>
        </div>
    );
};

export default Layout;