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
      <S.Label selected={selected} color={color}>
         <Avatar title={title} size={size} color={color} />
         <h3 data-testid="avatar-with-label-span">{title}</h3>
      </S.Label>
   );
};

export default AvatarWithLabel;