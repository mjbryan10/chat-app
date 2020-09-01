import React, { useState } from 'react';
import InputTextFieldWithLabel from '../../../components/InputTextFieldWithLabel';
import InputSubmitButton from '../../../components/InputSubmitButton';
import * as S from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin, loginUser } from '../loginSlice';

const Login = ({ ...children }) => {
   const { isAuthenticated } = useSelector(selectLogin);
   const dispatch = useDispatch();

   const [name, setName] = useState('');
   const [id, setId] = useState(0);

   const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      dispatch(loginUser({ id, name }));
   };

   if (isAuthenticated) return <>{children}</>;
   return (
      <S.Container>
         <S.Form action="submit" onSubmit={handleSubmit} data-testid="login-form">
            <InputTextFieldWithLabel
               handleChange={(value: string) => setName(value)}
               labelValue="Name"
               initialValue="Wessel"
            />
            <InputTextFieldWithLabel
               handleChange={(value: string) => setId(parseInt(value))}
               labelValue="ID"
               initialValue="1"
            />
            {isAuthenticated === false
               ? 'It appears we were unable to log you in with those details, please try again later'
               : null}
            <InputSubmitButton value="Log in" />
         </S.Form>
      </S.Container>
   );
};

export default Login;
