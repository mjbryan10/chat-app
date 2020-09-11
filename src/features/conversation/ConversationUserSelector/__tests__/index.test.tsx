import React from 'react';
import { render } from 'testing-utils';
import ConversationUserSelector from '..';
import { nanoid } from 'nanoid';

jest.mock('nanoid', () => ({ nanoid: () => jest.fn() }));

describe('ConversationUserSelector Feature Component', () => {
   test('should render correctly', () => {
      const { asFragment } = render(<ConversationUserSelector />);

      expect(asFragment()).toMatchSnapshot();
   });
});
