import React, { FC, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { User } from 'shared/Api/types';
import AvatarWithLabelAndDelete from 'components/AvatarWithLabelAndDelete';

interface Props {
   users: User[];
   handleClick: (user: User) => void;
}

const UserListWithDeleteAvatar: FC<Props> = ({ users, handleClick }) => {
   const [keyId] = useState(nanoid(5));
   const [usersState, setUsersState] = useState(users);
   useEffect(() => {
      setUsersState(users);
   }, [users]);
   return (
      <div>
         {usersState.map((user) => (
            <AvatarWithLabelAndDelete
               key={user.id + keyId}
               userId={user.id}
               title={user.name}
               handleClick={() => handleClick(user)}
            />
         ))}
      </div>
   );
};

export default UserListWithDeleteAvatar;
