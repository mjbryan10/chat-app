import React, { FC } from 'react';
import * as S from './styles';
import { ThemeColor } from 'styled-components';
// import UserApi from 'Api/UserApi';
export interface Props {
   messageText: string;
   username: string;
   isChainMessage?: boolean;
   color: ThemeColor;
   time: string;
}

/**
 * A React Function Component responsible for rendering a message from the chat API.
 * @param message A message object from the API
 * @param isChaind A `boolean` to indicate if the message is part of a chain
 */
const MessageItem: FC<Props> = ({
   messageText,
   username,
   isChainMessage = false,
   color,
   time,
}) => {
   return (
      <S.Container color={color} isChained={isChainMessage}>
         <S.Header>
            <S.Detail>{username}</S.Detail>
            <S.Detail>{time}</S.Detail>
         </S.Header>
         <S.Body>{messageText}</S.Body>
      </S.Container>
   );
};

export default MessageItem;
