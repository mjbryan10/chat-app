import React from 'react';
import * as S from './styles';
import ThemeToggle from 'features/theme/ThemeToggle';
import AppTitle from 'components/AppTitle';

const Navigation = () => {
   return (
      <S.Nav>
         <button>Ch@</button>
         <AppTitle />
         <ThemeToggle />
      </S.Nav>
   );
};

export default Navigation;
