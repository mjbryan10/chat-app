import React, { FC } from 'react';
import * as S from './styles';
import { Message } from 'shared/Api/@types';
import { Participant } from '../messageSlice';
import moment from 'moment';

interface Props {
   messageDetails: Message;
   userDetails: Participant;
   isChainMessage?: boolean;
}

/**
 * A React Function Component responsible for rendering a message from the chat API.
 * @param messageDetails A message object from the API, containing details of message
 * @param userDetails Participants information, fetched from API using senderId
 * @param isChainMessage A `boolean` to indicate if the message is part of a chain
 */
const MessageItem: FC<Props> = ({
   messageDetails,
   userDetails,
   isChainMessage = false,
}) => {
   return (
      <S.Container color={userDetails.color} isChained={isChainMessage}>
         <S.Header>
            <S.Detail>{userDetails.name}</S.Detail>
            <S.Detail>
               {moment(messageDetails.timestamp, 'YYYY-MM-DD HH:mm:ss').format('hh:mm')}
            </S.Detail>
         </S.Header>
         <S.Body>{messageDetails.message}</S.Body>
      </S.Container>
   );
};

export default MessageItem;
