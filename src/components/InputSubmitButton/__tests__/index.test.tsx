import React from 'react';
import InputSubmitButton from '..';
import { render } from 'testing-utils';
import { cleanup } from '@testing-library/react';

describe('InputSubmitButton', () => {
   const testString = 'Given text';

   afterEach(() => {
      cleanup();
   });

   test('should have value passed from props', () => {
      const utils = render(<InputSubmitButton value={testString} />);
      const input = utils.getByTestId('input-submit-button') as HTMLInputElement;

      expect(input.value).toBe(testString);
   });

   test('should be disabled if disabled prop is passed', () => {
      const utils = render(<InputSubmitButton value={testString} disabled />);

      const input = utils.getByTestId('input-submit-button') as HTMLInputElement;

      expect(input).toBeDisabled();
   });
});
