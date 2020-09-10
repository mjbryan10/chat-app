import React from 'react';
import { render, cleanup, RenderResult, fireEvent } from 'testing-utils';
import UserListWithSearch from '..';

describe('UsersContainer Feature Component', () => {
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
            <UserListWithSearch users={__users} handleItemClick={__handleItemClick} />
         ))
   );
   afterEach(() => {
      cleanup();
   });

   test('should filter the user array to search string by exact match', () => {
      const { getByTestId, getByText, getAllByTestId } = utils;

      fireEvent.change(getByTestId('input-text-field'), { target: { value: 'Wessel' } });

      expect(getByText(/wessel/i)).toBeVisible();
      expect(getAllByTestId('user-item')).toHaveLength(1)
   });

   test('should filter the user array to non-case senstive match', () => {
      const { getByTestId, getByText, getAllByTestId } = utils;

      fireEvent.change(getByTestId('input-text-field'), { target: { value: 'wessel' } });

      expect(getByText(/wessel/i)).toBeVisible();
      expect(getAllByTestId('user-item')).toHaveLength(1)
   });

   test('should filter the user array to partial match', () => {
      const { getByTestId, getByText, getAllByTestId } = utils;

      fireEvent.change(getByTestId('input-text-field'), { target: { value: 'wes' } });

      expect(getByText(/wessel/i)).toBeVisible();
      expect(getAllByTestId('user-item')).toHaveLength(1)
   });

   test('should display the names of users given', () => {
      const { getByText } = utils;

      expect(getByText(/wessel/i)).toBeVisible();
      expect(getByText(/quint/i)).toBeVisible();
      expect(getByText(/mani/i)).toBeVisible();
   });

   test('should call click handler with id of user', () => {
      const { getAllByTestId } = utils;
      const firstUserItem = getAllByTestId('user-item')[0];

      fireEvent.click(firstUserItem);

      expect(__handleItemClick).toBeCalledTimes(1);
      expect(__handleItemClick).toBeCalledWith(__users[0]);
   });
});
