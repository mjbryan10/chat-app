import React from 'react';
import * as S from './styles';
import ThemeToggle from 'features/theme/ThemeToggle';

const Navigation = () => {
  return (
    <S.Nav>
      <button>Ch@</button>
      <h1>Site Title</h1>
      <ThemeToggle />
    </S.Nav>
  )
}

export default Navigation
