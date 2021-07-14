import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    pageHeader: 'hi',
    isInvisible: false,
    navDrawerIsOpen: false,
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    toggleInvisible: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.header.isVisible = !state.header.isVisible;
    },
    setPageHeader: (state, action) => {
      state.pageHeader = action.payload
    },
    toggleNavDrawerIsOpen: (state, action) => {
      state.navDrawerIsOpen = !state.navDrawerIsOpen
    }
    
  },

});

export const { toggleInvisible, setPageHeader, toggleNavDrawerIsOpen} = headerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.header.value)`
export const selectIsVisible = (state) => state.isVisible;
export const selectPageHeader = (state) => state.pageHeader;
export const selectNavDrawerIsOpen = (state) => state.header.navDrawerIsOpen



export default headerSlice.reducer;
