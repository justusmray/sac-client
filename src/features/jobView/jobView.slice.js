import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    jobs: [

    ],
    status: 'needsUpdate',

  
};

export const createJobAsync = createAsyncThunk(
    'jobView/createJob',
    async (data) => {
        const job = await axios.post(`http://192.168.0.90:5000/job/`, data)
        
        return{
            job: job.data,
        };
    }
);

export const fetchJobsAsync = createAsyncThunk(
    'jobView/fetchjobs',
    async (data) => {
        const jobs = await axios.get(`http://192.168.0.90:5000/job/`, data)
        
        return{
            jobs: jobs.data,
        };
    }
);
    
export const jobViewSlice = createSlice({
    name: 'jobView',
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload
        },
        setNeedsUpdate: (state) => {
            state.status = 'needsUpdate'
        }
        

    },
    extraReducers:(builder) => {
        builder
            
            .addCase(createJobAsync.fulfilled, (state, action) => {
                state.status = 'needsUpdate';
                state.jobs.push(action.payload.job);
            
            })
            .addCase(fetchJobsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.jobs = action.payload.jobs;
            
            })
            .addMatcher(action => action.type.endsWith('pending'), (state) => {
                state.status = 'loading';
            })
            
    }

});

export const { toggleVisible, setNeedsUpdate} = jobViewSlice.actions;


export const selectJobsStatus = (state) => state.jobView.status;
export const selectJobs = (state) => state.jobView.jobs;
export const selectJobByTrace = (state, trace) => {
    const index = state.jobView.jobs.findIndex(job => job.trace === trace)
    return state.jobView.jobs[index];
}



export default jobViewSlice.reducer;