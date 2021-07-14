import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  header: {
      locationText: '',
      isVisible: true,

  }
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleVisible: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.header.isVisible = !state.header.isVisible;
    },
    setLocationText: (state, action) => {
      state.header.locationText = action.payload
    },
    
  },

});

export const { toggleVisible, setLocationText} = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsVisible = (state) => state.header.isVisible;
export const selectLocationText = (state) => state.header.locationText;



export default counterSlice.reducer;
