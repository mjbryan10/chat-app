import styled, { ThemeColor, ThemeProps, Theme } from 'styled-components';

interface Props extends ThemeProps<Theme> {
   color: ThemeColor;
   isChained: boolean;
}

export const Container = styled.div<Props>`
   background: ${({ theme }: Props) => theme.background.message ?? 'inherit'};
   border: ${({color, theme}: Props) => theme.color[color]} 1.5px solid;
`;

export const Header = styled.div`
   display: flex;
   flex-flow: row nowrap;
   justify-content: space-between;
   align-items: center;
`;

export const Detail = styled.span<ThemeProps<Theme>>`
  color: ${({theme}) => theme.color.text ?? 'inherit'} ;
  &:first-of-type {
    margin-right: auto;
  }
  &:last-of-type {
    margin-left: auto;
  }
`;

export const Body = styled.div`
  
`;

export const BodyText = styled.p`
  color: ${({theme}) => theme.color.text ?? 'inherit'} ;

`;