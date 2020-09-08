import React, { FC } from 'react';
import { Participant } from '../messageSlice';
import MessageItem from '../MessageItem';
import * as S from './styles';
import { Message } from 'shared/Api/types';

interface Props {
   messages: Message[];
   participants: Participant[];
}

const MessageList: FC<Props> = ({ messages, participants }) => {
   return (
      <S.Wrapper>
         {messages.map((message, index) => {
            const participant = participants.find((user) => user.id === message.senderId);
            if (participant) {
               const isChain = message.senderId === messages[index + 1]?.senderId || false;
               return (
                  <MessageItem
                     key={message.id}
                     messageDetails={message}
                     userDetails={participant}
                     isChainMessage={isChain}
                  />
               );
            }
            return <p>Trouble loading message, try again later.</p>; 
         })}
      </S.Wrapper>
   );
};

export default MessageList;
