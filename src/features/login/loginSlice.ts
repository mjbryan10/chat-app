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

/**
 * userApi for communicating with backend.
 */
const userApi = new UserApi();

/**
 * Asynchronous Thunk action that takes an object containing `id` and `name`
 *
 * Updates the state with the user credentials and if the user was authenticated.
 */
export const loginUser = createAsyncThunk(
   'login/authenticateUser',
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
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.isAuthenticated = action.payload.isAuthenticated;
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

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
