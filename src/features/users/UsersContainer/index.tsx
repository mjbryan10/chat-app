import React, { useEffect, FC } from 'react';
import { selectUsers, selectUsersStatus, fetchUsers } from '../usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'components/Spinner';
import UserListWithSearch from '../UserListWithSearch';

interface Props {
   handleUserClick?: (id: number) => void;
}

const UsersContainer: FC<Props> = ({ handleUserClick }) => {
   const users = useSelector(selectUsers);
   const status = useSelector(selectUsersStatus);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchUsers());
   }, [dispatch]);

   const handleItemClick = (id: number) => {
      if (handleUserClick) handleUserClick(id);
   };

  
   return (
      <div>
         {status === 'fulfilled' ? (
            <UserListWithSearch users={users} handleItemClick={handleItemClick} />
         ) : (
            <Spinner />
         )}
      </div>
   );
};

export default UsersContainer;
