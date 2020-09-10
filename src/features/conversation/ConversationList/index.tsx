import React, { FC, useState } from 'react';
import ConversationItem from '../ConversationItem';
import { colorSpectrumArray } from 'shared/theme/types';
import { Conversation } from 'shared/Api/types';
import { nanoid } from '@reduxjs/toolkit';

interface Props {
   conversations: Conversation[];
}
const ConversationList: FC<Props> = ({ conversations }) => {
   const [keyId] = useState(nanoid(5));
   const colors = colorSpectrumArray;
   let colorIndex = -1;
   return (
      <>
         {conversations.map((conversation) => {
            const { conversationId } = conversation.conversation;
            colorIndex++;
            if(colorIndex >= colorSpectrumArray.length) colorIndex = 0;
            return (
               <ConversationItem
                  conversation={conversation}
                  key={conversationId+keyId}
                  color={colors[colorIndex]}
               />
            );
         })}
      </>
   );
};

export default ConversationList;
