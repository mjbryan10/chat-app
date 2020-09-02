import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserApi from '../../Api/UserApi';
import { User } from '../../Api/@types';
import { loginSlice } from '../login/loginSlice';
import { RootState } from '../../app/store';

interface usersState {
   users: User[];
   lastUpdated: number;
   error: boolean;
}

const initialState: usersState = {
   users: [],
   lastUpdated: Date.now(),
   error: false
};

const userApi = new UserApi();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
   return await userApi.fetchAll();
});

export const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchUsers.fulfilled, (state, action) => {
            const now = Date.now();
            if(now > state.lastUpdated) {
               state.users = action.payload;
               state.lastUpdated = now;
               state.error = false;
            }
         })
         .addCase(fetchUsers.pending, (state, action) => {
            state.error = false;
         })
         .addCase(fetchUsers.rejected, (state, action) => {
            state.error = true;
         });
   },
});

export const selectUsers = (state: RootState) => state.users;

export default loginSlice.reducer;
