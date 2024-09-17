import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useMainContext} from '../context/MainContext';

const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.colors.primary};
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const CartBadge = styled.span`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const RightHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 50px
`

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Header: React.FC = () => {
    const {cart, user} = useMainContext();
    const initials = user ? user?.name.first.charAt(0).toUpperCase() + user?.name.last.charAt(0).toUpperCase() : ''
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <HeaderWrapper>
            <Nav>
                <NavList>
                    <NavItem><Link to="/">Home</Link></NavItem>
                    <NavItem><Link to="/products">Products</Link></NavItem>
                    <NavItem><Link to="/login">Login</Link></NavItem>
                </NavList>
                {!!user && (
                    <RightHeader>
                        <NavItem>
                            <Link to="/cart">
                                Cart
                                {cartCount > 0 && <CartBadge className="cart-badge">{cartCount}</CartBadge>}
                            </Link>
                        </NavItem>
                        {!!initials && (
                            <UserAvatar>
                                {initials}
                            </UserAvatar>
                        )}
                    </RightHeader>
                )}
            </Nav>
        </HeaderWrapper>
    );
};

export default Header;