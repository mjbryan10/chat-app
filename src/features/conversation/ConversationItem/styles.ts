import styled, { ThemeProps, Theme } from 'styled-components';

interface ButtonProps extends ThemeProps<Theme> {
  selected: boolean;
}

export const ItemButton = styled.button<ButtonProps>`
   &,
   &:active {
      background: ${({ theme: { background }, selected }) =>
         selected ? background.conversationSelected : background.conversation};
   }
`;
