import React, { useEffect, useState } from 'react';
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

const MessagesContainer = () => {
   //REDUX:
   const messages = useSelector(selectMessages);
   const currentUser = useSelector(selectLogin);
   const currentConversation = useSelector(selectCurrentConversation);
   const conversationId = useSelector(selectCurrentConversationId);
   const loadingStatus = useSelector(selectMessageLoadingStatus);
   const dispatch = useDispatch();

   /**
    * Initial message fetching and population
    */
   useEffect(() => {
      //Fetches the messages
      if (conversationId) dispatch(fetchConversationMessages({ conversationId }));
   }, [conversationId, dispatch]);

   /**
    * Systematic message updating
    *
    * Polls the database for new messages at every interval.
    */
   useEffect(() => {
      //TODO: Uncomment
      //    const retreiveMessages = () => {
      //    if (conversationId && messages.length) {
      //       dispatch(
      //          fetchNewMessages({
      //             conversationId,
      //             lastMessageId: messages[messages.length - 1].id,
      //          })
      //       );
      //    } else if (conversationId) {
      //       dispatch(fetchConversationMessages({ conversationId }));
      //    }
      // };
      //    const refreshMessages = setInterval(() => {
      //       console.log('refreshed');
      //          retreiveMessages();
      //    }, 5000);
      //    return () => {
      //       clearInterval(refreshMessages);
      //    };
   }, [conversationId, dispatch, messages]);

   /**
    * Local state for holding conversation Participants details.
    */
   const [participants, setParticipants] = useState<Participant[]>([]);

   /**
    * Updates the participants state should the current conversation
    * or current user change.
    */
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
      <div>
         {messages.length && participants.length ? (
            <MessageList messages={messages} participants={participants} />
         ) : loadingStatus !== 'idle' ? (
            <p>No messages yet.</p>
         ) : null}
         {loadingStatus === 'pending' ? <Spinner /> : null}

         <MessageCreator handleSubmit={onMessagePost} disabled={isDisabled} />
      </div>
   );
};

export default MessagesContainer;
