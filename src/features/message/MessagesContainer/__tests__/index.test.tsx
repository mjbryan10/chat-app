import React from 'react';
import { render } from 'testing-utils';
import MessagesContainer from '..';

describe('MessagesContainer Feature Component', () => {
  test('should render correctly', () => {
    const { asFragment } = render(<MessagesContainer />);
 
    expect(asFragment()).toMatchSnapshot();
 });
})
