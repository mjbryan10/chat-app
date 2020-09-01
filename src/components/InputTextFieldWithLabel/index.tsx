import React from 'react';
import InputTextField from '../InputTextField';
import {Props as InputProps} from '../InputTextField'

interface Props extends InputProps{
}

const InputTextFieldWithLabel: React.FC<Props> = ({children, ...props}) => {
  return (
    <label>
      {children}
      <InputTextField {...props} />
    </label>
  )
}

export default InputTextFieldWithLabel;