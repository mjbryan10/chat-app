import React from 'react';
import ConversationContainer from '..';
import { render } from 'testing-utils';

describe('ConversationContainer Feature Component', () => {
  test('should have a create conversation button', () => {
    const utils = render(<ConversationContainer />);
    const {getByText} = utils;


    expect(getByText(/create new conversation/i)).toBeVisible();
  })
  
})
