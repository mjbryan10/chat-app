import React, { FC } from 'react';
import * as S from './styles';
import Avatar, { Props as AvatarProps } from '../Avatar';

interface Props extends AvatarProps {
  selected?: boolean;
  userId: number;
  handleClick?: (userId: number) => void;
}

const AvatarWithLabelAndDelete: FC<Props> = ({
   title,
   size = 50,
   color = 'owner',
   selected = false,
   userId,
   handleClick,
}) => {
  const onClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
     event.preventDefault();

     if(handleClick) handleClick(userId);

  }
   return (
      <S.Label selected={selected} onClick={onClick}>
         <S.DeleteIcon />
         <Avatar title={title} size={size} color={color} />
         <span>{title?.split(' ')[0]}</span>
      </S.Label>
   );
};

export default AvatarWithLabelAndDelete;
