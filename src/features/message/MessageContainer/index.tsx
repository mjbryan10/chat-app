import React, { FC } from 'react';
import { Message } from 'Api/@types';
import useFetchUsernameById from 'hooks/useFetchUsernameById';
import MessageItem from '../MessageItem';

interface Props {
   message: Message;
   isChainMessage?: boolean;
}

const MessageContainer: FC<Props> = ({ message, isChainMessage = false }) => {
   const [username] = useFetchUsernameById(message.senderId);

   return (
      <>
         {message && username ? (
            <MessageItem
               message={message}
               username={username}
               isChainMessage={isChainMessage}
            />
         ) : null}
      </>
   );
};

export default MessageContainer;
