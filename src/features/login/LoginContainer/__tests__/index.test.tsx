import React from 'react';
import Login from '..';
import { render, fireEvent } from 'testing-utils';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store';

jest.mock('axios');

describe('Login Component', () => {
   beforeEach(() => {
      (axios.get as jest.Mock).mockClear();
   });

   const setup = () => {
      const utils = render(
         <Provider store={store}>
            <Login />
         </Provider>
      );
      const nameInput = utils.getAllByTestId('input-text-field')[0];
      const idInput = utils.getAllByTestId('input-text-field')[1];
      const submitButton = utils.getByTestId('input-submit-button');
      const form = utils.getByTestId('login-form');
      return { nameInput, idInput, submitButton, form, ...utils };
   };

   test('should trigger axios request if form is submitted', () => {
      const { form } = setup();

      fireEvent.submit(form);

      expect(axios.get).toBeCalledTimes(1);
   });

   test('should trigger submit when `Log In` button is called', () => {
      const { submitButton } = setup();

      fireEvent.click(submitButton);

      expect(axios.get).toBeCalledTimes(1);
   });
});
