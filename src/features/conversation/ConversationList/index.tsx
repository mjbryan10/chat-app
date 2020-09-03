import React, { useEffect } from 'react';
import * as S from './styles';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectConversations,
   fetchConversations,
   clearConversations,
   selectConversationStatus,
} from '../conversationSlice';
import ConversationItem from '../ConversationItem';
import { selectLogin } from 'features/login/loginSlice';

const ConversationList = () => {
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
         {status === 'pending' ? 'loading...' : null}
         {currentUserId
            ? conversations.map((conversation) => {
                 const { conversationId } = conversation.conversation;
                 return (
                    <ConversationItem
                       conversation={conversation}
                       key={conversationId}
                       currentUserId={currentUserId}
                    />
                 );
              })
            : null}
      </S.Container>
   );
};

export default ConversationList;
