import styled, { ThemeProps, Theme } from 'styled-components';
import { Props } from '.';

interface ButtonProps extends ThemeProps<Theme>, Props {}

export const Button = styled.button<ButtonProps>`
   box-sizing: border-box;
   height: ${({ height }) => (height || 50)}px;
   width: ${({ width }) => (width || 50)}px;
   color: ${({ color, theme }) =>
      color ? theme.color[color] : theme.color.text || 'inherit'};
   font-size: ${({height}) => height ? height*0.8 : 50*0.8}px;
   background: none;
   border: none;
   margin: 0 5px;
   &:hover {
      cursor: pointer;
   }
`;

//TODO: Consider removing margin;