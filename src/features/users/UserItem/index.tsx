import React, { FC, SyntheticEvent } from 'react';
import * as S from './styles';
import { User } from 'shared/Api/types';

interface Props {
  user: User;
  handleClick?: (user: User) => void;
}

const UserItem: FC<Props> = ({user, handleClick}) => {

  const onClick = (user: User) => (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    if (handleClick) handleClick(user);
  }
  return (
    <S.Container onClick={onClick(user)} data-testid="user-item">
      {user.name}
    </S.Container>
  )
}

export default UserItem
