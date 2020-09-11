import React from 'react';
import { render } from 'testing-utils';
import ConversationUserSelector from '..';

describe('ConversationUserSelector Feature Component', () => {
  test('should render correctly', () => {
    const { asFragment } = render(<ConversationUserSelector />);
 
    expect(asFragment()).toMatchSnapshot();
 });
})
