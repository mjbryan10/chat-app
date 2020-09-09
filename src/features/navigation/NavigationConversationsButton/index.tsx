import React, { SyntheticEvent } from 'react'
import { setNavigationState } from '../navigationSlice';
import { useDispatch } from 'react-redux';
import { clearCurrentConversation } from 'features/conversation/conversationSlice';
import { resetMessages } from 'features/message/messageSlice';

const NavigationConversationsButton = () => {
  const dispatch = useDispatch();
  const onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setNavigationState('conversation'));
    dispatch(clearCurrentConversation());
    dispatch(resetMessages());
  }
  return (
    <button onClick={onClick} />
  )
}

export default NavigationConversationsButton
