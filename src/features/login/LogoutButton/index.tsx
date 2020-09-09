import React, { SyntheticEvent } from 'react'
import { logoutUser } from '../loginSlice';
import { useDispatch } from 'react-redux';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(logoutUser());
  }
  return (
    <button onClick={onClick}>Logout</button>
  )
}

export default LogoutButton
