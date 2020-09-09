import styled, { ThemeProps, Theme } from 'styled-components';
import { breakpoint } from 'shared/styles/Variables';

export const Container = styled.div`
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
   width: 100%;
   @media ${breakpoint.tablet} {
      max-width: 400px;
      min-width: 300px;
   }
`;

export const Header = styled.h2<ThemeProps<Theme>>`
   text-transform: uppercase;
   text-align: center;
   color: ${({ theme }) => theme.color.text ?? 'inherit'};
   margin: 1rem auto;
`;
