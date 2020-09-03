import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputTextField from '../../InputTextField';

describe('InputTextField Component', () => {
   test('should update local state on user input change', () => {
      const utils = render(<InputTextField initialValue={'intial text'} />);
      const input = utils.getByTestId('input-text-field') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'Changed text' } });

      expect(input.value).toBe('Changed text');
   });

   test('should not update local state on user input change when disabled', () => {
      const utils = render(<InputTextField initialValue={'Unchanged text'} disabled />);
      const input = utils.getByTestId('input-text-field') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'A changed text value' } });

      expect(input.value).toBe('Unchanged text');
   });

   test('should trigger change handler if one is passed down', () => {
      const testHandler = jest.fn();
      const utils = render(
         <InputTextField initialValue={'Unchanged text'} handleChange={testHandler} />
      );
      const input = utils.getByTestId('input-text-field') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'A changed text value' } });

      expect(testHandler).toBeCalled();
      expect(testHandler).toBeCalledWith('A changed text value');
   });
});
