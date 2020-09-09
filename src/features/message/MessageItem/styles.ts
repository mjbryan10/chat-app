import styled, { ThemeColor, ThemeProps, Theme } from 'styled-components';

interface ContainerProps extends ThemeProps<Theme> {
   color: ThemeColor;
   isChained: boolean;
   isOwner: boolean;
}
interface HeaderProps extends ThemeProps<Theme> {
   color: ThemeColor;
}

const colorOrOwner = ({ theme, isOwner, color }: ContainerProps) => {
   return (isOwner ? theme.color.owner : theme.color[color]) ?? 'inherit';
};

const colorProp = ({ theme, color }: HeaderProps) => {
   return theme.color[color] ?? 'inherit';
};

export const Container = styled.div<ContainerProps>`
   background: ${({ theme }: ContainerProps) => theme.background.message ?? 'inherit'};
   border: ${colorOrOwner} 1.5px solid;
   min-width: 30%;
   max-width: 800px;
   margin: 5px;
   ${({ isOwner }) =>
      isOwner ? `margin: 5px 5px 5px auto;` : `margin: 5px auto 5px 5px;`}
   &::after {
      display: block;
      content: ' ';
      width: 100% + 3px;
      height: 10px;
      clip-path: polygon(100% 0, 0 100%, 0 0);
      background: ${colorOrOwner};
      margin: 0 -1.5px -10px -1.5px;
      ${({ isOwner }) => (isOwner ? `transform: rotateY(180deg); margin-right: -1.5px;` : null)}
      ${({ isChained }) => (isChained ? 'display: none;' : null)}
   }
`;

export const Header = styled.div<HeaderProps>`
   color: ${colorProp};
   display: flex;
   flex-flow: row nowrap;
   justify-content: space-between;
   align-items: center;
   padding: 0 0.5rem;
`;

export const Detail = styled.span`
   &:first-of-type {
      margin-right: auto;
   }
   &:last-of-type {
      margin-left: auto;
   }
`;

export const Body = styled.div<ThemeProps<Theme>>`
   padding: 0.5em;
   color: ${({theme}) => theme.color.text ?? 'auto'}
`;

export const BodyText = styled.p`
   color: ${({ theme }) => theme.color.text ?? 'inherit'};
`;
