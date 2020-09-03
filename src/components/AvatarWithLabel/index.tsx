import React, { FC } from 'react';
import * as S from './styles';
import Avatar, { Props as AvatarProps } from '../Avatar';

interface Props extends AvatarProps {
  selected?: boolean;
}

const AvatarWithLabel: FC<Props> = ({
   text,
   size = 50,
   color = 'owner',
   selected = false,
}) => {
  
   return (
      <S.Label selected={selected}>
         <Avatar text={text} size={size} color={color} />
         <span>{text}</span>
      </S.Label>
   );
};

export default AvatarWithLabel;
