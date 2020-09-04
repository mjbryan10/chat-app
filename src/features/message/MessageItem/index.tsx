import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { Message } from 'Api/@types';
import * as S from './styles';
import UserApi from 'Api/UserApi';
export interface Props {
  message: Message;
  isChained?: boolean;
}

/**
 * A React Function Component responsible for rendering a message from the chat API.
 * @param message A message object from the API
 * @param isChaind A `boolean` to indicate if the message is part of a chain
 */
const MessageItem: FC<Props> = ({ message, isChained = false }) => {

  const [name, setName] = useState("");

  useEffect(() => {
    const userApi = new UserApi();
    userApi.fetchUserNameById(message.senderId)
    .then(result => setName(result))
    .catch(error => {
      //TODO: Consider having global error element here for Redux
    })
  }, [message.senderId])

  const time = moment(message.timestamp, 'YYYY-MM-DD HH:mm:ss').format('hh:mm');
  return (
    <S.Container color={'red'} isChained={isChained}>
      <S.Header>
        <S.Detail>
          {name}
        </S.Detail>
        <S.Detail>
          {time}
        </S.Detail>
      </S.Header>
      <S.Body>

      </S.Body>
    </S.Container>
  )
}

export default MessageItem
