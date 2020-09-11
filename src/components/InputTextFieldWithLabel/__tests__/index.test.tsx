import React from 'react';
import InputTextFieldWithLabel from '..';
import { render, fireEvent, RenderResult, cleanup } from 'testing-utils';

describe('InputTextFieldWithLabel', () => {
   const __testHandler = jest.fn();
   const __labelValue = 'Test';
   let utils: RenderResult;
   beforeEach(() => {
      utils = render(
         <InputTextFieldWithLabel
            handleChange={__testHandler}
            labelValue={__labelValue}
         />
      );
   });
   afterEach(() => cleanup());

   test('should pass down event handler to input element', () => {
      const { getByTestId } = utils;
      const input = getByTestId('input-text-field') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'Changed text' } });

      expect(input.value).toBe('Changed text');
      expect(__testHandler).toBeCalled();
      expect(__testHandler).toBeCalledWith('Changed text');
   });

   test('should display props labelValue', () => {
      const { getByText } = utils;

      expect(getByText(__labelValue)).toBeVisible();
   });

   test('should render correctly', () => {
      const { asFragment } = render(
         <InputTextFieldWithLabel
            handleChange={__testHandler}
            labelValue={__labelValue}
         />
      );

      expect(asFragment()).toMatchSnapshot();
   });
});
