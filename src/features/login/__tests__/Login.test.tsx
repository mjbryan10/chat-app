import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../Login';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';

describe('Login Functional Component', () => {
   beforeEach(() => {
      render(
         <Provider store={store}>
            <Login />
         </Provider>
      );
   });
   test('logs user in when correct values given', () => {});
   test('it does not log user in when incorrect values', () => {});
});
