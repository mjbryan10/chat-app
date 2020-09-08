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
// import { colorSpectrumArray } from 'theme/@types';

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

   //TODO: Pass color onto ConversationItem without causes re-render crash
   // const colors = colorSpectrumArray; 
   // let colorIndex = -1;

   return (
      <S.Container>
         <S.Header>Conversations</S.Header>
         {status === 'pending' ? 'loading...' : null}
         {currentUserId
            ? conversations.map((conversation) => {
                 const { conversationId } = conversation.conversation;
               // colorIndex++
               // if (colorIndex >= colors.length) colorIndex = 0;
                 return (
                    <ConversationItem
                       conversation={conversation}
                       key={conversationId}
                    />
                 );
              })
            : null}
      </S.Container>
   );
};

export default ConversationList;
