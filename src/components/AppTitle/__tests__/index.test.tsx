import React from 'react';
import { render, cleanup, RenderResult } from 'testing-utils';
import AppTitle from '..';
import { useSelector } from 'react-redux';

/**
 * Mocking useSelector to provide Redux state to tests.
 * @see https://dev.to/fredrikbergqvist/mocking-redux-useselector-hook-2ale
 */
jest.mock('react-redux', () => ({
   ...jest.requireActual<any>('react-redux'),
   useSelector: jest.fn(),
}));
describe('AppTitle Component', () => {
   afterEach(() => cleanup());
   afterAll(() => jest.clearAllMocks());
   test('should render `Welcome to Ch@` on init', () => {
      const { getByText } = render(<AppTitle />);

      expect(getByText(/welcome to ch@/i)).toBeVisible();
   });

   test('should display the conversation name if there is one in store', async () => {
      const __currentConversation = {
         conversation: { name: 'testName' },
         users: [1, 2, 3],
      };
      (useSelector as jest.Mock).mockImplementationOnce(
         () => __currentConversation
      );
      const { getByText } = render(<AppTitle />);

      expect(useSelector).toBeCalled();
      expect(getByText(/testName/i)).toBeVisible();
   });

   test('should inform is `private` chat if only 2 participants', async () => {
      const __currentConversation = { conversation: { name: null }, users: [1, 2] };
      (useSelector as jest.Mock).mockImplementationOnce(() => __currentConversation);
      const { getByText } = render(<AppTitle />);

      expect(useSelector).toBeCalled();
      expect(getByText(/private/i)).toBeVisible();
   });
});
