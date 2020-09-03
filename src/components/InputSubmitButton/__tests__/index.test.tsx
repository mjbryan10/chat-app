import React from 'react';
import InputSubmitButton from '..';
import { render } from 'testing-utils';

describe('InputSubmitButton', () => {
  test('should have value passed from props', () => {
    let testString = 'Given text';
    const utils = render(
        <InputSubmitButton value={testString} />
    );
    
    const input = utils.getByTestId('input-submit-button') as HTMLInputElement;

    expect(input.value).toBe('Given text');
  })
})
