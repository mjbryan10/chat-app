import React from 'react';
import axios from 'axios';
import UsersContainer from '..';
import { render, cleanup, RenderResult, waitForElement } from 'testing-utils';
import { Provider } from 'react-redux';
import { store } from 'app/store';

jest.mock('axios');
describe('UsersContainer Feature Component', () => {
  //TODO: Return to fix observation mutation error.
  //  const __users = [
  //     {
  //        id: 1,
  //        name: 'Wessel',
  //     },
  //     {
  //        id: 2,
  //        name: 'Andrew',
  //     },
  //     {
  //        id: 3,
  //        name: 'Mani',
  //     },
  //  ];
  //  const __selectedUsers = [
  //     {
  //        id: 3,
  //        name: 'Mani',
  //     },
  //  ];
  //  const __handleUserClick = jest.fn();
  //  let utils: RenderResult;
  //  beforeEach(() => {
  //     (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(__users));
  //     utils = render(
  //        <Provider store={store}>
  //           <UsersContainer
  //              selectedUsers={__selectedUsers}
  //              handleUserClick={__handleUserClick}
  //           />
  //        </Provider>
  //     );
  //  });
  //  afterEach(() => {
  //     (axios.get as jest.Mock).mockClear();
  //     cleanup();
  //  });
  //  test('should filter out selected users from display', async () => {
  //     const { getAllByTestId, getByText } = utils;

  //     const userItems = await waitForElement(() => getAllByTestId('user-item'));

  //     expect(userItems).toHaveLength(2);
  //     expect(getByText(/wessel/i)).toBeVisible();
  //     expect(getByText(/andrew/i)).toBeVisible();
  //  });

  //  test('should sort users alphabetically by name', async () => {
  //     const { getAllByTestId } = utils;

  //     const userItems = await waitForElement(() => getAllByTestId('user-item'));

  //     expect(userItems[0].innerText).toMatch(/andrew/i);
  //  });
});
