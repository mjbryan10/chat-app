import styled, { ThemeProps, Theme } from 'styled-components';

//Inspiration from:
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_switch

export const Input = styled.input`
   opacity: 0;
   width: 0;
   height: 0;
`;

export const Slider = styled.span`
   position: absolute;
   cursor: pointer;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: #ccc;
   -webkit-transition: 0.4s;
   transition: 0.4s;

   &:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background: ${({ theme }: ThemeProps<Theme>) => theme.background.buttonPrimary};
      -webkit-transition: 0.4s;
      transition: 0.4s;
      ${Input}:checked + & {
         -webkit-transform: translateX(26px);
         -ms-transform: translateX(26px);
         transform: translateX(26px);
      }
      border: ${({ theme }: ThemeProps<Theme>) => theme.border};
   }

   ${Input}:checked + & {
      background: ${({ theme }: ThemeProps<Theme>) => theme.background.inputField};
   }
   ${Input}:focus + & {
      box-shadow: 0 0 1px #2196f3;
   }
`;

export const Switch = styled.label`
   position: relative;
   display: inline-block;
   width: 60px;
   height: 34px;
   border: ${({ theme }: ThemeProps<Theme>) => theme.border};
`;

export const Container = styled.div`
   display: flex;
   flex-flow: row nowrap;
`;
