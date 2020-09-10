import React from 'react';
import { logoutUser } from '../loginSlice';
import { useDispatch } from 'react-redux';
import ButtonNavbarIcon from 'components/ButtonNavbarIcon';
import { IoMdPower } from 'react-icons/io';
import Cookies from 'js-cookie';

const LogoutButton = () => {
   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch(logoutUser());
      Cookies.remove('auth_token');
   };
   return (
      <ButtonNavbarIcon handleClick={handleClick}>
         <IoMdPower />
      </ButtonNavbarIcon>
   );
};

export default LogoutButton;
