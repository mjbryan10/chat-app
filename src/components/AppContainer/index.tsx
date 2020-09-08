import React from 'react';
import * as S from './styles';
import MessagesContainer from 'features/message/MessagesContainer';
import ConversationContainer from 'features/conversation/ConversationContainer';

const AppContainer = () => {
  return (
    <S.Container>
      <ConversationContainer />
      <MessagesContainer />
    </S.Container>
  )
}

export default AppContainer
