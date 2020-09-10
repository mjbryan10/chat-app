import React, { FC } from 'react';
import { User } from 'shared/Api/types';
import UserItem from '../UserItem';
import * as S from './styles';

interface Props {
   users: User[];
   handleItemClick?: (id: number) => void;
}

const UsersList: FC<Props> = ({ users, handleItemClick }) => {
   const onItemClick = (id: number) => {
      if (handleItemClick) handleItemClick(id);
   };
   return (
      <S.ListWrapper>
         {users.map((user) => (
            <li>
               <UserItem key={user.id} user={user} handleClick={onItemClick} />
            </li>
         ))}
      </S.ListWrapper>
   );
};

export default UsersList;
