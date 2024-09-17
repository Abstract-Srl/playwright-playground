import { createGlobalStyle } from 'styled-components';

export const theme = {
    colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        accent: '#e74c3c',
        background: '#f8f9fa',
        text: '#34495e',
    },
    fonts: {
        body: '"Roboto", sans-serif',
        heading: '"Montserrat", sans-serif',
    },
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
  }
`;