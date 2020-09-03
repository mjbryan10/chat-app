import styled, {ThemeProps, Theme} from 'styled-components';

export const Input = styled.input`
   background-color: ${({theme: {background}}: ThemeProps<Theme>) =>
      background.inputField ? background.inputField : '#6C757D'};
   padding: 1em;
   color: ${ ({theme: {color}}: ThemeProps<Theme>) => color.text || 'inherit'};
`;
