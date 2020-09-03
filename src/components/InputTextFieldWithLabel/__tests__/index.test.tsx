import React from 'react';
import InputTextFieldWithLabel from '..';
import { render, fireEvent } from '@testing-library/react';

describe('InputTextFieldWithLabel', () => {
   test('should pass down event handler to input element', () => {
      const testHandler = jest.fn();
      const utils = render(
         <InputTextFieldWithLabel handleChange={testHandler} labelValue="Test" />
      );
      const input = utils.getByTestId('input-text-field') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'Changed text' } });

      expect(input.value).toBe('Changed text');
      expect(testHandler).toBeCalled();
      expect(testHandler).toBeCalledWith('Changed text');
   });
});
