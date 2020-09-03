import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Conversation } from '../../Api/@types';
import ConversationApi from '../../Api/ConversationApi';

type LoadingStatus = 'rejected' | 'pending' | 'fulfilled';

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
 * conversationApi for communicating with backend.
 */
const conversationApi = new ConversationApi();

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
      clearCurrentConversation(state, action) {
         state.currentConversation =  null;
         state.currentConversationId = null;
      },
      clearConversations(state, action) {
         state.conversations = [];
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchConversations.fulfilled, (state, action) => {
            const { data, status } = action.payload;
            if (status === 200) {
               /**
                * It appears the database is able to store duplicates of the same conversation
                * in order to help avoid this being an issue for React rendering (which uses conversationId as key)
                * and the impact to UX with duplicates, I will implement a filter on the conversations.
                * 
                * There is a great post on stack overflow on how to best use ES6 to streamline a filter for object comparison.
                * @see https://stackoverflow.com/a/56757215/12873927
                */
               state.conversations = data.filter((v,i,a)=>a.findIndex(t=>(t.conversation.conversationId === v.conversation.conversationId))===i);
               state.status = 'fulfilled';
            }
         })
         .addCase(fetchConversations.pending, (state, action) => {
            state.conversations = [];
            state.status = 'pending';
         })
         .addCase(fetchConversations.rejected, (state, action) => {
            state.status = 'rejected';
         });
   },
});

export const { setCurrentConversation, clearCurrentConversation, clearConversations } = conversationSlice.actions;

export const selectConversations = (state: RootState) => state.conversation.conversations;
export const selectCurrentConversation = (state: RootState) => state.conversation.currentConversation;
export const selectCurrentConversationId = (state: RootState) => state.conversation.currentConversationId;
export const selectConversationStatus = (state: RootState) => state.conversation.status;
export default conversationSlice.reducer;
