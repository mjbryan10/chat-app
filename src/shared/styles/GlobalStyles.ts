import { createGlobalStyle, ThemeProps, Theme } from 'styled-components'


const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}
  body {
    background: ${({theme}: ThemeProps<Theme>) => theme.background.page};
    min-height: 100vh;
  }
  `;

  export default GlobalStyles;