import styled, { ThemeProps, Theme } from 'styled-components';
import { ThemeColor } from 'shared/theme/types';

interface ButtonProps extends ThemeProps<Theme> {
  selected: boolean;
  color: ThemeColor;
}

export const ItemButton = styled.button<ButtonProps>`
   &,
   &:active {
      background: ${({ theme: { background }, selected }) =>
         selected ? background.conversationSelected : background.conversation};
   }
`;
   /* border: ${({ color, theme }) => theme.color[color]} 1px solid */
