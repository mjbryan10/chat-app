import styled, { ThemeProps, Theme, ThemeColor } from 'styled-components';

interface BaseProps extends ThemeProps<Theme> {
   size: number;
}

interface OuterContainer extends BaseProps {
   color: ThemeColor;
}

export const Container = styled.div<OuterContainer>`
   border: ${({ theme }) => theme.border ?? 'inherit'};
   min-width: ${({ size }) => size}px;
   min-height: ${({ size }) => size}px;
   display: flex;
   justify-content: center;
   align-items: center;
   color: ${({ color, theme }) => theme.color[color]};
   border-color: ${({ color, theme }) => theme.color[color]};
`;

export const InnerContainer = styled.span<BaseProps>`
   display: block;
   text-transform: uppercase;
   font-size: ${({ size }) => (size ?? 50) * 0.8}px;
`;
