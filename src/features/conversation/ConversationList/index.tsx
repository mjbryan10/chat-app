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
import { colorSpectrumArray } from 'shared/theme/types';

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


   const colors = colorSpectrumArray;
   let colorIndex = -1;
   return (
      <S.Container>
         <S.Header>Conversations</S.Header>
         {status === 'pending' ? 'loading...' : null}
         {currentUserId
            ? conversations.map((conversation) => {
                 const { conversationId } = conversation.conversation;
                 colorIndex++;
                 return (
                    <ConversationItem
                       conversation={conversation}
                       key={conversationId}
                       color={colors[colorIndex]}
                    />
                 );
              })
            : null}
      </S.Container>
   );
};

export default ConversationList;
