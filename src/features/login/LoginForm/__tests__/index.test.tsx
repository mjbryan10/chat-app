import React from 'react';
import LoginForm from '..';
import { render, fireEvent, cleanup } from 'testing-utils';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store';

jest.mock('axios');

describe('Login Component', () => {
   const __user = { id: 1, name: 'wessel' };
   const __handleSubmit = jest.fn();
   beforeEach(() => {
      (axios.get as jest.Mock).mockClear();
   });

   afterEach(() => {
      cleanup()
      __handleSubmit.mockClear();
   });

   const setup = () => {
      const utils = render(
         <Provider store={store}>
            <LoginForm id={__user.id} name={__user.name} handleSubmit={__handleSubmit} />
         </Provider>
      );
      const nameInput = utils.getAllByTestId('input-text-field')[0];
      const idInput = utils.getAllByTestId('input-text-field')[1];
      const submitButton = utils.getByTestId('input-submit-button');
      const form = utils.getByTestId('login-form');
      return { nameInput, idInput, submitButton, form, ...utils };
   };

   test('should call submit handler if form is submitted', () => {
      const { form } = setup();

      fireEvent.submit(form);

      expect(__handleSubmit).toBeCalledTimes(1);
   });

   test('should trigger submit when `Log In` button is clicked', () => {
      const { submitButton } = setup();

      fireEvent.click(submitButton);

      expect(__handleSubmit).toBeCalledTimes(1);
   });

   test('should render correctly', () => {
   const { asFragment } = setup();

   expect(asFragment()).toMatchSnapshot();
});
});
