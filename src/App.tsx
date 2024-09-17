import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainProvider } from './context/MainContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import CartPage from './pages/CartPage';
import { GlobalStyle, theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';

const App: React.FC = () => {
  return (
      <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <MainProvider>
              <Router>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/cart" element={<CartPage />} />
                  </Routes>
              </Router>
          </MainProvider>
      </ThemeProvider>
  );
};

export default App