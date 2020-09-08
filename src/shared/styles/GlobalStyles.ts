import { createGlobalStyle, ThemeProps, Theme } from 'styled-components'


const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}: ThemeProps<Theme>) => theme.background.page};
    min-height: 100vh;
  }
  `;

  export default GlobalStyles;