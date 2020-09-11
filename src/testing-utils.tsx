import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { dark } from './shared/theme';
import { Provider } from 'react-redux';
import { store } from 'app/store';

const AllTheProviders = ({ children }: any) => {
   return (
      <Provider store={store}>
         <ThemeProvider theme={dark}>{children}</ThemeProvider>
      </Provider>
   );
};

const customRender = (ui?: any, options?: any) =>
   render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
