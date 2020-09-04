import { Theme } from 'styled-components';
import defaultColors from './colors';

const darkTheme: Theme = {
   color: { ...defaultColors, text: '#fff', owner: '#fff' },
   background: {
      page: `linear-gradient(180deg, rgba(52,58,64,1) 0%, rgba(41,46,48,1) 100%)`,
      buttonPrimary: `linear-gradient(
     173deg,
     rgba(249, 212, 35, 1) 0%,
     rgba(248, 54, 0, 1) 100%
  )`,
      inputField: '#6C757D',
      conversation: 'linear-gradient(180deg, #4E5358 0%, #42474D 100%)',
      conversationSelected:
         'linear-gradient(180deg, #2E3236 0%, #3D4044 100%)',
   },
   border: `1.5px solid #212529`,
};

export default darkTheme;
