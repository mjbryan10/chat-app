import React from 'react';
import * as S from './styles';
import MessagesContainer from 'features/message/MessagesContainer';
import ConversationContainer from 'features/conversation/ConversationContainer';
import { selectNavigationState } from 'features/navigation/navigationSlice';
import { useSelector } from 'react-redux';

const AppContainer = () => {
   const navigation = useSelector(selectNavigationState);
   return (
      <S.Container>
         <S.DisplaySwitch active={navigation === 'conversation'}>
            <ConversationContainer />
         </S.DisplaySwitch>
         <S.DisplaySwitch active={navigation === 'message'}>
            <MessagesContainer />
         </S.DisplaySwitch>
      </S.Container>
   );
};

export default AppContainer;
