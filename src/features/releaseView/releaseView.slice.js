import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    releases: [

    ],
    status: 'needsUpdate',

  
};

export const createReleaseAsync = createAsyncThunk(
    'releaseView/createRelease',
    async (data) => {
        const release = await axios.post(`http://192.168.0.90:5000/api/releases/createRelease`, {release: data})
        
        return{
            release: release.data,
        };
    }
);

export const fetchReleasesAsync = createAsyncThunk(
    'releaseView/fetchReleases',
    async (data) => {
        const result = await axios.get(`http://192.168.0.90:5000/api/releases/${data}/getReleases`)
        
        return{
            releases: result.data.releases,
        };
    }
);
    
export const releaseViewSlice = createSlice({
    name: 'releaseView',
    initialState,
    reducers: {
        setNeedsUpdate: (state) => {
            state.status = 'needsUpdate'
        }
        

    },
    extraReducers:(builder) => {
        builder
            
            .addCase(createReleaseAsync.fulfilled, (state, action) => {
                state.status = 'needsUpdate';
                state.releases.push(action.payload.release);
            
            })
            .addCase(fetchReleasesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.releases = action.payload.releases;
            
            })
            .addMatcher(action => action.type.endsWith('pending'), (state) => {
                state.status = 'loading';
            })
            
    }

});

export const { setNeedsUpdate} = releaseViewSlice.actions;


export const selectReleasesStatus = (state) => state.releaseView.status;
export const selectReleases = (state) => state.releaseView.releases;
export const selectReleaseByTrace = (state, trace) => {
    const index = state.releaseView.releases.findIndex(release => release.trace === trace)
    return state.releaseView.releases[index];
}



export default releaseViewSlice.reducer;