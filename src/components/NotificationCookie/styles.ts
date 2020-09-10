import styled, { ThemeProps, Theme } from 'styled-components';

export const NoticeContainer = styled.div<ThemeProps<Theme>>`
   display: flex;
   justify-content: center;
   align-items: center;
   position: fixed;
   bottom: 0;
   padding: 1em;
   width: 100%;
   background: ${({ theme }) => theme.background.message};
   color: ${({ theme }) => theme.color.text};
`;

export const TextBox = styled.p<ThemeProps<Theme>>`
   color: ${({ theme }) => theme.color.text};
   margin: 5px;
`;

export const ConfirmationButton = styled.button`
   color: ${({ theme }) => theme.color.white ?? '#fff'};
   border: ${({ theme }) => theme.border};
   background: ${({ theme }) => theme.color.success ?? 'green'};
   margin: 5px;
   &:hover {
     cursor: pointer;
   }
`;
