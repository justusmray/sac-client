import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isOpen: false,

};
    
export const detailEditorSlice = createSlice({
    name: 'detailEditor',
    initialState,
    reducers: {
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        }
    },
});

export const { setIsOpen } = detailEditorSlice.actions;

export const selectDetailEditorIsOpen = (state) => state.detailEditor.isOpen;

export default detailEditorSlice.reducer;