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

export const Form = styled.form`
   padding: 1em;
   position: relative;
   flex-flow: column nowrap;
   display: flex;
   align-items: flex-end;
`;
