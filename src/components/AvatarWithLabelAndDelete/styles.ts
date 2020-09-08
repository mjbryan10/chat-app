import styled, { ThemeProps, Theme } from 'styled-components';

interface LabelProps extends ThemeProps<Theme> {
   selected: boolean;
}

export const Label = styled.button<LabelProps>`
   display: flex;
   flex-flow: column nowrap;
   background: ${({theme: {background}, selected}) => (selected) ? background.conversation : background.conversationSelected}
`;

export const DeleteIcon = styled.div`
  float:right;
  background: red;
  height: 10px;
  width: 10px;
`;
