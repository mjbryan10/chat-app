import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginSlice } from '../login/loginSlice';
import { RootState } from '../../app/store';

type ThemeName = 'dark' | 'light';

interface usersState {
   theme: ThemeName;
}

const initialState: usersState = {
   theme: 'dark',
};

export const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      toggleTheme(state) {
         const newTheme = state.theme === 'dark' ? 'light' : 'dark';
         state.theme = newTheme;
      },
      setTheme(state, action: PayloadAction<ThemeName>) {
         state.theme = action.payload;
      },
   },
});

export const selectTheme = (state: RootState) => state.theme;

export default loginSlice.reducer;
