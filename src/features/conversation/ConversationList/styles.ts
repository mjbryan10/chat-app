import styled, {ThemeProps, Theme} from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 400px;
  min-width: 300px;
`;

export const Header = styled.h2<ThemeProps<Theme>>`
  text-transform: uppercase;
  color: ${({theme}) => theme.color.text ?? 'inherit'};
  margin: 1rem auto;
`;