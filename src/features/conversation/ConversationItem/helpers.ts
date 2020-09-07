import { Conversation } from "shared/Api/@types";
import UserApi from "shared/Api/UserApi";

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
    try {
      return await new UserApi().fetchUserNameById(friendUser.userid)
    } catch (error) {
      return 'Anonymous'
    } //TODO: Test if this works!
    
    //  const response = await new UserApi().fetchUserNameById(friendUser.userid)
     

    //  return response.data ? response.data.name : 'Anonymous';
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