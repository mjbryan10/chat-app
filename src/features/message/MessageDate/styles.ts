import styled, { ThemeProps, Theme } from 'styled-components';

export const MessageDate = styled.div<ThemeProps<Theme>>`
  max-width: 9em;
  margin: 3px auto;
  padding: 0.5rem;
  border: ${({theme})=> theme.border};
  border-radius: 5px;
  background: ${({theme}) => theme.background.page};
  color: ${({theme}) => theme.color.text ?? 'auto'};
  text-align: center;
`;