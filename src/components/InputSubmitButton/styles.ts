import styled, { ThemeProps, Theme } from 'styled-components';

export const Input = styled.input`
   background: rgb(249, 212, 35);
   background: ${({ theme: { background } }: ThemeProps<Theme>) =>
      background.buttonPrimary ?? 'inherit'};
   border: ${({ theme }: ThemeProps<Theme>) => theme.border};
   padding: 1em 3em;
   text-transform: uppercase;
   color: white;
   text-align: center;
   /* font-weight: bold; */
   text-shadow: 0px 0px 5px rgba(0,0,0,0.3);
   &:hover {
      cursor: pointer;
      ${({theme}) => theme.snippets.shadow.inner}
   }
   &:disabled {
      cursor: auto;
   }
`;
