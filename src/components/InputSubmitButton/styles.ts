import styled, { ThemeProps, Theme } from 'styled-components';

export const Input = styled.input`
   background: rgb(249, 212, 35);
   background: ${({ theme: { background } }: ThemeProps<Theme>) =>
      background.buttonPrimary ?? 'inherit'};
   border: ${({ theme }: ThemeProps<Theme>) => theme.border};
   padding: 1em;
   margin: 0 0.3rem;
   &:hover {
      cursor: pointer;
   }
`;
