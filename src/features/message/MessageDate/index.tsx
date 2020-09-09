import React, { FC } from 'react'
import * as S from './styles';

interface Props {
  value: string;
}
const MessageDate: FC<Props> = ({value}) => {
  return (
    <S.MessageDate>
      {value}
    </S.MessageDate>
  )
}

export default MessageDate
