import styled from 'styled-components';
import { breakpoint } from 'shared/styles/Variables';

interface DisplaySwitchProps {
   active: boolean;
}

export const Container = styled.main`
   display: flex;
   flex-flow: row nowrap;
   max-width: 100vw;
`;

export const DisplaySwitch = styled.div<DisplaySwitchProps>`
   display: ${({ active }) => (active ? 'block' : 'none')};
   width: 100%;
   margin: 1rem;
   @media ${breakpoint.tablet} {
      display: block;
      width: auto;
      &:last-of-type {
         flex-grow: 1;
         margin-left: 0;
      }
   }
`;
