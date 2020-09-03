import styled, { ThemeProps, Theme } from 'styled-components';

export const Label = styled.label`
   display: flex;
   flex-flow: column nowrap;
   justify-content: flex-start;
   color: ${({ theme: { color } }: ThemeProps<Theme>) => color.text ?? 'inherit'};
   text-transform: uppercase;
`;
