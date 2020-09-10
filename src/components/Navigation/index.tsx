import React from 'react';
import * as S from './styles';
import ThemeToggle from 'features/theme/ThemeToggle';
import AppTitle from 'components/AppTitle';
import NavigationConversationsButton from 'features/navigation/NavigationConversationsButton';
import { selectNavigationState } from 'features/navigation/navigationSlice';
import LogoutButton from 'features/login/LogoutButton';
import { useSelector } from 'react-redux';

const Navigation = () => {
   const navigationState = useSelector(selectNavigationState);
   return (
      <S.Nav>
         {navigationState !== 'index' ? (
            <NavigationConversationsButton />
         ) : (
            <LogoutButton />
         )}
         <AppTitle />
         <ThemeToggle />
      </S.Nav>
   );
};

export default Navigation;
