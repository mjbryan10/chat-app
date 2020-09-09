import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

//TYPES:

type NavigationSelection = 'conversation' | 'message';

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
   selection: 'conversation',
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
      toggleNavigation(state) {
         const newState = state.selection === 'conversation' ? 'message' : 'conversation';
         state.selection = newState;
      },
      setNavigationState(state, action) {
        state.selection = action.payload;
      }
   },
});

//EXPORTS:

export const {toggleNavigation, setNavigationState } = navigationSlice.actions;

/**
 * Returns the current state of navigation from the store
 * @param state The current Root State
 */
export const selectNavigationState = (state: RootState) => state.navigation.selection;

export default navigationSlice.reducer;
