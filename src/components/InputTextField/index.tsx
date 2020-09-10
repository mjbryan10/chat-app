import React, { useState, FC } from 'react';
import * as S from './styles';

export interface Props {
   disabled?: boolean;
   placeholder?: string;
   initialValue?: string;
   handleChange?: (value: string) => void;
}

const InputTextField: FC<Props> = ({
   disabled = false,
   placeholder = '',
   initialValue = '',
   handleChange,
}) => {
   const [value, setValue] = useState(initialValue);

   const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
      event.preventDefault();
      const { value } = event.currentTarget;
      if (disabled) return;
      setValue(value);
      if (handleChange) handleChange(value);
   };
   return (
      <S.Input
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         data-testid="input-text-field"
      />
   );
};

export default InputTextField;
