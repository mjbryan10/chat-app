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
import { sortUsers } from './helpers';

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
      <div data-testid="conversation-user-selector">
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
