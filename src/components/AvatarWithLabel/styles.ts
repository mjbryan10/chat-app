import styled, { ThemeProps, Theme } from 'styled-components';

interface LabelProps extends ThemeProps<Theme> {
   selected: boolean;
}

export const Label = styled.button<LabelProps>`
   display: flex;
   flex-flow: row wrap;
   background: ${({theme: {background}, selected}) => (selected) ? background.conversation : background.conversationSelected}
`;
