import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import usersReducer from '../features/users/usersSlice';
import themeReducer from '../features/theme/themeSlice';
import conversationReducer from '../features/conversation/conversationSlice';
import messageReducer from '../features/message/messageSlice';
import navigationReducer from '../features/navigation/navigationSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    theme: themeReducer,
    conversation: conversationReducer,
    message: messageReducer,
    navigation: navigationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/**
 * String values available to the loading status.
 */
export type LoadingStatus = 'rejected' | 'pending' | 'fulfilled' | 'idle';
