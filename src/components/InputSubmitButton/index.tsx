import React, { SyntheticEvent } from 'react';
import * as S from './styles';

interface Props {
   value: string;
   disabled?: boolean;
   handleClick?: () => void;
}

const InputSubmitButton: React.FC<Props> = ({ value, disabled = false, handleClick }) => {
   const onClick = (event: SyntheticEvent<HTMLInputElement>) => {
      if (handleClick) {
         event.preventDefault();
         handleClick();
      }
   };
   return (
      <S.Input
         type="submit"
         value={value}
         data-testid="input-submit-button"
         disabled={disabled}
         onClick={onClick}
      />
   );
};

export default InputSubmitButton;
