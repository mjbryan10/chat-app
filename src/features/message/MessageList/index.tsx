import React, { FC } from 'react';
import { Message } from 'shared/Api/@types';
import { Participant } from '../messageSlice';
import MessageItem from '../MessageItem';
import * as S from './styles';
import Spinner from 'components/Spinner';

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
               const isChain = message.senderId === messages[index + 1].senderId;
               return (
                  <MessageItem
                     key={message.id}
                     messageDetails={message}
                     userDetails={participant}
                     isChainMessage={isChain}
                  />
               );
            }
            return <Spinner />; 
         })}
      </S.Wrapper>
   );
};

export default MessageList;
