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
   display: flex;
   flex-flow: column nowrap;
   padding: 1em;
   position: relative;
   width: 100%;
   max-width: 400px;
   & input {
      margin-bottom: 3px;
   }
   & input[type='submit'] {
      margin-top: 5px;
   }
`;

export const ErorrText = styled.p<ThemeProps<Theme>>`
   color: ${({theme})=> theme.color.danger || 'red'};
`;
