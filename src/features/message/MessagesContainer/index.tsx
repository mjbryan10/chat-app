import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectMessages,
   fetchConversationMessages,
   Participant,
   fetchNewMessages,
   selectMessageLoadingStatus,
} from '../messageSlice';
import { selectLogin } from 'features/login/loginSlice';
import MessageList from '../MessageList';
import Spinner from 'components/Spinner';
import {
   selectCurrentConversationId,
   selectCurrentConversation,
} from 'features/conversation/conversationSlice';
import { colorSpectrumArray } from 'shared/theme/types';
import UserApi from 'shared/Api/UserApi';
import MessageCreator from '../MessageCreator';
import MessageApi from 'shared/Api/MessageApi';
import * as S from './styles';
import { ThemeColor } from 'styled-components';

const MessagesContainer = () => {
   //REDUX:
   const messages = useSelector(selectMessages);
   const currentUser = useSelector(selectLogin);
   const currentConversation = useSelector(selectCurrentConversation);
   const conversationId = useSelector(selectCurrentConversationId);
   const loadingStatus = useSelector(selectMessageLoadingStatus);
   const dispatch = useDispatch();

   //STATE:
   /**
    * Local state for holding conversation Participants details.
    */
   const [participants, setParticipants] = useState<Participant[]>([]);

   //EFFECTS:
   /**
    * Initial message fetching and population
    */
   useEffect(() => {
      //Fetches the messages
      if (conversationId) dispatch(fetchConversationMessages({ conversationId }));

      // if(messageDisplayRef)
      // messageDisplayRef.current.scr
   }, [conversationId, dispatch]);

   /**
    * Systematic message updating
    *
    * Polls the database for new messages at every interval.
    */
   useEffect(() => {
      const retreiveMessages = () => {
         if (conversationId && messages.length) {
            dispatch(
               fetchNewMessages({
                  conversationId,
                  lastMessageId: messages[messages.length - 1].id,
               })
            );
         } else if (conversationId) {
            dispatch(fetchConversationMessages({ conversationId }));
         }
      };
      const refreshMessages = setInterval(() => {
         retreiveMessages();
      }, 3000);
      return () => {
         clearInterval(refreshMessages);
      };
   }, [conversationId, dispatch, messages]);

   /**
    * Updates the participants state should the current conversation
    * or current user change.
    */
   useEffect(() => {
      if (currentConversation) {
         const userApi = new UserApi();
         const colors = colorSpectrumArray;
         let colorsIndex = 0;
         currentConversation.users.forEach((user) => {
            const isOwner = user.userid === currentUser.id;
            const color: ThemeColor = isOwner ? 'owner' : colors[colorsIndex];
            if (!isOwner) colorsIndex++;
            if (colorsIndex >= colors.length) colorsIndex = 0;
            const newParticipant = {
               id: user.userid,
               name: 'Anonymous',
               color,
               isOwner,
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

   //--- Logic responsible for scroll to bottom
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const scrollToBottom = () => {
      if (messagesEndRef.current !== null) {
         messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   };
   useLayoutEffect(() => scrollToBottom(), [messages]);
   //---

   //METHODS:
   /**
    * An on submit handler for handling a form submission for a new message.
    *
    * Posts the message to the API and triggers a request to update the messages state.
    * @param value A string value from the message creator's textarea.
    */
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
                  lastMessageId: messages[messages.length - 1].id,
               })
            );
         }, 300);
      } else if (conversationId) {
         setTimeout(() => {
            dispatch(fetchConversationMessages({ conversationId }));
         }, 300);
      }
   };

   /**
    * Informs if creator should be disabled.
    *
    * i.e. if there isn't the information availalbe to make a valid message post.
    */
   const isDisabled =
      conversationId && currentUser.id && currentUser.isAuthenticated ? false : true;

   return (
      <S.Container>
         <S.MessagesDisplay>
            {messages.length && participants.length ? (
               <MessageList messages={messages} participants={participants} />
            ) : loadingStatus !== 'idle' ? (
               <S.NoMessageNotice>No messages yet</S.NoMessageNotice>
            ) : null}
            {loadingStatus === 'pending' ? (
               <S.LoadingContainer>
                  <Spinner />
               </S.LoadingContainer>
            ) : null}
            <div ref={messagesEndRef} />
         </S.MessagesDisplay>
         <MessageCreator handleSubmit={onMessagePost} disabled={isDisabled} />
      </S.Container>
   );
};

export default MessagesContainer;
