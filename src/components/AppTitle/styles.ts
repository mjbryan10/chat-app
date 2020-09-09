import styled, { ThemeProps, Theme } from 'styled-components';

export const Title = styled.h1<ThemeProps<Theme>>`
  color: ${({theme}) => theme.color.text ?? 'auto'}
`;