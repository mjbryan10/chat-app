import React, { FC } from 'react';
import {AiOutlineCloseSquare} from 'react-icons/ai';
import Avatar, { Props as AvatarProps } from '../Avatar';
import * as S from './styles';

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
      <S.Label selected={selected} onClick={onClick} color={color}>
         <S.DeleteIcon><AiOutlineCloseSquare/></S.DeleteIcon>
         <Avatar title={title} size={size} color={color} />
         <S.Title color={color}>{title?.split(' ')[0]}</S.Title>
      </S.Label>
   );
};

export default AvatarWithLabelAndDelete;
