import React, { useEffect, SyntheticEvent, useState } from 'react';
import * as S from './styles';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectConversations,
   fetchConversations,
   clearConversations,
   selectConversationStatus,
} from '../conversationSlice';
import { selectLogin } from 'features/login/loginSlice';
import { AiOutlinePlusSquare, AiOutlineCheckSquare } from 'react-icons/ai';
import ConversationSelector from '../ConversationSelector';
import ConversationUserSelector from '../ConversationUserSelector';
import { selectSelectedUsers } from 'features/users/usersSlice';

const ConversationContainer = () => {
   //REDUX:
   const conversations = useSelector(selectConversations);
   const { id: currentUserId } = useSelector(selectLogin);
   const status = useSelector(selectConversationStatus);
   // const selectedUsers = useSelector(selectSelectedUsers) //TODO:
   const dispatch = useDispatch();
   /**
    * State for managing if container should render conversation
    * selection or creation components.
    */
   const [isCreateMode, setIsCreateMode] = useState(false);
   /**
    * Handles the fetching and clearing of conversations
    */
   useEffect(() => {
      if (currentUserId && !isCreateMode) {
         dispatch(fetchConversations(currentUserId));
      }
      return () => {
         dispatch(clearConversations);
      };
   }, [currentUserId, dispatch, isCreateMode]);

   /**
    * Handles the button clicking depending on if it is in create mode
    * @param event Button click event
    */
   const onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const newMode = !isCreateMode;
      if (!isCreateMode) {
         setIsCreateMode(newMode);
      } else {
         //TODO: Post conversation data selectedUsers

         setIsCreateMode(newMode);
      }
   };

   // const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
   // const handleUsersClick = (user: User) => {
   //    console.log('ConversationContainer -> handleUsersClick -> user', user);
   //    const index = selectedUsers.findIndex((item) => item.id === user.id);
   //    const updatedSelectedUsers = selectedUsers;
   //    if (index >= 0) updatedSelectedUsers.splice(index, 1);
   //    else updatedSelectedUsers.push(user);
   //    setSelectedUsers(updatedSelectedUsers);
   // };
   return (
      <S.Container>
         <S.Header>Conversations</S.Header>
         {isCreateMode ? (
            <ConversationUserSelector />
         ) : (
            <ConversationSelector status={status} conversations={conversations} />
         )}

         <S.Button onClick={onClick} isCreateMode={isCreateMode}>
            {isCreateMode ? (
               <AiOutlineCheckSquare size="3rem" />
            ) : (
               <AiOutlinePlusSquare size="3rem" />
            )}
            Create new conversation
         </S.Button>
      </S.Container>
   );
};

export default ConversationContainer;
