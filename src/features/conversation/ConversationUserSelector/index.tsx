import React, { useEffect } from 'react';
import UserListWithDeleteAvatar from 'features/users/UserListWithDeleteAvatar';
import UserListWithSearch from 'features/users/UserListWithSearch';
import { useSelector, useDispatch } from 'react-redux';
import {
   fetchUsers,
   selectSelectedUsers,
   clearSelectedUsers,
   clearSelectableUsers,
   selectSelectableUsers,
   addUserToSelected,
   removeUserFromSelectable,
   addUserToSelectable,
   removeUserFromSelected,
} from 'features/users/usersSlice';
import { User } from 'shared/Api/types';

const ConversationUserSelector = () => {
   //REDUX:
   const selectedUsers = useSelector(selectSelectedUsers);
   const users = useSelector(selectSelectableUsers);
   const dispatch = useDispatch();

   //LIFECYCLES:

   useEffect(() => {
      dispatch(fetchUsers());
      return () => {
         dispatch(clearSelectedUsers);
         dispatch(clearSelectableUsers);
      };
   }, [dispatch]);

   //METHODS:

   /**
    * Sorts an array of users alphabetically by name.
    * @param users An array of users to sort by name
    */
   const sortUsers = (users: User[]) => {
      //TODO: Sort alphabetically
      if (!users.length) return [];
      return users.slice().sort((a, b) => a.name.localeCompare(b.name));
   };
   /**
    * Removes a user from one array and places them in the other.
    * @param user The user from which to switch selected status
    */
   const toggleUserSelection = (user: User) => {
      const usersIndex = users.findIndex(({ id }) => user.id === id);
      if (usersIndex >= 0) {
         dispatch(addUserToSelected(user));
         dispatch(removeUserFromSelectable(user));
      } else {
         dispatch(addUserToSelectable(user));
         dispatch(removeUserFromSelected(user));
      }
   };

   return (
      <div>
         <UserListWithDeleteAvatar
            users={sortUsers(selectedUsers)}
            handleClick={toggleUserSelection}
         />
         <UserListWithSearch
            users={sortUsers(users)}
            handleItemClick={toggleUserSelection}
         />
      </div>
   );
};

export default ConversationUserSelector;
