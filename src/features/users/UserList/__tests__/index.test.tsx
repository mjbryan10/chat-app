import React from 'react';
import UserList from '..';
import { RenderResult, render, cleanup } from 'testing-utils';
import { fireEvent } from '@testing-library/react';

describe('UsersList Feature Component', () => {
   const __users = [
      {
         id: 1,
         name: 'Wessel',
      },
      {
         id: 2,
         name: 'Quint',
      },
      {
         id: 3,
         name: 'Mani',
      },
   ];
   const __handleItemClick = jest.fn();
   let utils: RenderResult;
   beforeEach(
      () =>
         (utils = render(
            <UserList users={__users} handleItemClick={__handleItemClick} />
         ))
   );
   afterEach(() => {
      cleanup();
   });

   test('should display the names of users given', () => {
    const {getByText} = utils;

      expect(getByText(/wessel/i)).toBeVisible();
      expect(getByText(/quint/i)).toBeVisible();
      expect(getByText(/mani/i)).toBeVisible();
   });

   test('should call click handler with id of user', () => {
    const {getAllByTestId} = utils;
    const firstUserItem = getAllByTestId('user-item')[0];

    fireEvent.click(firstUserItem);

      expect(__handleItemClick).toBeCalledTimes(1);
      expect(__handleItemClick).toBeCalledWith(__users[0]);
   });
});
