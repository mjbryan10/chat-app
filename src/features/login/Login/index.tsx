import React, { useState, FC, useEffect } from 'react';
import InputTextFieldWithLabel from '../../../components/InputTextFieldWithLabel';
import InputSubmitButton from '../../../components/InputSubmitButton';
import * as S from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin, loginUser, logoutUser } from '../loginSlice';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import Spinner from 'components/Spinner';

const secret = process.env.REACT_APP_JWT_SECRET;

const Login: FC = () => {
   const { isAuthenticated } = useSelector(selectLogin);
   const dispatch = useDispatch();

   const [status, setStatus] = useState<'loading' | 'ready'>('loading');
   const [name, setName] = useState('Wessel');
   const [id, setId] = useState(1);

   useEffect(() => {
      const cookieAuth = Cookies.get('auth_token');
      const resetLogin = () => {
         Cookies.remove('auth_token');
         dispatch(logoutUser());
      };
      if (cookieAuth && secret) {
         try {
            const decoded = jwt.verify(cookieAuth, secret) as
               | { [key: string]: any }
               | string;
            if (typeof decoded !== 'object') throw new Error('Token invalid.');
            if (decoded?.data?.id && decoded?.data?.name) {
               dispatch(loginUser({ id: decoded.data.id, name: decoded.data.name }));
            } else {
               throw new Error('Unable to decode token.');
            }
         } catch {
            resetLogin();
         }
      } else if (cookieAuth) {
         resetLogin();
      } else {
         setStatus('ready');
      }
   }, [dispatch]);

   const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      dispatch(loginUser({ id, name }));
      if (secret) {
         const token = jwt.sign({ data: { id, name } }, secret, { expiresIn: '7d' });
         Cookies.set('auth_token', token, { expires: 7 });
      }
   };

   return (
      <S.Container>
         {status === 'loading' ? (
            <Spinner />
         ) : (
            <S.Form action="submit" onSubmit={handleSubmit} data-testid="login-form">
               <InputTextFieldWithLabel
                  handleChange={(value: string) => setName(value)}
                  labelValue="Name"
                  initialValue="Wessel"
                  disabled
               />
               <InputTextFieldWithLabel
                  handleChange={(value: string) => setId(parseInt(value))}
                  labelValue="ID"
                  initialValue="1"
                  disabled
               />
               {isAuthenticated === false ? (
                  <S.ErorrText>
                     It appears we were unable to log you in with those details, please
                     try again later.
                  </S.ErorrText>
               ) : null}
               <InputSubmitButton value="Log in" />
            </S.Form>
         )}
      </S.Container>
   );
};

export default Login;
