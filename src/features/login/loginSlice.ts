import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../Api/@types';
import UserApi from '../../Api/UserApi';

interface loginState {
   id: number | null;
   name: string | null;
   isAuthenticated: null | boolean;
}

const initialState: loginState = {
   id: null,
   name: null,
   isAuthenticated: null,
};

const userApi = new UserApi();

/**
 * Asynchronous Thunk action that takes an object containing `id` and `name`
 * 
 * Updates the state with the user credentials and if the user was authenticated.
 */
export const loginUser = createAsyncThunk(
   'users/authenticateUser',
   async (user: User, thunkAPI) => {
      const { id, name } = user;
      return await userApi.authenticateUser(id, name);
   }
);

export const loginSlice = createSlice({
   name: 'login',
   initialState,
   reducers: {
      logoutUser(state) {
         state.id = null;
         state.name = null;
         state.isAuthenticated = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload.isAuthenticated !== false) {
               state.id = action.payload.id;
               state.name = action.payload.name;
            } else {
               state.id = null;
               state.name = null;
               state.isAuthenticated = false;
            }
         })
         .addCase(loginUser.pending, (state, action) => {
            state.id = null;
            state.name = null;
            state.isAuthenticated = null;
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.id = null;
            state.name = null;
            state.isAuthenticated = false;
         });
   },
});

export const { logoutUser } = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
