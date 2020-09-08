import styled, { ThemeColor, ThemeProps, Theme } from 'styled-components';

interface Props extends ThemeProps<Theme> {
   color: ThemeColor;
   isChained: boolean;
   isOwner: boolean;
}

const colorOrOwner = ({theme, isOwner, color}: Props) => {
  return (isOwner ? theme.color.owner : theme.color[color]) ?? 'inherit';
}
   

export const Container = styled.div<Props>`
   background: ${({ theme }: Props) => theme.background.message ?? 'inherit'};
   border: ${colorOrOwner} 1.5px solid;
   min-width: 30%;
   max-width: 800px;
   margin: 5px;
   ${({isOwner}) => isOwner ? `margin: 5px 5px 5px auto;` : `margin: 5px auto 5px 5px;`}
   &::after {
      display: block;
      content: ' ';
      width: 100% + 3px;
      height: 10px;
      clip-path: polygon(100% 0, 0 100%, 0 0);
      background: ${colorOrOwner};
      margin: -1.5px -1.5px -10px -1.5px;
      ${({ isOwner }) => (isOwner ? 'transform: rotateY(180deg);' : null)}
      ${({isChained}) => isChained ? 'display: none;' : null}
   }
   
`;

export const Header = styled.div`
   display: flex;
   flex-flow: row nowrap;
   justify-content: space-between;
   align-items: center;
`;

export const Detail = styled.span<ThemeProps<Theme>>`
   color: ${({ theme }) => theme.color.text ?? 'inherit'};
   &:first-of-type {
      margin-right: auto;
   }
   &:last-of-type {
      margin-left: auto;
   }
`;

export const Body = styled.div`
  padding: 0.5em;
`;

export const BodyText = styled.p`
   color: ${({ theme }) => theme.color.text ?? 'inherit'};
`;
