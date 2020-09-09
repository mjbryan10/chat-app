import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, LoadingStatus } from '../../app/store';
import { Conversation } from '../../shared/Api/types';
import ConversationApi from '../../shared/Api/ConversationApi';
import moment from 'moment';



interface conversationState {
   conversations: Conversation[];
   currentConversation: Conversation | null;
   currentConversationId: number | null;
   status: LoadingStatus;
}

const initialState: conversationState = {
   conversations: [],
   currentConversation: null,
   currentConversationId: null,
   status: 'fulfilled',
};
/**
 * Returns the date as a number for comparison or 0 if there was no date.
 *
 * @param lastseen Date string in 'YYYY-M-D H:mm:ss' format or null
 */
export const convertStringToUnix = (lastseen: string | null): number =>
   lastseen ? moment(lastseen, 'YYYY-M-D H:mm:ss').valueOf() : 0; //TODO: Consider extracting further
/**
 * Takes the newest conversations from an array of unfiltered conversations, removes any duplicates, removes
 * any conversations that do not have 2 or more persons in them and sorts the array chronologically (newest first)
 * before returning the result.
 *
 * @param conversations An array of unfiltered conversations
 * @param limit An optional limit, which offsets the amount from the unfiltered array which will be fileted
 * defaults to 20, increasing can affect performance.
 */
export const filterConversations = (
   conversations: Conversation[],
   limit: number = 20
) => {
   /**
    * Reduces the array to the last `limit` conversations, before filtering further.
    *
    * @reason: There is only one GET method currently for fetching conversations of a user, this returns all
    * conversations which can be a very lengthy array. Current test on user 1 (04-09-2020) returns over 4000.
    *
    * In order to reduce the weight of this, it is also prudent to filter the array down to a select few.
    */
   const limitedConversations = conversations.slice(conversations.length - limit);
   /**
    * Removes duplicates from the array, by comparing conversationIds.
    *
    * It appears the database is able to store duplicates of the same conversation
    * in order to help avoid this being an issue for React rendering (which uses conversationId as key)
    * and the impact to UX with duplicates, the conversations are therefore filtered to remove duplicates.
    *
    * There is a great post on stack overflow on how to best use ES6 to streamline a filter for object comparison.
    * @see https://stackoverflow.com/a/56757215/12873927
    */
   const conversationsWithNoDuplicates = limitedConversations.filter(
      (
         v,
         i,
         a //`v` = variable: Conversation, `i` = index: number, `a` = array: Conversation[], `c` = comparable conversation: Conversation
      ) =>
         a.findIndex(
            (c) => c.conversation.conversationId === v.conversation.conversationId
         ) === i
   );
   /**
    * Removes conversations without 2 or more participants from the array.
    */
   const conversationsWithUsers = conversationsWithNoDuplicates.filter(
      (conversation) => conversation.users.length > 1
   );

   /**
    * The result is the returned value of sorting the array chronologically (newest first).
    */
   const result = conversationsWithUsers.sort(
      (a, b) =>
         convertStringToUnix(b.conversation.lastseen) -
         convertStringToUnix(a.conversation.lastseen)
   );
   return result;
};

/**
 * conversationApi for communicating with backend.
 */
const conversationApi = new ConversationApi();
/**
 * Fetches conversations from the API which include the user
 */
export const fetchConversations = createAsyncThunk(
   'conversation/fetchConversations',
   async (userId: number) => {
      return conversationApi.fetchConversationsByUserId(userId);
   }
);

export const conversationSlice = createSlice({
   name: 'conversation',
   initialState,
   reducers: {
      setCurrentConversation(state, action) {
         const { payload } = action;
         const { conversations } = state;
         const conversation = conversations.find(
            (conversation) => conversation.conversation.conversationId === payload
         );
         state.currentConversation = conversation || null;
         state.currentConversationId = conversation?.conversation.id ?? null;
      },
      clearCurrentConversation(state) {
         state.currentConversation = null;
         state.currentConversationId = null;
      },
      clearConversations(state) {
         state.conversations = [];
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchConversations.fulfilled, (state, action) => {
            const { data, status } = action.payload;
            if (status === 200) {
               state.conversations = filterConversations(data);
               state.status = 'fulfilled';
            }
         })
         .addCase(fetchConversations.pending, (state, action) => {
            state.conversations = [];
            state.status = 'pending';
         })
         .addCase(fetchConversations.rejected, (state, action) => {
            state.status = 'rejected';
         })
   },
});

export const {
   setCurrentConversation,
   clearCurrentConversation,
   clearConversations,
} = conversationSlice.actions;

export const selectConversations = (state: RootState) => state.conversation.conversations;
export const selectCurrentConversation = (state: RootState) =>
   state.conversation.currentConversation;
export const selectCurrentConversationId = (state: RootState): number | null =>
   state.conversation.currentConversationId;
export const selectConversationStatus = (state: RootState) => state.conversation.status;
export default conversationSlice.reducer;
