import React, { SyntheticEvent, FC, useMemo, useEffect, useState } from 'react';
import * as S from './styles';
import AvatarWithLabel from 'components/AvatarWithLabel';
import { Conversation } from 'shared/Api/types';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin } from 'features/login/loginSlice';
import {
   selectCurrentConversationId,
   setCurrentConversation,
} from '../conversationSlice';
import { isSelectedConversation, computeConversationName } from './helpers';
import { SpectrumColor } from 'shared/theme/types';

interface Props {
   conversation: Conversation;
   color: SpectrumColor;
}
/**
 * A React functional component for rendering a conversation option.
 * 
 * When the component is clicked by the user it will update the current conversation in
 * the Redux store.
 * @param conversation The conversation to which this card item relates to.
 */
const ConversationItem: FC<Props> = ({ conversation, color }) => {
   const { id: currentUserId } = useSelector(selectLogin);
   const currentConversationId = useSelector(selectCurrentConversationId);
   const dispatch = useDispatch();
   const { id } = conversation.conversation;

   /**
    * Calculated boolean value which equates to true should this conversation
    * match the currentConversationId
    */
   const selected = useMemo(
      () => isSelectedConversation(conversation, currentConversationId),
      [conversation, currentConversationId]
   );
   /**
    * Local state for holding conversationName
    */
   const [conversationName, setConversationName] = useState('Loading..');
   /**
    * Handles the computation and updating of the conversation name.
    * 
    * Will re-render and re-compute conversation name should the conversation or
    * currentUserId props change.
    */
   useEffect(() => {
      computeConversationName(conversation, currentUserId).then((name) => {
         setConversationName(name);
      });
   }, [conversation, currentUserId]);

   /**
    * On button click will dispatch and event to update the current conversation
    * in Redux store to this conversation
    *
    * @param event HTMLButton Click Event
    */
   const onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault();
      dispatch(setCurrentConversation(id));
   };
   return (
      <S.ItemButton
         selected={selected}
         onClick={onClick}
         data-testid="conversation-item-button"
         color={color}
      >
         <AvatarWithLabel title={conversationName} key={id} color={color}  />
      </S.ItemButton>
   );
};

export default ConversationItem;
