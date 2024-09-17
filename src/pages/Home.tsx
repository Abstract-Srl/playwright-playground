import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import {useMainContext} from '../context/MainContext'

const HomeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Home: React.FC = () => {
    const {user} = useMainContext()
    return (
        <>
            <Header />
            <HomeWrapper>
                <Title>Ciao, {user?.name.first}! Welcome to our Playwright Testing Playground</Title>
                <Subtitle>This is a sample application to demonstrate Playwright testing capabilities.</Subtitle>
            </HomeWrapper>
        </>
    );
};

export default Home;