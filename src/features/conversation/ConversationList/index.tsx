import React, { FC } from 'react';
import ConversationItem from '../ConversationItem';
import { colorSpectrumArray } from 'shared/theme/types';
import { Conversation } from 'shared/Api/types';

interface Props {
   conversations: Conversation[];
}
const ConversationList: FC<Props> = ({ conversations }) => {
   const colors = colorSpectrumArray;
   let colorIndex = -1;
   return (
      <>
         {conversations.map((conversation) => {
            const { conversationId } = conversation.conversation;
            colorIndex++;
            return (
               <ConversationItem
                  conversation={conversation}
                  key={conversationId}
                  color={colors[colorIndex]}
               />
            );
         })}
      </>
   );
};

export default ConversationList;
