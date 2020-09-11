import React from 'react';
import { render, RenderResult, cleanup, fireEvent } from 'testing-utils';
import UserListWithDeleteAvatar from '..';

describe('UserListWithDeleteAvatar Feature Component', () => {
   const __handleClick = jest.fn();
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
   let utils: RenderResult;
   beforeEach(() => {
      utils = render(
         <UserListWithDeleteAvatar users={__users} handleClick={__handleClick} />
      );
   });
   afterEach(() => cleanup());
   test('should call click handler from props', () => {
      const { getByText } = utils;
      const button = getByText(/Wessel/i);

      fireEvent.click(button);

      expect(__handleClick).toBeCalledTimes(1);
   });

   test('should render correctly', () => {
      const { asFragment } = utils;

      expect(asFragment()).toMatchSnapshot();
   });
});
