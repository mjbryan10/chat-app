import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { dark, light } from './theme';
import Login from './features/login/Login';
import { selectLogin } from './features/login/loginSlice';
import { selectTheme } from './features/theme/themeSlice';
import ThemeToggle from './features/theme/ThemeToggle';

function App() {
   const { isAuthenticated } = useSelector(selectLogin);
   const theme = useSelector(selectTheme);

   return (
         <ThemeProvider theme={(theme === 'dark') ? dark : light}>
            {isAuthenticated ? <div>Test</div> : <Login />}
            <ThemeToggle />
         </ThemeProvider>
   );
}

export default App;
