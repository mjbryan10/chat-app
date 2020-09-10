import React, { FC, SyntheticEvent } from 'react';
import * as S from './styles';
import { User } from 'shared/Api/types';

interface Props {
  user: User;
  handleClick?: (id: number) => void;
}

const UserItem: FC<Props> = ({user, handleClick}) => {

  const onClick = (id: number) => (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    if (handleClick) handleClick(id);
  }
  return (
    <S.Container onClick={onClick(user.id)} data-testid="user-item">
      {user.name}
    </S.Container>
  )
}

export default UserItem
