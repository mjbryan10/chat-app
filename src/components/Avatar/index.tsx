import React, { FC, useMemo } from 'react';
import * as S from './styles';
import { ThemeColor } from 'styled-components';
import {stringToCaptialLetter} from './helpers';

export interface Props {
   title?: string;
   size?: number
   color?: ThemeColor;
}



const Avatar: FC<Props> = ({ title = 'anonymous', size = 50, color = "text" }) => {
  const letterMemo = useMemo(() => stringToCaptialLetter(title), [title])
   return (
      <S.Container size={size} color={color}>
         <S.InnerContainer size={size} data-testid="avatar-inner-container">{letterMemo}</S.InnerContainer>
      </S.Container>
   );
};

export default Avatar;
