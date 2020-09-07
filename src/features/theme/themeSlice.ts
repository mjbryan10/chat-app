import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ThemeName } from '../../shared/theme/@types';

interface themeState {
   currentTheme: ThemeName;
}

const initialState: themeState = {
   currentTheme: 'dark',
};

export const themeSlice = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      toggleTheme(state) {
         const newTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
         state.currentTheme = newTheme;
      },
      setTheme(state, action: PayloadAction<ThemeName>) {
         state.currentTheme = action.payload;
      },
   },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.currentTheme;

export default themeSlice.reducer;
