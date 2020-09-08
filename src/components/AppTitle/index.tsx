import React from 'react';
import * as S from './styles';
import { selectCurrentConversation } from 'features/conversation/conversationSlice';
import { useSelector } from 'react-redux';

const AppTitle = () => {
   const currentConversation = useSelector(selectCurrentConversation);

   const generateTitle = () => {
      const defaultTitle = 'Welcome to Ch@';
      if (!currentConversation) return defaultTitle;
      const { conversation, users } = currentConversation;
      if (conversation.name) return `Ch@: ${conversation.name}`;
      if (users.length <= 2) return 'Private Ch@';
      return defaultTitle;
   };
   return (
      <S.Title>
         {generateTitle()}
      </S.Title>
   );
};

export default AppTitle;
