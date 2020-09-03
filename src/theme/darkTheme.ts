import { Theme } from 'styled-components';

const darkTheme: Theme = {
   color: {
      text: '#fff',
      dark: '#212529',
   },
   background: {
      page: `linear-gradient(180deg, rgba(52,58,64,1) 0%, rgba(41,46,48,1) 100%)`,
      buttonPrimary: `linear-gradient(
     173deg,
     rgba(249, 212, 35, 1) 0%,
     rgba(248, 54, 0, 1) 100%
  )`,
      inputField: '#6C757D',
   },
   border: `1px solid #212529`,
};

export default darkTheme;
