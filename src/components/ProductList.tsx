import React from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { products } from '../utils/testData';

const ProductListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductList: React.FC = () => {
    return (
        <ProductListWrapper>
            {products.map((product) => (
                <ProductItem key={product.id} {...product} />
            ))}
        </ProductListWrapper>
    );
};

export default ProductList;