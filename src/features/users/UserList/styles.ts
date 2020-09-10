import styled from 'styled-components';

export const ListWrapper = styled.ul`
   width: 100%;
   list-style: none;
   margin: 0;
   padding: 0;
   & li {
      width: 100%;
      margin-bottom: 5px;
      &:first-of-type {
         margin-top: 5px;
      }
   }
`;
