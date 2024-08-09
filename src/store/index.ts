import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice.ts';
import picturesReducer from './slices/PicturesSlice.ts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    pictures: picturesReducer,
  },
});

export default store;
