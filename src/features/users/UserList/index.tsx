import React, { FC, useEffect, useState } from 'react';
import { User } from 'shared/Api/types';
import UserItem from '../UserItem';
import * as S from './styles';

interface Props {
   users: User[];
   handleItemClick?: (user: User) => void;
}

const UserList: FC<Props> = ({ users, handleItemClick }) => {
   const onItemClick = (user: User) => {
      if (handleItemClick) handleItemClick(user);
   };
   const [usersState, setUsersState] = useState(users);
   useEffect(() => {
      setUsersState(users)
   }, [users])
   return (
      <S.ListWrapper>
         {usersState.map((user) => (
            <li key={user.id+'li'}>
               <UserItem key={user.id} user={user} handleClick={onItemClick} />
            </li>
         ))}
      </S.ListWrapper>
   );
};

export default UserList;
