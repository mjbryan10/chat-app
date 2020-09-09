import React, { FC, SyntheticEvent } from 'react';
import * as S from './styles';
import { ThemeColor } from 'shared/theme/types';

export interface Props {
   height?: number;
   width?: number;
   color?: ThemeColor;
   handleClick?: () => void;
}

const ButtonNavbarIcon: FC<Props> = ({ children, height, width, color, handleClick }) => {

   const onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (handleClick) handleClick();
   };
   return (
      <S.Button height={height} width={width} color={color} onClick={onClick}>
         {children}
      </S.Button>
   );
};

export default ButtonNavbarIcon;
