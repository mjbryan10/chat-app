import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import UserApi from '../../shared/Api/UserApi';
import { User } from '../../shared/Api/types';
import { RootState, LoadingStatus } from '../../app/store';

//TYPES:

interface usersState {
   allUsers: User[];
   selectableUsers: User[];
   selectedUsers: User[];
   lastUpdated: number;
   status: LoadingStatus;
   error: string;
}

const initialState: usersState = {
   allUsers: [],
   selectableUsers: [],
   selectedUsers: [],
   lastUpdated: Date.now(),
   status: 'idle',
   error: '',
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
   reducers: {
      //selectedUsers
      addUserToSelected(state, action: PayloadAction<User>) {
         const newArray = [...state.selectedUsers, action.payload];
         state.selectedUsers = newArray;
      },
      removeUserFromSelected(state, action: PayloadAction<User>) {
         const { payload } = action;
         const newArray = [...state.selectedUsers].filter(
            (user) => user.id !== payload.id
         );
         state.selectedUsers = newArray;
      },
      setSelectedUsers(state, action: PayloadAction<User[]>) {
         state.selectedUsers = action.payload;
      },
      clearSelectedUsers(state) {
         state.selectedUsers = [];
      },
      //selectableUsers
      addUserToSelectable(state, action: PayloadAction<User>) {
         const newArray = [...state.selectableUsers, action.payload];
         state.selectableUsers = newArray;
      },
      removeUserFromSelectable(state, action: PayloadAction<User>) {
         const { payload } = action;
         const newArray = [...state.selectableUsers].filter(
            (user) => user.id !== payload.id
         );
         state.selectableUsers = newArray;
      },
      setSelectableUsers(state, action: PayloadAction<User[]>) {
         state.selectableUsers = action.payload;
      },
      clearSelectableUsers(state) {
         state.selectableUsers = [];
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchUsers.fulfilled, (state, action) => {
            const now = Date.now();
            if (now > state.lastUpdated) {
               state.selectableUsers = action.payload;
               state.allUsers = action.payload;
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

//ACTIONS:

export const {
   addUserToSelected,
   removeUserFromSelected,
   clearSelectedUsers,
   setSelectedUsers,
   addUserToSelectable,
   removeUserFromSelectable,
   clearSelectableUsers,
   setSelectableUsers,
} = usersSlice.actions;

//SELECTORS:
export const selectUsers = (state: RootState) => state.users.allUsers;
export const selectSelectableUsers = (state: RootState) => state.users.selectableUsers
export const selectSelectedUsers = (state: RootState) => state.users.selectedUsers
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;

//REDUCER:

export default usersSlice.reducer;
