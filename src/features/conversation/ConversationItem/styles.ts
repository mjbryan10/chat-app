import styled, { ThemeProps, Theme } from 'styled-components';
import { SpectrumColor } from 'shared/theme/types';

interface ButtonProps extends ThemeProps<Theme> {
   selected: boolean;
   color: SpectrumColor;
}

export const ItemButton = styled.button<ButtonProps>`
   &,
   &:active {
      background: ${({ theme: { background }, selected }) =>
         selected ? background.conversationSelected : background.conversation};
   }
   ${({ selected, theme }) => {
      return selected
         ? theme.snippets.shadow.inner
         : null
   }}
   border: ${({ color, theme }) => theme.color[color]} 1px solid;
   margin: 3px 0;
   width: 100%;
   padding: 0;
   &:hover {
      cursor: pointer;
   }
`;
