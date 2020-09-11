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
import {
   setNavigationState,
   selectNavigationState,
} from 'features/navigation/navigationSlice';

const ConversationContainer = () => {
   //REDUX:
   const conversations = useSelector(selectConversations);
   const { id: currentUserId } = useSelector(selectLogin);
   const status = useSelector(selectConversationStatus);
   const selectedUsers = useSelector(selectSelectedUsers);
   const navigationState = useSelector(selectNavigationState);
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

   /**
    * Fetches new conversations.
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
    * Subscribes to the nagivationState and reacts when is set to index.
    * 
    * This allows user to use navigation tools to escape creation process.
    */
   useEffect(() => {
      if (navigationState === 'index' && isCreateMode) {
         dispatch(clearSelectedUsers());
         dispatch(clearSelectableUsers());
         setError('');
         setIsCreateMode(false);
      }
   }, [dispatch, isCreateMode, navigationState]);

   //METHODS:

   /**
    * toggles the create mode state. If the new mode is to be the create mode
    * it informs redux of the new navigation state.
    */
   const toggleCreateMode = () => {
      const newMode = !isCreateMode;
      setError('');
      setIsCreateMode(newMode);
      if (newMode) {
         dispatch(setNavigationState('conversation'));
         dispatch(clearConversations());
      }
   };
   /**
    * Validates the creation process, updating the error state where
    * appropiate
    */
   const validateCreation = (): boolean => {
      if (!currentUserId) {
         dispatch(logoutUser());
         return false;
      }
      if (!selectedUsers.length) {
         setError('Select who you wish to speak with first');
         return false;
      }
      if (selectedUsers.length >= 2 && !conversationName.length) {
         setError('Group conversations need a name');
         return false;
      }
      return true;
   };
   /**
    *
    */
   const createConversation = () => {
      if (!currentUserId || !validateCreation()) return;
      //Shorcuts and does not process if cannot validate.
      const conversationApi = new ConversationApi();
      const userIds: number[] = selectedUsers.map((user) => user.id);
      userIds.push(currentUserId);

      if (selectedUsers.length === 1) {
         conversationApi
            .createNewPersonalConversation(userIds)
            .then((res) => {
               resolveCreation();
            })
            .catch((error) => {
               console.error(error);
               setError('Oops, something went wrong. Please try again later.');
            });
      } else if (selectedUsers.length >= 2) {
         conversationApi
            .createNewGroupConversation(userIds, conversationName)
            .then((res) => {
               resolveCreation();
            })
            .catch((error) => {
               console.error(error);
               setError('Oops, something went wrong. Please try again later.');
            });
      }
   };
   const resolveCreation = () => {
      dispatch(clearSelectedUsers());
      dispatch(clearSelectableUsers());
      setConversationName('');
      toggleCreateMode();
      if (currentUserId) {
         dispatch(fetchConversations(currentUserId));
      }
   };
   /**
    * Handles the button clicking depending on if it is in create mode
    * @param event Button click event
    */
   const onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (!isCreateMode) {
         toggleCreateMode();
         return;
      }
      createConversation();
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
               <ConversationSelector status={status} conversations={conversations} data-testid="conversation-selector" />
            )}
         </S.Display>
         <S.ControlsContainer>
            {selectedUsers.length >= 2 ? (
               <InputTextFieldWithLabel
                  labelValue="Group Name"
                  handleChange={handleConversationNameChange}
                  data-testid="conversation-name-input"
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
