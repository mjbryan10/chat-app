import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginSlice from '../features/login/loginSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
