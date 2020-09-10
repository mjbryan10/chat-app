import React, { useEffect, SyntheticEvent, useState } from 'react';
import * as S from './styles';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectConversations,
   fetchConversations,
   clearConversations,
   selectConversationStatus,
} from '../conversationSlice';
import { selectLogin, logoutUser } from 'features/login/loginSlice';
import { AiOutlinePlusSquare, AiOutlineCheckSquare } from 'react-icons/ai';
import ConversationSelector from '../ConversationSelector';
import ConversationUserSelector from '../ConversationUserSelector';
import {
   selectSelectedUsers,
   clearSelectedUsers,
   clearSelectableUsers,
} from 'features/users/usersSlice';
import ConversationApi from 'shared/Api/ConversationApi';
import InputTextFieldWithLabel from 'components/InputTextFieldWithLabel';

const ConversationContainer = () => {
   //REDUX:
   const conversations = useSelector(selectConversations);
   const { id: currentUserId } = useSelector(selectLogin);
   const status = useSelector(selectConversationStatus);
   const selectedUsers = useSelector(selectSelectedUsers); //TODO:
   const dispatch = useDispatch();

   //STATE:
   /**
    * State for managing if container should render conversation
    * selection or creation components.
    */
   const [isCreateMode, setIsCreateMode] = useState(false);
   const [error, setError] = useState('');
   const [conversationName, setConversationName] = useState('');
   /**
    * Handles the fetching and clearing of conversations
    */

   //CYCLE EFFECTS:
   useEffect(() => {
      if (currentUserId && !isCreateMode) {
         dispatch(fetchConversations(currentUserId));
      }
      return () => {
         dispatch(clearConversations);
      };
   }, [currentUserId, dispatch, isCreateMode]);

   //METHODS:
   /**
    * Handles the button clicking depending on if it is in create mode
    * @param event Button click event
    */
   const onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const newMode = !isCreateMode;
      if (!isCreateMode) {
         setError('');
         setIsCreateMode(newMode);
         return;
      }
      //Validation
      if (!currentUserId) {
         dispatch(logoutUser());
         return;
      }
      if (!selectedUsers.length) {
         setError('Select who you wish to speak with first');
         return;
      }
      if (selectedUsers.length >= 2 && !conversationName.length) {
         setError('Group conversations need a name');
         return;
      }

      //Create conversation
      const conversationApi = new ConversationApi();
      const userIds: number[] = selectedUsers.map((user) => user.id);
      userIds.push(currentUserId);
      const resolveCreation = () => {
         dispatch(clearSelectedUsers());
         dispatch(clearSelectableUsers());
         setConversationName('');
         dispatch(fetchConversations(currentUserId));
         setIsCreateMode(newMode);
      };
      if (selectedUsers.length === 1) {
         conversationApi
            .createNewPersonalConversation(userIds)
            .then((res) => {
               console.log('conversationApi -> res', res);
               resolveCreation();
            })
            .catch((error) => {
               console.error(error);
            });
      } else if (selectedUsers.length >= 2) {
         conversationApi
            .createNewGroupConversation(userIds, conversationName)
            .then((res) => {
               console.log('conversationApi -> res', res);
               resolveCreation();
            })
            .catch((error) => {
               console.error(error);
            });
      }
   };

   const handleConversationNameChange = (value: string) => {
      setError('');
      setConversationName(value);
   };
   return (
      <S.Container>
         <S.Header>Conversations</S.Header>
         <S.Display>
            {isCreateMode ? (
               <ConversationUserSelector />
            ) : (
               <ConversationSelector
                  status={status}
                  conversations={[...conversations, ...conversations, ...conversations]}
               />
            )}
         </S.Display>
         <S.ControlsContainer>
            {selectedUsers.length >= 2 ? (
               <InputTextFieldWithLabel
                  labelValue="Group Name"
                  handleChange={handleConversationNameChange}
               />
            ) : null}
            {error.length ? <S.ErrorText>{error}</S.ErrorText> : null}
            <S.Button onClick={onClick} isCreateMode={isCreateMode}>
               {isCreateMode ? (
                  <AiOutlineCheckSquare size="3rem" />
               ) : (
                  <AiOutlinePlusSquare size="3rem" />
               )}
               Create new conversation
            </S.Button>
         </S.ControlsContainer>
      </S.Container>
   );
};

export default ConversationContainer;
