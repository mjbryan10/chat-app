import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from 'styled-components';
import { dark } from './theme';

function App() {
   return (
      <Provider store={store}>
         <ThemeProvider theme={dark}>
            <div className="App"></div>
         </ThemeProvider>
      </Provider>
   );
}

export default App;
