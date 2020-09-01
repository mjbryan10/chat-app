import React from 'react';
import Login from '..';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store';
import renderer from 'react-test-renderer';

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
      return { nameInput, idInput, submitButton, ...utils };
   };

   test('should trigger submit handler if user presses enter in the name text field', () => {
      const { nameInput } = setup();

      fireEvent.focus(nameInput);
      fireEvent.change(nameInput, { target: { value: 'changed value' } });
      fireEvent.keyPress(nameInput, { key: 'Enter', code: 13, charCode: 13 });

      expect(axios.get).toBeCalledTimes(1);
   });

   test('should trigger submit when `Log In` button is called', () => {
      const { submitButton } = setup();

      fireEvent.click(submitButton);

      expect(axios.get).toBeCalledTimes(1);
   });

   describe('Snapshots', () => {
      it('renders correctly', () => {
         const tree = renderer
            .create(
               <Provider store={store}>
                  <Login />
               </Provider>
            )
            .toJSON();
         expect(tree).toMatchSnapshot();
      });
   });
});
