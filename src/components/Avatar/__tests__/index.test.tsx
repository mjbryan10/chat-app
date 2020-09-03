import React from 'react';
import Avatar, { stringToCaptialLetter } from '..';
import { render } from 'testing-utils';

describe('Avatar component', () => {
  
  describe('stringToCaptialLetter', () => {
    test('should return the first letter captalised', () => {
      const testText = 'test';
      
      const result = stringToCaptialLetter(testText)

      expect(result).toEqual('T');
    });
    
    
  })

  test('should render an Avatar with `A` if no text provided', () => {
    const utils = render(<Avatar/>)

    const innerContainer = utils.getByTestId('avatar-inner-container');

    expect(innerContainer.innerHTML).toEqual('A');
  });

  test('should render the first letter captalised only', () => {
    const utils = render(<Avatar text="Demo name or message"/>)

    const innerContainer = utils.getByTestId('avatar-inner-container');

    expect(innerContainer.innerHTML).toEqual('D');
  })
  
  

})
