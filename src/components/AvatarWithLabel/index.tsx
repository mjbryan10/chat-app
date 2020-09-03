import React, { FC } from 'react';
import * as S from './styles';
import Avatar, { Props as AvatarProps } from '../Avatar';

interface Props extends AvatarProps {
  selected?: boolean;
}

const AvatarWithLabel: FC<Props> = ({
   title,
   size = 50,
   color = 'owner',
   selected = false,
}) => {
  
   return (
      <S.Label selected={selected}>
         <Avatar title={title} size={size} color={color} />
         <span data-testid="avatar-with-label-span">{title}</span>
      </S.Label>
   );
};

export default AvatarWithLabel;
