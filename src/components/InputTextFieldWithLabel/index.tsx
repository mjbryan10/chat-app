import React from 'react';
import InputTextField from '../InputTextField';
import {Props as InputProps} from '../InputTextField'
import * as S from './styles';

interface Props extends InputProps{
  labelValue: string;
}

const InputTextFieldWithLabel: React.FC<Props> = ({labelValue, ...props}) => {
  return (
    <S.Label>
      {labelValue}
      <InputTextField {...props} />
    </S.Label>
  )
}

export default InputTextFieldWithLabel;