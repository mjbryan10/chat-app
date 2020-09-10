import styled, { ThemeProps, Theme } from 'styled-components';

export const Container = styled.div<ThemeProps<Theme>>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({theme}) => theme.border}
`;