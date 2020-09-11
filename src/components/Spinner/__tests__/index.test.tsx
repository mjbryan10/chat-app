import React from 'react';
import { render } from 'testing-utils';
import Spinner from '..';

describe('Spinner Component', () => {
  test('should render correctly', () => {
    const { asFragment } = render(<Spinner />);
 
    expect(asFragment()).toMatchSnapshot();
 });
  
})
