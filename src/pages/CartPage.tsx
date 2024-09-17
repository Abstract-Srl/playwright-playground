import React from 'react';
import Header from '../components/Header';
import Cart from '../components/Cart';

const CartPage: React.FC = () => {
    return (
        <div>
            <Header />
            <h1>Your Cart</h1>
            <Cart />
        </div>
    );
};

export default CartPage;