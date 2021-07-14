import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    details: [],
    status: 'needsUpdate',
};

export const createDetailAsync = createAsyncThunk(
    'detailView/createDetail',
    async (data) => {
        const detail = await axios.post(`http://192.168.0.90:5000/detail/`, data)
        
        return{ 
            detail: detail.data,
        };
    }
);


export const fetchDetailsAsync = createAsyncThunk(
    'detailView/fetchReleases',
    async (data) => {
        const details = await axios.get(`http://192.168.0.90:5000/detail/${data}`)
        
        return{
            details: details.data,
        };
    }
);
    
export const detailViewSlice = createSlice({
    name: 'detailView',
    initialState,
    reducers: {
        setNeedsUpdate: (state) => {
            state.status = 'needsUpdate'
        }
        

    },
    extraReducers:(builder) => {
        builder
            
            .addCase(createDetailAsync.fulfilled, (state, action) => {
                state.status = 'needsUpdate';
                state.details.push(action.payload.detail);
            
            })
            .addCase(fetchDetailsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.details = action.payload.details;
            
            })
            .addMatcher(action => action.type.endsWith('pending'), (state) => {
                state.status = 'loading';
            })
            
    }

});

export const { setNeedsUpdate} = detailViewSlice.actions;


export const selectDetailsStatus = (state) => state.detailView.status;
export const selectDetails = (state) => state.detailView.details;
export const selectDetailByTrace = (state, trace) => {
    const index = state.detailView.details.findIndex(detail => detail.trace === trace)
    return state.detailView.details[index];
}



export default detailViewSlice.reducer;