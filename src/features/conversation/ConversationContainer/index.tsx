import React, { useEffect } from 'react';
import * as S from './styles';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectConversations,
   fetchConversations,
   clearConversations,
   selectConversationStatus,
} from '../conversationSlice';
import { selectLogin } from 'features/login/loginSlice';
import Spinner from 'components/Spinner';
import ConversationList from '../ConversationList';

const ConversationContainer = () => {
   const conversations = useSelector(selectConversations);
   const { id: currentUserId } = useSelector(selectLogin);
   const status = useSelector(selectConversationStatus);
   const dispatch = useDispatch();
   useEffect(() => {
      if (currentUserId) {
         dispatch(fetchConversations(currentUserId));
      }
      return () => {
         dispatch(clearConversations);
      };
   }, [currentUserId, dispatch]);

   return (
      <S.Container>
         <S.Header>Conversations</S.Header>
         {status === 'pending' ? (
            <Spinner />
         ) : (
            <ConversationList conversations={conversations} />
         )}
      </S.Container>
   );
};

export default ConversationContainer;
