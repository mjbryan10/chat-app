import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Message, NewMessagesResponse } from '../../shared/Api/@types';
import MessageApi from '../../shared/Api/MessageApi';
import moment from 'moment';
import { SpectrumColor } from 'shared/theme/@types';

/**
 * The arguments passed to the payLoadCreator for fetchNewMessages
 */
interface FetchNewMessagesArgs {
   conversationId: number;
   lastMessageId: number;
}
/**
 * The arguments passed to the payLoadCreator for fetchLimitedMessages
 */
interface fetchLimitedMessagesArgs {
   conversationId: number;
   limit?: number;
   offset?: number;
}
export interface Participant {
   id: number;
   name: string;
   color: SpectrumColor;
   isOwner: boolean;
}
/**
 * A helper type-guard function that validates if the NewMessagesResponse interface
 * is a `Message[]` or `{message: string}`
 *
 * @returns True if of type `Message[]`
 * @param apiResponse NewMessagesResponse from the API
 */
function hasNewMessages(apiResponse: NewMessagesResponse): apiResponse is Message[] {
   return Array.isArray(apiResponse as Message[]);
}

/**
 * String values available to the loading status.
 */
type LoadingStatus = 'rejected' | 'pending' | 'fulfilled';
/**
 * Interface for the messageSlice state
 */
interface messageState {
   messages: Message[];
   status: LoadingStatus;
   lastUpdated: number;
}

/**
 * Inital state for the messageSlice
 */
const initialState: messageState = {
   messages: [],
   status: 'pending',
   lastUpdated: Date.now(),
};

/**
 * conversationApi for communicating with backend.
 */
const messageApi = new MessageApi();

/**
 * Async Thunk action creator for fetching new messages from the API
 *
 * On success will update the redux store with the new messages (if available)
 *
 * @param payloadCreator `{conversationId, lastMessageId}`
 */
export const fetchNewMessages = createAsyncThunk(
   'conversation/fetchNewMessages',
   async ({ conversationId, lastMessageId }: FetchNewMessagesArgs) => {
      const response = await messageApi.fetchNewMessages(conversationId, lastMessageId);
      const { data } = response;

      if (!hasNewMessages(data)) response.data = [];
      return response;
   }
);

/**
 * Async Thunk action creator for fetching older messages.
 *
 * Will fetch `limit` amount of messages from the API,
 * going from most recent - offset backwards.
 *
 * @param payloadCreator `{conversationId, limit = 10, offset}`
 */
export const fetchOlderMessages = createAsyncThunk(
   'message/fetchOlderMessages',
   async ({ conversationId, limit = 10, offset = 0 }: fetchLimitedMessagesArgs) => {
      return messageApi.fetchLimitedMessages(conversationId, limit, offset);
   }
);

/**
 * Fetches the most recent messages of a conversation by its ID.
 *
 * Fetches 10 most recent, unless limit and offset stated.
 */
export const fetchConversationMessages = createAsyncThunk(
   'message/fetchConversationMessages',
   async ({ conversationId, limit = 10, offset = 0 }: fetchLimitedMessagesArgs) => {
      return messageApi.fetchLimitedMessages(conversationId, limit, offset);
   }
);

/**
 * Redux Toolkit slice responsible for creating actions and reducers for message
 * field of the redux store.
 */
export const messageSlice = createSlice({
   name: 'message',
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      builder
         /* fetchNewMessages */
         .addCase(fetchNewMessages.fulfilled, (state, action) => {
            const { data, status } = action.payload;
            const now = moment().valueOf();

            if (status === 200 && Array.isArray(data) && state.lastUpdated < now) {
               state.messages = [...state.messages, ...data];
               state.status = 'fulfilled';
               state.lastUpdated = now;
            }
         })
         .addCase(fetchNewMessages.pending, (state, action) => {
            state.status = 'pending';
         })
         .addCase(fetchNewMessages.rejected, (state, action) => {
            state.status = 'rejected';
         })

         /* fetchOlderMessages */
         .addCase(fetchOlderMessages.fulfilled, (state, action) => {
            const { data, status } = action.payload;
            if (status === 200) {
               state.messages = [...data, ...state.messages];
               state.status = 'fulfilled';
            }
         })
         .addCase(fetchOlderMessages.pending, (state, action) => {
            state.status = 'pending';
         })
         .addCase(fetchOlderMessages.rejected, (state, action) => {
            state.status = 'rejected';
         })

         /* fetchConversationMessages */
         .addCase(fetchConversationMessages.fulfilled, (state, action) => {
            const { data, status } = action.payload;
            if (status === 200) {
               state.messages = data;
               state.status = 'fulfilled';
            }
         })
         .addCase(fetchConversationMessages.pending, (state, action) => {
            state.messages = [];
            state.status = 'pending';
         })
         .addCase(fetchConversationMessages.rejected, (state, action) => {
            state.status = 'rejected';
         });
   },
});

/**
 * Returns the current messages in the store
 * @param state The current Root State
 */
export const selectMessages = (state: RootState) => state.message.messages;
/**
 * Returns the current message loading status
 * @param state The current Root State
 */
export const selectMessageLoadingStatus = (state: RootState) => state.message.status;

export default messageSlice.reducer;
