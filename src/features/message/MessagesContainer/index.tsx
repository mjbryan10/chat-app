import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessages, Participant, selectParticipants, setParticipants, messageSlice } from '../messageSlice';
import { selectLogin } from 'features/login/loginSlice';
import MessageList from '../MessageList';
import Spinner from 'components/Spinner';
import { generateParticipants } from './helpers';

const MessagesContainer = () => {
  //REDUX:
   const messages = useSelector(selectMessages);
   const currentUser = useSelector(selectLogin);
   const participants = useSelector(selectParticipants);
   const dispatch = useDispatch();
  //  const [participants, setParticipants] = useState<Participant[]>([]);
   useEffect(() => {
      if (currentUser.id && messages.length) {
         const updatedParticipants = generateParticipants(
            messages,
            currentUser.id,
            participants
         );
         dispatch(setParticipants(updatedParticipants));
      }
   }, [currentUser.id, dispatch, messages, participants]);

   return (
      <div>
         {messages.length && participants.length ? (
            <MessageList messages={messages} participants={participants} />
         ) : (
            <Spinner />
         )}
         <div></div>

         {/* <MessageCreator /> */}
      </div>
   );
};

export default MessagesContainer;
