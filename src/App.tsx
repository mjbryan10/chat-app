import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from 'styled-components';
import { dark } from './theme';
import Login from './features/login/Login';

function App() {
   return (
      <Provider store={store}>
         <ThemeProvider theme={dark}>
            <Login>
               <div className="App"></div>
            </Login>
         </ThemeProvider>
      </Provider>
   );
}

export default App;
