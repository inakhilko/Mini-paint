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
    addPicture: (state: PicturesStore, action) => {
      state.pictures = [...state.pictures, action.payload];
    },
    getPictures: (state: PicturesStore, action) => {
      state.pictures = action.payload;
    },
  },
});

export const { addPicture, getPictures } = picturesSlice.actions;

export default picturesSlice.reducer;
