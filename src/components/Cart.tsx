import React from 'react';
import styled from 'styled-components';
import { useMainContext } from '../context/MainContext';
import CartItem from './CartItem';

const CartWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto;
`;

const CartTotal = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  font-style: italic;
  color: ${props => props.theme.colors.text};
`;

const Cart: React.FC = () => {
    const { cart } = useMainContext();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartWrapper>
            {cart.length === 0 ? (
                <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
            ) : (
                <>
                    {cart.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <CartTotal className="cart-total">Total: ${total.toFixed(2)}</CartTotal>
                </>
            )}
        </CartWrapper>
    );
};

export default Cart;