import React from 'react';
import InputSubmitButton from '..';
import { render, fireEvent, cleanup } from 'testing-utils';

describe('InputSubmitButton', () => {
   const testString = 'Given text';

   afterEach(() => {
      cleanup();
   });

   test('should have value passed from props', () => {
      const { getByTestId } = render(<InputSubmitButton value={testString} />);
      const input = getByTestId('input-submit-button') as HTMLInputElement;

      expect(input.value).toBe(testString);
   });

   test('should be disabled if disabled prop is passed', () => {
      const { getByTestId } = render(<InputSubmitButton value={testString} disabled />);

      const input = getByTestId('input-submit-button') as HTMLInputElement;

      expect(input).toBeDisabled();
   });

   test('should submit a form if nested and no handler passed', () => {
      const __onSubmit = jest.fn(e => e.preventDefault());
      const { getByTestId } = render(
         <form onSubmit={__onSubmit}>
            <InputSubmitButton value={testString} />
         </form>
      );

      fireEvent.click(getByTestId('input-submit-button'));

      expect(__onSubmit).toBeCalledTimes(1);
   });

   test('should call click handler if passed one in props', () => {
      const __handleClick = jest.fn();
      const { getByTestId } = render(
            <InputSubmitButton value={testString} handleClick={__handleClick} />
      );

      fireEvent.click(getByTestId('input-submit-button'));

      expect(__handleClick).toBeCalledTimes(1);
   });

   test('should render correctly', () => {
      const { asFragment } = render(<InputSubmitButton value={testString} />);

      expect(asFragment()).toMatchSnapshot();
   });
});
