import React, { FC, useMemo } from 'react';
import * as S from './styles';
import { ThemeColor } from 'styled-components';

interface Props {
   text?: string;
   size?: number
   color?: ThemeColor;
}

export function stringToCaptialLetter(text: string): string {
  return text.charAt(0).toUpperCase();
}

const Avatar: FC<Props> = ({ text = 'anonymous', size = 50, color = "text" }) => {
  const letterMemo = useMemo(() => stringToCaptialLetter(text), [text])
   return (
      <S.Container size={size} color={color}>
         <S.InnerContainer size={size} data-testid="avatar-inner-container">{letterMemo}</S.InnerContainer>
      </S.Container>
   );
};

export default Avatar;
