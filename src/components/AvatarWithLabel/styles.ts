import styled, { ThemeProps, Theme } from 'styled-components';
import { ThemeColor } from 'shared/theme/types';

interface LabelProps extends ThemeProps<Theme> {
   selected: boolean;
   color?: ThemeColor;
}

export const Label = styled.div<LabelProps>`
   display: flex;
   flex-flow: row wrap;
   justify-content: flex-start;
   align-items: center;
   color: ${({ theme, color }) => {
      if (color) return theme.color[color] || 'inherit';
      return theme.color.text || 'inherit';
   }};
   & h3 {
      margin: 0 auto;
   }
`;
