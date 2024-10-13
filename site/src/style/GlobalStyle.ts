import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  body,
  html {
    box-sizing: border-box;
    font-family: roboto;
    font-size: 1rem;
    font-weight: 400;
    color: ${theme.colors.emWhite};
    background-color: ${theme.colors.emBlack};
  }

  input {
    border-radius: 5px;
  }

  *,
  ::after,
  ::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }

  a {
    color: inherit;
    text-decoration: none;

  }
  
  a:hover {
    color: inherit;
  }
`;
