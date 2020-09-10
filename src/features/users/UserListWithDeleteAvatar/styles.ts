import styled from 'styled-components';
import { breakpoint } from 'shared/styles/Variables';

export const Container = styled.div`
   display: flex;
   overflow-x: auto;
   max-width: 90vw;

   @media ${breakpoint.tablet} {
      max-width: 350px;
   }
`;
