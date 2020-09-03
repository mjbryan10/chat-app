import React from 'react';
import * as S from './styles';

interface Props {
  value: string;
}

const InputSubmitButton: React.FC<Props> = ({value}) => {
  return (
    <S.Input type="submit" value={value} data-testid="input-submit-button" />
  )
}

export default InputSubmitButton;