import React, { FC, useMemo } from 'react';
import * as S from './styles';
import { Message } from 'shared/Api/types';
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
   const { color, isOwner, name } = userDetails;
   const { timestamp, message } = messageDetails;
   const time = useMemo(
      () => moment.utc(timestamp, 'YYYY-MM-DD HH:mm:ss').local().format('HH:mm'),
      [timestamp]
   );
   return (
      <S.Container color={color} isChained={isChainMessage} isOwner={isOwner}>
         <S.Header color={color}>
            <S.Detail>{isOwner ? 'You' : name}</S.Detail>
            <S.Detail>{time}</S.Detail>
         </S.Header>
         <S.Body>{message}</S.Body>
      </S.Container>
   );
};

export default MessageItem;
