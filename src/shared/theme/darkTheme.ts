import { Theme } from 'styled-components';
import defaultColors from './colors';
import { defaultTransitions } from './transitions';

//Pattern from heropatterns.com
const backgroundPattern = `#4E5358 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='152' height='152' viewBox='0 0 152 152'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='temple' fill='%2342474d' fill-opacity='0.36'%3E%3Cpath d='M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`


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
      conversationSelected: 'linear-gradient(180deg, #2E3236 0%, #3D4044 100%)',
      message: '#343A40',
      // messagesDisplay: 'linear-gradient(180deg, #4E5358 0%, #42474D 100%)',
      messagesDisplay: backgroundPattern,
   },
   border: `1.5px solid #212529`,
   snippets: {
      transition: {...defaultTransitions},
   }
};

export default darkTheme;
