import React, { FC } from 'react';
import { Message } from 'shared/Api/@types';
import useFetchUsernameById from 'shared/hooks/useFetchUsernameById';
import MessageItem from '../MessageItem';
import moment from 'moment';
import { ThemeColor } from 'shared/theme/@types';


interface Props {
   message: Message;
   isChainMessage?: boolean;
   color: ThemeColor;
   
}

const MessageContainer: FC<Props> = ({ message, isChainMessage = false, color="owner" }) => {
   const [username] = useFetchUsernameById(message.senderId);
   const time = moment(message.timestamp, 'YYYY-MM-DD HH:mm:ss').format('hh:mm');
   return (
      <>
         {message && username ? (
            <MessageItem
               messageText={message.message}
               username={username}
               isChainMessage={isChainMessage}
               time={time}
               color={color}
            />
         ) : null}
      </>
   );
};

export default MessageContainer;
