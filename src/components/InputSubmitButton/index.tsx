import React from 'react';
import * as S from './styles';

interface Props {
  value: string;
  disabled?: boolean;
}

const InputSubmitButton: React.FC<Props> = ({value, disabled = false}) => {
  return (
    <S.Input type="submit" value={value} data-testid="input-submit-button" disabled={disabled} />
  )
}

export default InputSubmitButton;