import React, { useState, FC, useEffect, SyntheticEvent } from 'react';
import * as S from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../loginSlice';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import Spinner from 'components/Spinner';
import UserListWithSearch from 'features/users/UserListWithSearch';
import LoginForm from '../LoginForm';
import { fetchUsers, selectUsers, selectUsersStatus } from 'features/users/usersSlice';
import { User } from 'shared/Api/types';

const secret = process.env.REACT_APP_JWT_SECRET;

const LoginContainer: FC = () => {
   const users = useSelector(selectUsers);
   const usersLoadingStatus = useSelector(selectUsersStatus);
   const dispatch = useDispatch();

   const [status, setStatus] = useState<'loading' | 'ready'>('loading');
   const [showUsers, setShowUsers] = useState(false);
   const [name, setName] = useState('Wessel');
   const [id, setId] = useState(1);

   useEffect(() => {
      const cookieAuth = Cookies.get('auth_token');
      const resetLogin = () => {
         Cookies.remove('auth_token');
         dispatch(logoutUser());
         setStatus('ready');
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
      } else {
         resetLogin();
      }
   }, [dispatch]);

   const handleSubmit = () => {
      dispatch(loginUser({ id, name }));
      if (secret) {
         const token = jwt.sign({ data: { id, name } }, secret, { expiresIn: '7d' });
         Cookies.set('auth_token', token, { expires: 7 });
      }
   };

   const toggleShowUsers = (event?: SyntheticEvent<HTMLButtonElement>) => {
      if (event) {
         event.preventDefault();
         event.currentTarget.blur();
      }
      if (!showUsers) dispatch(fetchUsers());
      const newState = !showUsers;
      setShowUsers(newState);
   };

   const handleUserClick = (user: User) => {
   console.log('handleUserClick -> user', user);
     
      setName(user.name);
      setId(user.id);
      toggleShowUsers();
   };
   return (
      <S.Container>
         {status === 'loading' ? (
            <Spinner />
         ) : (
            <S.Display>
               {showUsers ? (
                  usersLoadingStatus === 'pending' ? (
                     <Spinner />
                  ) : (
                     <UserListWithSearch
                        users={users}
                        handleItemClick={handleUserClick}
                     />
                  )
               ) : (
                  <LoginForm id={id} name={name} handleSubmit={handleSubmit} />
               )}
               <S.ButtonToggle onClick={toggleShowUsers}>
                  {showUsers ? 'Close' : 'Change user'}
               </S.ButtonToggle>
            </S.Display>
         )}
      </S.Container>
   );
};

export default LoginContainer;
