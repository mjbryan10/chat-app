import React from 'react'
import { setNavigationState } from '../navigationSlice';
import { useDispatch } from 'react-redux';
import { clearCurrentConversation } from 'features/conversation/conversationSlice';
import { resetMessages } from 'features/message/messageSlice';
import ButtonNavbarIcon from 'components/ButtonNavbarIcon';
import {IoMdArrowBack} from 'react-icons/io'

const NavigationConversationsButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setNavigationState('index'));
    dispatch(clearCurrentConversation());
    dispatch(resetMessages());
  }
  return (
    <ButtonNavbarIcon handleClick={handleClick}>
      <IoMdArrowBack />
    </ButtonNavbarIcon>
  )
}

export default NavigationConversationsButton
