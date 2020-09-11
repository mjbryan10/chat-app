import styled, { Theme, ThemeProps } from 'styled-components';

export const Container = styled.div`
   position: relative;
   max-width: 1800px;
   width: 100%;
   height: 100%;
   max-height: 80vh;
   display: flex;
   flex-flow: column nowrap;
`;

export const MessagesDisplay = styled.div<ThemeProps<Theme>>`
   height: 100%;
   flex-grow: 1;
   min-height: 200px;
   overflow-y: auto;
   padding: 1em;
   background: ${({ theme }) => theme.background.messagesDisplay};
   border: ${({ theme }) => theme.border};
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0 10px;
`;
