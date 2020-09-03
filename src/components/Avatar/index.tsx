import React, { FC, useMemo } from 'react';
import * as S from './styles';

interface Props {
   text?: string;
}

export function stringToCaptialLetter(text: string = 'anonymous'): string {
  return text.charAt(0).toUpperCase();
}

const Avatar: FC<Props> = ({ text }) => {
  const letterMemo = useMemo(() => stringToCaptialLetter(text), [text])
   return (
      <S.Container>
         <S.InnerContainer data-testid="avatar-inner-container">{letterMemo}</S.InnerContainer>
      </S.Container>
   );
};

export default Avatar;
