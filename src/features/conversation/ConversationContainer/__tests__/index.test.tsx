import React from 'react';
import ConversationContainer from '..';
import { render, RenderResult, cleanup, fireEvent } from 'testing-utils';
import { act } from 'react-dom/test-utils';

jest.mock('axios', () => ({
   post: jest.fn(),
}));

jest.mock('nanoid', () => ({ nanoid: () => jest.fn() }));

describe('ConversationContainer Feature Component', () => {
   let utils: RenderResult;
   beforeEach(() => {
      utils = render(<ConversationContainer />);
   });
   afterEach(() => cleanup());

   test('should have a create conversation button', () => {
      const { getByText } = utils;

      expect(getByText(/create new conversation/i)).toBeVisible();
   });

   test('should have a header with `conversations`', () => {
      const { getByText } = utils;

      expect(getByText(/conversations/i)).toBeVisible();
   });

   test('should toggle from conversation selector to user selector on button click', () => {
      const { getByText, getByTestId } = utils;

      act(() => {
         fireEvent.click(getByText(/create new conversation/i));
      });

      expect(getByTestId('conversation-user-selector')).toBeVisible();
   });

   test('should render correctly', () => {
      const { asFragment } = render(<ConversationContainer />);

      expect(asFragment()).toMatchSnapshot();
   });
});
