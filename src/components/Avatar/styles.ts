import styled, {ThemeProps, Theme} from 'styled-components';

interface Props {
  theme: Theme;
  size?: number;
}

export const Container = styled.div`
  border: ${({theme}: ThemeProps<Theme>) => theme.border ?? 'inherit'};
  width: ${({size}:Props) => size}px;
  height: ${({size}:Props) => size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerContainer = styled.span`
  display: block;
  text-transform: uppercase;
`;
