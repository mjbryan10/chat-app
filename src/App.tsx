import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from 'styled-components';
import { dark } from './theme';
import Login from './features/login/Login';
import { selectLogin } from './features/login/loginSlice';

function App() {
   const { isAuthenticated } = useSelector(selectLogin);


   return (
      <Provider store={store}>
         <ThemeProvider theme={dark}>
            {isAuthenticated ? <div>Test</div> : <Login/> }
            
         </ThemeProvider>
      </Provider>
   );
}

export default App;
