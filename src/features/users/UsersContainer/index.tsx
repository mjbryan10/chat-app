import React, { useEffect, FC, useMemo, useState } from 'react';
import { selectUsers, selectUsersStatus, fetchUsers } from '../usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'components/Spinner';
import UserListWithSearch from '../UserListWithSearch';
import { User } from 'shared/Api/types';

interface Props {
   handleUserClick?: (user: User) => void;
   selectedUsers?: User[];
}

const UsersContainer: FC<Props> = ({ handleUserClick, selectedUsers = [] }) => {
   //REDUX ---
   const users = useSelector(selectUsers);
   const status = useSelector(selectUsersStatus);
   const dispatch = useDispatch();
   //---

   /**
    * Fetches the users on component initial render.
    */
   useEffect(() => {
      dispatch(fetchUsers());
   }, [dispatch]);

   const handleItemClick = (user: User) => {
      if (!handleUserClick) return;
      const result = users.find(({id}) => user.id === id);
      if (result) handleUserClick(result);
   };

   /**
    * State and state updating logic responsible for providing the array of users
    */
   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
   useEffect(() => {
     console.log('UsersContainer -> selectedUsers', selectedUsers)
      /**
       * Removes users from an array if they match users from the selected
       * array. Then returns the filtered array.
       * @param users The array to which to filter
       * @param selectedUsers The comparison array.
       */
      const filterUsers = (users: User[], selectedUsers: User[]) => {
         console.log('filterUsers -> selectedUsers', selectedUsers);
        //  if (!selectedUsers.length) return users.slice();
         const filteredUsers = users
            .slice()
            .filter((user) => !selectedUsers.find(({ id }) => user.id === id));
         console.log('filterUsers -> filteredUsers', filteredUsers);
         return filteredUsers;
      };
      /**
       * Sorts an array of users alphabetically by name.
       * @param users An array of users to sort by name
       */
      const sortUsers = (users: User[]) => {
         if (!users.length) return [];
         return users.slice().sort((a, b) => a.name.localeCompare(b.name));
      };
      /**
       * The result of filtering and sorted the provided array from props.
       */
      const updatedUsers = sortUsers(filterUsers(users, selectedUsers));

      setFilteredUsers(updatedUsers);
   }, [selectedUsers, users]);

   return (
      <div>
         {status === 'fulfilled' ? (
            <UserListWithSearch users={filteredUsers} handleItemClick={handleItemClick} />
         ) : (
            <Spinner />
         )}
      </div>
   );
};

export default UsersContainer;
