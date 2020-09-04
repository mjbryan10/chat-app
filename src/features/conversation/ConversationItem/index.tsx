import React, { SyntheticEvent, FC, useMemo, useEffect, useState } from 'react';
import * as S from './styles';
import AvatarWithLabel from 'components/AvatarWithLabel';
import { Conversation } from 'Api/@types';
import UserApi from 'Api/UserApi';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin } from 'features/login/loginSlice';
import {
   selectCurrentConversationId,
   setCurrentConversation,
} from '../conversationSlice';

interface Props {
   conversation: Conversation;
   currentUserId: number;
}

/**
 * Returns the conversation name if it is recorded.
 * 
 * If the name is not recorded, searches the coversation for another user,
 * and returns that users name if that is available.
 * 
 * If unable to find users name from API returns 'Anonymous'
 * 
 * Default returns 'Unknown conversation name' if all else fails.
 * @param conversation The conversation the name relates to
 * @param currentUserId The current user requesting the conversation name
 */
export const computeConversationName = async (
   conversation: Conversation,
   currentUserId: number | null
): Promise<string> => {
   const { name } = conversation.conversation;

   if (name) return name;

   const friendUser = conversation.users.find((user) => user.userid !== currentUserId);

   if (friendUser) {
      const response = await new UserApi().fetchById(friendUser.userid);

      return response.data ? response.data.name : 'Anonymous';
   }
   return 'Unknown conversation name';
};

/**
 * Compares a conversation to the one in the Redux store and returns `true` if this conversation
 * is the selected on in the redux store.
 * 
 * Returns `false` if otherwise.
 * @param conversation the conversation to compare to selected conversation
 * @param currentConversationId The ID of the current conversation selected in Redux store
 */
export const isSelectedConversation = (
   conversation: Conversation,
   currentConversationId: number | null
): boolean => {
   if (!currentConversationId) return false;
   if (conversation.conversation.conversationId === currentConversationId) return true;
   return false;
};

/**
 * A React functional component for rendering a conversation option.
 * 
 * When the component is clicked by the user it will update the current conversation in
 * the Redux store.
 * @param conversation The conversation to which this card item relates to.
 */
const ConversationItem: FC<Props> = ({ conversation }) => {
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
      >
         <AvatarWithLabel title={conversationName} key={id} />
      </S.ItemButton>
   );
};

export default ConversationItem;
