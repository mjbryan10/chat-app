import React, { useState, FC } from 'react';
import InputTextFieldWithLabel from '../../../components/InputTextFieldWithLabel';
import InputSubmitButton from '../../../components/InputSubmitButton';
import * as S from './styles';
import { useSelector } from 'react-redux';
import { selectLogin } from '../loginSlice';

interface Props {
   id: number;
   name: string;
   handleSubmit?: () => void;
}

/**
 * A React functional component for rendering a login form.
 * @note As this production is for demo purposes, the login
 * credentials are being passed as props. In future they
 * should been handled within the component.
 * @param id The users ID
 * @param name The username
 * @param handleSubmit The submit handler that will be called on form submission
 */
const LoginForm: FC<Props> = ({ id, name, handleSubmit }) => {
   //REDUX:
   const { isAuthenticated } = useSelector(selectLogin);

   //STATE: @see note above.
   const [idState, setIdState] = useState(id);
   const [nameState, setNameState] = useState(name);

   //METHODS:
   const onSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (handleSubmit) handleSubmit();
   };

   return (
      <S.Form action="submit" onSubmit={onSubmit} data-testid="login-form">
         <InputTextFieldWithLabel
            handleChange={(value: string) => setNameState(value)}
            labelValue="Name"
            initialValue={nameState}
            disabled
         />
         <InputTextFieldWithLabel
            handleChange={(value: string) => setIdState(parseInt(value))}
            labelValue="ID"
            initialValue={idState.toString()}
            disabled
         />
         {isAuthenticated === false ? (
            <S.ErorrText>
               It appears we were unable to log you in with those details, please try
               again later.
            </S.ErorrText>
         ) : null}
         <InputSubmitButton value="Log in" />
      </S.Form>
   );
};

export default LoginForm;
