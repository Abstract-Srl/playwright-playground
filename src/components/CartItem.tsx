import React from 'react';
import styled from 'styled-components';
import { useMainContext } from '../context/MainContext';

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
`;

const ItemPrice = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  margin: 0;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const QuantityButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const QuantityDisplay = styled.span`
  margin: 0 0.5rem;
`;

const RemoveButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

interface CartItemProps {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, title, price, quantity }) => {
    const { removeFromCart, updateCartItemQuantity } = useMainContext();

    return (
        <CartItemWrapper className="cart-item">
            <ItemInfo>
                <ItemTitle>{title}</ItemTitle>
                <ItemPrice>${price.toFixed(2)}</ItemPrice>
                <ItemQuantity>
                    <QuantityButton onClick={() => updateCartItemQuantity(id, quantity - 1)}>-</QuantityButton>
                    <QuantityDisplay>Quantity: {quantity}</QuantityDisplay>
                    <QuantityButton onClick={() => updateCartItemQuantity(id, quantity + 1)}>+</QuantityButton>
                </ItemQuantity>
            </ItemInfo>
            <RemoveButton onClick={() => removeFromCart(id)}>Remove</RemoveButton>
        </CartItemWrapper>
    );
};

export default CartItem;