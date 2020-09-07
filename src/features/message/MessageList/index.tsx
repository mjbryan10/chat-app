import React, { FC } from 'react';
import { Message } from 'Api/@types';
import { Participant } from '../messageSlice';
import MessageItem from '../MessageItem';
import * as S from './styles';

interface Props {
   messages: Message[];
   participants: Participant[];
}

const MessageList: FC<Props> = ({ messages, participants }) => {
   return (
      <S.Wrapper>
         {messages.map((message, index) => {
            const participant = participants.filter(
               (user) => user.id === message.senderId
            );
            const isChain = (message.senderId === messages[index+1].senderId);
            return (
               <MessageItem
                  key={message.id}
                  messageDetails={message}
                  userDetails={participant}
                  isChainMessage={isChain}
               />
            );
         })}
      </S.Wrapper>
   );
};

export default MessageList;
