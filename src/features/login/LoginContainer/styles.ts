import styled, { ThemeProps, Theme } from 'styled-components';

export const Container = styled.div`
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   flex-flow: row nowrap;
   align-items: center;
   justify-content: center;
   display: flex;
   background: ${({ theme }: ThemeProps<Theme>) => theme.background.page ?? 'black'};
`;

export const Display = styled.div`
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;

export const ButtonToggle = styled.button<ThemeProps<Theme>>`
   padding: 0.8rem;
   margin: 0;
   width: 80%;
   background: ${({ theme }:ThemeProps<Theme>) => theme.background.conversation};
   border: ${({ theme }) => theme.border};
   color: ${({theme}) => theme.color.text};
   &:hover {
      cursor: pointer;
      ${({theme}) => theme.snippets.shadow.inner}
   }
`;
