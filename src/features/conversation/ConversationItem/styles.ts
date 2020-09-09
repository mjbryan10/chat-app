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
   ${({ selected }) => {
      return selected
         ? `-moz-box-shadow:    inset 0 0 10px #000000;
            -webkit-box-shadow: inset 0 0 10px #000000;
            box-shadow:         inset 0 0 10px #000000;`
         : null;
   }}
   border: ${({ color, theme }) => theme.color[color]} 1px solid;
   margin: 3px 0;
   width: 100%;
   padding: 0;
`;
