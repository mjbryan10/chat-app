import React, { FC, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { User } from 'shared/Api/types';
import AvatarWithLabelAndDelete from 'components/AvatarWithLabelAndDelete';
import { colorSpectrumArray } from 'shared/theme/types';
import * as S from './styles';

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

   const [colors] = useState(colorSpectrumArray);
   let colorIndex = -1;
   return (
      <S.Container>
         {usersState.map((user) => {
            colorIndex++;
            if (colorIndex >= colorSpectrumArray.length) colorIndex = 0;
            return (
               <AvatarWithLabelAndDelete
                  key={user.id + keyId}
                  userId={user.id}
                  title={user.name}
                  handleClick={() => handleClick(user)}
                  color={colors[colorIndex]}
               />
            );
         })}
      </S.Container>
   );
};

export default UserListWithDeleteAvatar;
