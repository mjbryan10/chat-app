import styled, { Theme, ThemeProps } from 'styled-components';

export const Container = styled.div`
   position: relative;
   max-width: 1800px;
   /* width: 80%; */
   width: 100%;
   display: flex;
   flex-flow: column nowrap;
`;

export const MessagesDisplay = styled.div<ThemeProps<Theme>>`
   height: 100%;
   min-height: 200px;
   max-height: 50vh;
   overflow-y: auto;
   padding: 1em;
   background: ${({ theme }) => theme.background.messagesDisplay};
   border: ${({ theme }) => theme.border};
`;
