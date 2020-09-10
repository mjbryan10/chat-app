import styled, { ThemeProps, Theme } from 'styled-components';

export const Container = styled.div<ThemeProps<Theme>>`
   background: ${({ theme }) => theme.background.conversation};
   display: flex;
   flex-flow: column nowrap;
   justify-content: center;
   align-items: center;
   min-width: 80%;
   transition: ${({theme}) => theme.transition.short};
`;
