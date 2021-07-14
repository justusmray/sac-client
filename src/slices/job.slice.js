import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobs: [

    ],
    releases: [

    ],
    details: [

    ],
    parts: [

    ], 

  
};

export const uiSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload
        },
        setReleases: (state, action) => {
            state.releases = action.payload
        },
        setDetails: (state, action) => {
            state.details = action.payload
        },
        setParts: (state, action) => {
            state.parts = action.payload
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
