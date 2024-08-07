import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice.ts';
import picturesReducer from './slices/PicturesSlice.ts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    pictures: picturesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
