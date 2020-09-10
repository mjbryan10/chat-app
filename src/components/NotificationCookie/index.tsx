import React, { FC, SyntheticEvent } from 'react';
import { BiCookie } from 'react-icons/bi';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import * as S from './styles';

interface Props {
   handleClick: () => void;
}

const NotificationCookie: FC<Props> = ({ handleClick }) => {
   const onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault();
      handleClick();
   };
   return (
      <S.NoticeContainer>
         <BiCookie size="3rem" />
         <S.TextBox>
            This website makes use of functional cookies. Please confirm your acceptance.
         </S.TextBox>
         <S.ConfirmationButton onClick={onClick}>
            <AiOutlineCheckSquare size="3rem" />
         </S.ConfirmationButton>
      </S.NoticeContainer>
   );
};

export default NotificationCookie;
