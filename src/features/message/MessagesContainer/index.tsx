import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectMessages,
   selectParticipants,
   setParticipants,
   fetchConversationMessages,
} from '../messageSlice';
import { selectLogin } from 'features/login/loginSlice';
import MessageList from '../MessageList';
import Spinner from 'components/Spinner';
import {
   selectCurrentConversationId,
   selectCurrentConversation,
} from 'features/conversation/conversationSlice';
import { colorSpectrumArray, SpectrumColor } from 'shared/theme/@types';
import UserApi from 'shared/Api/UserApi';

interface Participant {
   id: number;
   name: string;
   color: SpectrumColor; //TODO:
   isOwner: boolean;
}

const MessagesContainer = () => {
   //REDUX:
   const messages = useSelector(selectMessages);
   const currentUser = useSelector(selectLogin);
   //  const participants = useSelector(selectParticipants);
   const currentConversation = useSelector(selectCurrentConversation);
   const conversationId = useSelector(selectCurrentConversationId);
   const dispatch = useDispatch();
   //  const [participants, setParticipants] = useState<Participant[]>([]);
   useEffect(() => {
      if (conversationId) dispatch(fetchConversationMessages({ conversationId }));
   }, [conversationId, dispatch]);

   //  useEffect(() => {
   //     if (currentUser.id && messages.length) {
   //       console.log('useEffect: participants')
   //        const updatedParticipants = generateParticipants(
   //           messages,
   //           currentUser.id,

   //        );
   //        dispatch(setParticipants(updatedParticipants));
   //     }
   //  }, [conversationId, currentUser.id, dispatch, messages]);

   const [participants, setParticipants] = useState<Participant[]>([]);

   useEffect(() => {
      if (currentConversation) {
         const userApi = new UserApi();
         const colors = colorSpectrumArray;
         let colorsIndex = -1;
         const conversationUsers = [];
         currentConversation.users.forEach((user) => {
            colorsIndex++;
            if (colorsIndex >= colors.length) colorsIndex = 0;
            userApi.fetchUserNameById(user.userid).then((result) => {
               const newParticipants = [
                  ...participants,
                  {
                     id: user.userid,
                     name: result,
                     color: colors[colorsIndex],
                     isOwner: user.userid === currentUser.id,
                  },
               ];
               setParticipants(newParticipants);
            });
         });
      }
      //  dispatch(setParticipants(participants))
   }, [currentConversation, currentUser.id, participants]);

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
