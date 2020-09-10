import styled, { ThemeProps, Theme } from 'styled-components';

export const Container = styled.div<ThemeProps<Theme>>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: ${({theme}) => theme.border};
  padding: 0.5rem;
  color: ${({theme}) => theme.color.text ?? 'inherit'};
  border: ${({theme}) => theme.border ?? 'solid 1.5px'};
  border-color: ${({theme}) => theme.color.text ?? 'inherit'};
  &:hover {
    cursor: pointer;
  }
`;