import styled, { ThemeProps, Theme } from 'styled-components';
import { breakpoint } from 'shared/styles/Variables';

interface ButtonProps extends ThemeProps<Theme> {
   isCreateMode?: boolean;
}

export const Container = styled.div`
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
   width: 100%;
   max-width: 95vw;
   min-height: 60vh;
   height: 100%;
   @media ${breakpoint.tablet} {
      max-width: 350px;
      min-width: 350px;
   }
`;

export const Header = styled.h2<ThemeProps<Theme>>`
   text-transform: uppercase;
   text-align: center;
   color: ${({ theme }) => theme.color.text ?? 'inherit'};
   margin: 1rem auto;
`;

export const Button = styled.button<ButtonProps>`
   margin-top: auto;
   width: 100%;
   display: block;
   padding: 1rem;
   border: ${({ theme }) => theme.border};
   display: flex;
   justify-content: center;
   align-items: center;
   background: ${({ theme, isCreateMode }) =>
      isCreateMode ? theme.background.buttonPrimary : theme.background.conversation};
   color: ${({ theme, isCreateMode }) =>
      isCreateMode ? theme.color.white : theme.color.text};
   &:active {
      background: ${({ theme, isCreateMode }) =>
         isCreateMode
            ? theme.background.buttonPrimary
            : theme.background.conversationSelected};
   }
   &:hover {
      cursor: pointer;
   }
`;

export const ControlsContainer = styled.div`
  margin-top: auto;
  width: 100%;
`;

export const ErrorText = styled.p<ThemeProps<Theme>>`
  color: ${({theme}) => theme.color.danger};
  text-align: center;
`;

export const Display = styled.div`
  display: flex;
   flex-flow: column nowrap;
   align-items: center;
   width: 100%;
   max-height: 60vh;
   height: 100%;
   overflow-y: auto;
`;