import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserApi from '../../shared/Api/UserApi';
import { User } from '../../shared/Api/types';
import { RootState, LoadingStatus } from '../../app/store';

//TYPES:

interface usersState {
   users: User[];
   lastUpdated: number;
   status: LoadingStatus;
   error: string;
}

const initialState: usersState = {
   users: [],
   lastUpdated: Date.now(),
   status: 'idle',
   error: ''
};

//ASYNC ACTIONS:

const userApi = new UserApi();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
   return await userApi.fetchAll();
});

//SLICE:

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
            }
            state.error = '';
            state.status = 'fulfilled';
         })
         .addCase(fetchUsers.pending, (state, action) => {
            state.status = 'pending';
         })
         .addCase(fetchUsers.rejected, (state, action) => {
            state.error = 'Unable to fetch users at this time';
            state.status = 'fulfilled';
         });
   },
});

//SELECTORS:

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;

//REDUCER:

export default usersSlice.reducer;
