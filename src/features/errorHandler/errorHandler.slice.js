import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'standby',
    error: {},

  
};

export const errorHandlerSlice = createSlice({
    name: 'errorHandler',
    initialState,
    reducers: {
        clearError: (state) => {
            state.status = 'standby'
            state.error = {name: 'none'}
        }
    },
    extraReducers:(builder) => {
        builder
            .addMatcher((action) => {
                return action.type.endsWith('rejected')
            }, (state, action) => {
                console.log(action)
                state.status = 'error'
                state.error = action.error
            })
            .addMatcher((action) => {
                return action.type.endsWith('fulfilled')
            }, (state) => {
                state.status = 'standby'
                state.error = {}
            })
    }

});

export const {clearError} = errorHandlerSlice.actions;


export const selectErrorStatus = (state) => state.errorHandler.status;
export const selectErrorMessage = (state) => state.errorHandler.message;




export default errorHandlerSlice.reducer;