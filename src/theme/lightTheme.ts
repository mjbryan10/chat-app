import { Theme } from 'styled-components';
import defaultColors from './colors';

const lightTheme: Theme = {
   color: {...defaultColors, text: '#000', owner: '#000'},
   background: {
      page: `background: linear-gradient(180deg, rgba(230,234,238,1) 0%, rgba(215,218,219,1) 100%)`,
      buttonPrimary: `linear-gradient(
      173deg,
      rgba(249, 212, 35, 1) 0%,
      rgba(248, 54, 0, 1) 100%
   )`,
      inputField: '#DBDBDB',
      conversation: 'linear-gradient(180deg, rgba(78,83,88,1) 0%, rgba(66,71,77,1) 100%)',
      conversationSelected: 'linear-gradient(180deg, rgba(78,83,88,1) 0%, rgba(66,71,77,1) 100%)',
   },
   border: `1.5px solid #212529`,
};

export default lightTheme;
