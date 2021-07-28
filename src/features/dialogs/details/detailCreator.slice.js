import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isOpen: false,
    status: 'idle',

};
export const createDetailAsync = createAsyncThunk(
    'detailCreator/createDetail',
    async (data, {rejectWithValue}) => {
        try{
            const result = await 
            axios.post(`${process.env.REACT_APP_API_IP}/api/details/createDetail`, {detail: {
                parentTrace: data.parentTrace,
                qty: data.qty,
                detailName: data.detailName,
            }})
            if(result.response){
                console.log('oioi')
            }
            // return {
            //     detail: result.data
            // }
        }
        catch(error){
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
)
  
export const detailCreatorSlice = createSlice({
    name: 'detailCreator',
    initialState,
    reducers: {
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
        setStatus: (state) => {
            state.status = 'idle'
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(createDetailAsync.fulfilled, (state, action) => {
                state.status = 'needsUpdate';
            })
            .addCase(createDetailAsync.rejected, (state, action) => {

            })
    }
});

export const { 
    setIsOpen,
    setStatus
} = detailCreatorSlice.actions;

export const selectDetailCreatorIsOpen = (state) => state.detailCreator.isOpen;
export const selectDetailCreatorStatus = (state) => state.detailCreator.status;

export default detailCreatorSlice.reducer;