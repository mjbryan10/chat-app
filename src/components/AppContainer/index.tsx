import React from 'react';
import * as S from './styles';
import MessagesContainer from 'features/message/MessagesContainer';
import ConversationList from 'features/conversation/ConversationList';

const AppContainer = () => {
  return (
    <S.Container>
      <ConversationList />
      <MessagesContainer />
    </S.Container>
  )
}

export default AppContainer
