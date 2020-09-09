import React, { useEffect } from 'react';
import * as S from './styles';
import { selectTheme, toggleTheme, setTheme } from '../themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { isThemeName } from '../../../shared/theme/types';

import {IoMdSunny, IoMdMoon} from 'react-icons/io'
import ButtonNavbarIcon from 'components/ButtonNavbarIcon';

const ThemeToggle = () => {
   const currentTheme = useSelector(selectTheme);
   const dispatch = useDispatch();

   useEffect(() => {
      const cookieTheme = Cookies.get('theme');

      if (!cookieTheme) {
         //Test if cookies exists
         Cookies.set('theme', currentTheme, { expires: 7 });
      } else if (isThemeName(cookieTheme) && currentTheme !== cookieTheme) {
         //Test if cookie is of valid type
         dispatch(setTheme(cookieTheme));
      }
   }, [currentTheme, dispatch]);

   const handleClick = () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      dispatch(toggleTheme());
      Cookies.set('theme', newTheme, { expires: 7 });
   };

   return (
      <S.Container>
         <ButtonNavbarIcon handleClick={handleClick}>
            {currentTheme === 'dark' ? <IoMdSunny /> : <IoMdMoon />}
         </ButtonNavbarIcon>
      </S.Container>
   );
};

export default ThemeToggle;
