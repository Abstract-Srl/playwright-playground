import React from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';

const Products: React.FC = () => {
    return (
        <div>
            <Header />
            <h1>Products</h1>
            <ProductList />
        </div>
    );
};

export default Products;