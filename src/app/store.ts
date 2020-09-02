import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import usersReducer from '../features/users/usersSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
