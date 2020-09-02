import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Conversation } from '../../Api/@types';
import ConversationApi from '../../Api/ConversationApi';

type LoadingStatus = 'rejected' | 'pending' | 'fulfilled';

interface conversationState {
   conversations: Conversation[];
   currentConversation: Conversation | null;
   status: LoadingStatus;
}

const initialState: conversationState = {
   conversations: [],
   currentConversation: null,
   status: 'pending',
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
   name: 'login',
   initialState,
   reducers: {
      selectCurrentConversation(state, action) {
         const { payload } = action;
         const { conversations } = state;
         const conversation = conversations.find(
            (conversation) => conversation.conversation.conversationId === payload
         );
         state.currentConversation = conversation || null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchConversations.fulfilled, (state, action) => {
            const { data, status } = action.payload;
            if (status === 200) {
               state.conversations = data;
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

// export const {  } = conversationSlice.actions;

export const selectConversations = (state: RootState) => state.conversations;
export const selectCurrentConversation = (state: RootState) => state.currentConversation;

export default conversationSlice.reducer;
