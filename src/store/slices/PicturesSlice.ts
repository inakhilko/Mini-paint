import { createSlice } from '@reduxjs/toolkit';

interface Picture {
  picture: string;
}
interface PicturesStore {
  pictures: Picture[];
}

const initialState = {
  pictures: [],
};

const picturesSlice = createSlice<PicturesStore>({
  name: 'pictures',
  initialState,
  reducers: {
    getPictures: (state: PicturesStore, action) => {
      state.pictures = action.payload;
    },
  },
});

export const { getPictures } = picturesSlice.actions;

export default picturesSlice.reducer;
