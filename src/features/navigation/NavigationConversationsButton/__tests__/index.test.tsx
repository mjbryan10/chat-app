import React from 'react';
import { render } from 'testing-utils';
import NavigationConversationsButton from '..';

describe('NavigationConversationsButton Feature Component', () => {
  test('should render correctly', () => {
    const { asFragment } = render(<NavigationConversationsButton />);
 
    expect(asFragment()).toMatchSnapshot();
 });
})
