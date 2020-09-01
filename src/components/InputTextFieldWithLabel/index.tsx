import React from 'react';
import InputTextField from '../InputTextField';
import {Props as InputProps} from '../InputTextField'

interface Props extends InputProps{
  labelValue: string;
}

const InputTextFieldWithLabel: React.FC<Props> = ({labelValue, ...props}) => {
  return (
    <label>
      {labelValue}
      <InputTextField {...props} />
    </label>
  )
}

export default InputTextFieldWithLabel;