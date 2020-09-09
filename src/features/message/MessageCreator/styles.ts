import styled, { ThemeProps, Theme } from 'styled-components';

export const TextArea = styled.textarea<ThemeProps<Theme>>`
   min-height: 75px;
   font-family: inherit;
   font-size: 1rem;
   padding: 0.3rem;
   /* min-width: 80%; */
   flex-grow: 1;
   margin: 15px 15px 0 0;
   border-radius: 0;
   border: ${({ theme }) => theme.border};
   background: ${({ theme }) => theme.background.inputField};
   color: ${({ theme }) => theme.color.text ?? 'inherit'};
   &::placeholder {
      color: ${({ theme }) => theme.color.text ?? 'inherit'};
      opacity: 0.6;
   }
`;

export const Form = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
`;