import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

//TYPES:

type NavigationSelection = 'conversation' | 'message' | 'index';

/**
 * Interface for the navigationSlice state
 */
interface navigationState {
   selection: NavigationSelection;
}

/**
 * Inital state for the navigationSlice
 */
const initialState: navigationState = {
   selection: 'index',
};

//SLICE:

/**
 * Redux Toolkit slice responsible for creating actions and reducers for navigation
 * field of the redux store.
 */
export const navigationSlice = createSlice({
   name: 'navigation',
   initialState,
   reducers: {
      setNavigationState(state, action) {
        state.selection = action.payload;
      }
   },
});

//EXPORTS:

export const { setNavigationState } = navigationSlice.actions;

/**
 * Returns the current state of navigation from the store
 * @param state The current Root State
 */
export const selectNavigationState = (state: RootState) => state.navigation.selection;

export default navigationSlice.reducer;
