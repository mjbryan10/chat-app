import { Theme } from 'styled-components';

const lightTheme: Theme = {
   color: {
      text: '#000',
      dark: '#212529',
   },
   background: {
      page: `background: linear-gradient(180deg, rgba(230,234,238,1) 0%, rgba(215,218,219,1) 100%)`,
      buttonPrimary: `linear-gradient(
      173deg,
      rgba(249, 212, 35, 1) 0%,
      rgba(248, 54, 0, 1) 100%
   )`,
      inputField: '#DBDBDB',
   },
   border: `1px solid #212529`,
};

export default lightTheme;
