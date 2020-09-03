import React, { useEffect } from 'react';
import * as S from './styles';
import { selectTheme, toggleTheme, setTheme } from '../themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { isThemeName } from '../../../theme/@types';

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

   const onChange = () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      dispatch(toggleTheme());
      Cookies.set('theme', newTheme, { expires: 7 });
   };

   return (
      <S.Container>
         {/* <image of the sun> */}
         <S.Switch>
            <S.Input
               type="checkbox"
               onChange={onChange}
               checked={currentTheme === 'dark'}
               data-testid="theme-toggle-checkbox"
            />
            <S.Slider>
            </S.Slider>
         </S.Switch>
         {/* <image of the moon> */}
      </S.Container>
   );
};

export default ThemeToggle;
