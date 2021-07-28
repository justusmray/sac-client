import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    details: [],
    status: 'needsUpdate',
};

export const createDetailAsync = createAsyncThunk(
    'detailView/createDetail',
    async (data) => {
        try{
            const detail = await axios.post(`http://192.168.0.90:5000/api/details/createDetail`, {detail: data})
        }catch(error){
            console.log(error.message);
        }
        
        
        // return{ 
        //     detail: detail.data,
        // };
    }
);


export const fetchDetailsAsync = createAsyncThunk(
    'detailView/fetchReleases',
    async (data) => {
        const results = await axios.get(`http://192.168.0.90:5000/api/details/${data}/getDetails`)
        
        return{
            details: results.data.details,
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
            .addCase(fetchDetailsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDetailsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.details = action.payload.details;
            })
            .addMatcher(action => action.type === 'detailCreator/createDetail/fulfilled', (state) => {
                state.status = 'needsUpdate';
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