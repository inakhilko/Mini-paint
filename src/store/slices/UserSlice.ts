import { createSlice } from '@reduxjs/toolkit';

interface UserStore {
  email: string | null;
  token: string | null;
  id: string | null;
  isAuth: boolean;
}

const initialState = {
  email: null,
  token: null,
  id: null,
  isAuth: false,
};

const userSlice = createSlice<UserStore>({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserStore, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    removeUser: (state: UserStore) => {
      state.email = null;
      state.id = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
