import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectMessages,
   fetchConversationMessages,
   Participant,
   fetchNewMessages,
} from '../messageSlice';
import { selectLogin } from 'features/login/loginSlice';
import MessageList from '../MessageList';
import Spinner from 'components/Spinner';
import {
   selectCurrentConversationId,
   selectCurrentConversation,
} from 'features/conversation/conversationSlice';
import { colorSpectrumArray } from 'shared/Types/theme.types';
import UserApi from 'shared/Api/UserApi';
import MessageCreator from '../MessageCreator';
import MessageApi from 'shared/Api/MessageApi';

const MessagesContainer = () => {
   //REDUX:
   const messages = useSelector(selectMessages);
   const currentUser = useSelector(selectLogin);
   const currentConversation = useSelector(selectCurrentConversation);
   const conversationId = useSelector(selectCurrentConversationId);
   const dispatch = useDispatch();

   useEffect(() => {
      //Fetches the messages
      if (conversationId) dispatch(fetchConversationMessages({ conversationId }));
   }, [conversationId, dispatch]);

   const [participants, setParticipants] = useState<Participant[]>([]);

   useEffect(() => {
      if (currentConversation) {
         const userApi = new UserApi();
         const colors = colorSpectrumArray;
         let colorsIndex = -1;
         currentConversation.users.forEach((user) => {
            colorsIndex++;
            if (colorsIndex >= colors.length) colorsIndex = 0;
            const newParticipant = {
               id: user.userid,
               name: 'Anonymous',
               color: colors[colorsIndex],
               isOwner: user.userid === currentUser.id,
            };
            userApi
               .fetchUserNameById(user.userid)
               .then((result) => {
                  newParticipant.name = result;
               })
               .catch((error) => {
                  console.error(error);
               })
               .finally(() => {
                  setParticipants((oldState) => [...oldState, newParticipant]);
               });
         });
      }
   }, [currentConversation, currentUser.id]);

   const onMessagePost = (value: string) => {
      const messageApi = new MessageApi();
      if (conversationId && currentUser.id && currentUser.isAuthenticated) {
         messageApi.postMessage(conversationId, currentUser.id, value);
      }
      if (conversationId && messages.length) {
         setTimeout(() => {
            dispatch(
               fetchNewMessages({
                  conversationId,
                  lastMessageId: messages[messages.length - 1].conversationid,
               })
            );
         }, 300);
      }
   };
   return (
      <div>
         {messages.length && participants.length ? (
            <MessageList messages={messages} participants={participants} />
         ) : (
            <Spinner />
         )}
         <div></div>

         <MessageCreator
            handleSubmit={onMessagePost}
            disabled={currentUser && conversationId ? true : false}
         />
      </div>
   );
};

export default MessagesContainer;