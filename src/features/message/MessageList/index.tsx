import React, { FC, useState } from 'react';
import { Participant } from '../messageSlice';
import MessageItem from '../MessageItem';
import * as S from './styles';
import { Message, TIME_FORMAT } from 'shared/Api/types';
import moment from 'moment';
import MessageDate from '../MessageDate';
import {nanoid} from 'nanoid';

interface Props {
   messages: Message[];
   participants: Participant[];
}

const MessageList: FC<Props> = ({ messages, participants }) => {
   const [keyId] = useState<string>(nanoid(10));
   const dates: string[] = [];
   return (
      <S.Wrapper>
         {messages.map((message, index) => {
            const time = moment(message.timestamp, TIME_FORMAT);
            const date = time.format('DD-MM-YYYY');
            const now = moment();
            const today = moment().format('DD-MM-YYYY');

            const participant = participants.find((user) => user.id === message.senderId);
            if (participant) {
               const isChain =
                  message.senderId === messages[index + 1]?.senderId || false;
               if (dates.includes(date)) {
                  return (
                     <MessageItem
                        key={(message.id+keyId).toString()}
                        messageDetails={message}
                        userDetails={participant}
                        isChainMessage={isChain}
                     />
                  );
               } else {
                  let value = today;
                  dates.push(date);
                     switch (now.diff(time, 'days')) {
                        case 0:
                           value = 'Today';
                           break;
                        case 1:
                           value = 'Yesterday';
                           break;
                        default:
                           value = today;
                           break;
                     }
                  return (
                     <>
                        <MessageDate value={value} key={value+message.id} />
                        <MessageItem
                           key={keyId+message.id}
                           messageDetails={message}
                           userDetails={participant}
                           isChainMessage={isChain}
                        />
                     </>
                  );
               }
            }
            return <p>Trouble loading message, try again later.</p>;
         })}
      </S.Wrapper>
   );
};

export default MessageList;
