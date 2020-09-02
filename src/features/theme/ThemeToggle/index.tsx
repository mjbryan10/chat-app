import React, { useState } from 'react';
import * as S from './styles';
import { selectTheme, toggleTheme } from '../themeSlice';
import { useSelector, useDispatch } from 'react-redux';

const ThemeToggle = () => {

  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(currentTheme)

  const onChange = () => {
    const newTheme = (theme === 'dark') ? 'light' : 'dark';
    setTheme(newTheme);
    dispatch(toggleTheme());
  }

  return (
    <S.Container>
      {/* <image of the sun> */}
      0
      <S.Switch >
        <S.Input type="checkbox" onChange={onChange} checked={theme === 'dark'}/>
        <S.Slider></S.Slider>
      </S.Switch>
      {/* <image of the moon> */}
      )
    </S.Container>
  )
}

export default ThemeToggle
