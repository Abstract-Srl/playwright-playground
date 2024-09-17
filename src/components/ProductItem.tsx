import React from 'react';
import styled from 'styled-components';
import { useMainContext } from '../context/MainContext';

const ProductItemWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ProductPrice = styled.p`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const AddToCartButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

interface ProductItemProps {
    id: number;
    title: string;
    price: number;
    image: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ id, title, price, image }) => {
    const { addToCart } = useMainContext();

    return (
        <ProductItemWrapper className="product-item">
            <ProductImage src={image} alt={title} />
            <ProductTitle>{title}</ProductTitle>
            <ProductPrice>${price.toFixed(2)}</ProductPrice>
            <AddToCartButton onClick={() => addToCart({ id, title, price, quantity: 1 })}>
                Add to Cart
            </AddToCartButton>
        </ProductItemWrapper>
    );
};

export default ProductItem;