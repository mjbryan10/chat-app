import styled, { ThemeProps, Theme } from 'styled-components';

interface LabelProps extends ThemeProps<Theme> {
   selected: boolean;
}

export const Label = styled.div<LabelProps>`
   display: flex;
   flex-flow: row wrap;
   color: ${({theme}) => theme.color.text || 'inherit'};
`;
