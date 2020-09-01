import styled from 'styled-components';

export const Input = styled.input`
   background-color: ${({theme}) =>
      theme.inputBackground ? theme.inputBackground : '#6C757D'};
   padding: 1em;
   color: inherit;
`;
