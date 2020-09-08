import styled, { Theme, ThemeProps } from 'styled-components';

export const Container = styled.div`
   width: 80%;
`;

export const MessagesDisplay = styled.div<ThemeProps<Theme>>`
   width: 100%;
   max-width: 2000px;
   height: 100%;
   min-height: 200px;
   padding: 1em;
   background: ${({ theme }) => theme.background.messagesDisplay};
   border: ${({ theme }) => theme.border};
`;
