import styled, { ThemeProps, Theme, ThemeColor } from 'styled-components';

interface LabelProps extends ThemeProps<Theme> {
   selected: boolean;
   color?: ThemeColor;
}

interface ThemeWithColor extends ThemeProps<Theme> {
   color?: ThemeColor;
}

export const Label = styled.button<LabelProps>`
   display: flex;
   position: relative;
   flex-flow: column nowrap;
   justify-content: center;
   align-items: center;
   margin: 5px;
   background: ${({ theme: { background }, selected }) =>
      selected ? background.conversation : background.conversationSelected};
   color: ${({ theme, color }) => (color ? theme.color[color] : 'inherit')};
   border: ${({ theme }) => theme.border};
   border-color: ${({ theme, color }) => (color ? theme.color[color] : 'inherit')};
   &:hover {
      cursor: pointer;
   }
`;
export const Title = styled.span<ThemeWithColor>`
   color: ${({ theme, color }) => (color ? theme.color[color] : 'inherit')};
`;
export const DeleteIcon = styled.div<ThemeProps<Theme>>`
   opacity: 0;
   position: absolute;
   bottom: 0;
   right: 0;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100%;
   width: 100%;
   font-size: 25px;
   background-color: ${({ theme }) =>
      theme.type === 'light' ? 'rgba(255,255,255, 0.5)' : 'rgba(0,0,0, 0.5)'};
   padding: 0;
   color: ${({ theme }) => theme.color.text};
   ${({ theme }: ThemeProps<Theme>) => theme.snippets.transition.short}
   &:hover {
      opacity: 1;
   }
`;
