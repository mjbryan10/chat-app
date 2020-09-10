import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { dark, light } from './shared/theme';
import LoginContainer from './features/login/LoginContainer';
import { selectLogin } from './features/login/loginSlice';
import { selectTheme } from './features/theme/themeSlice';
import Navigation from 'components/Navigation';
import GlobalStyles from 'shared/styles/GlobalStyles';
import AppContainer from 'components/AppContainer';

function App() {
   const { isAuthenticated } = useSelector(selectLogin);
   const theme = useSelector(selectTheme);

   return (
         <ThemeProvider theme={(theme === 'dark') ? dark : light}>
            <GlobalStyles />
            <Navigation />
            {isAuthenticated ? <AppContainer /> : <LoginContainer />}
         </ThemeProvider>
   );
}

export default App;
