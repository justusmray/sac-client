import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    parts: [

    ],
    status: 'idle',
    issue: {
        isOpen: false,
        trace: '',
    },
    error:'',
    issuesDialog: {
        isOpen: false,
        issues: [],
        trace: ''
    }


  
};
export const setPartsAsync = createAsyncThunk(
    'workView/fetchWork',
    async (trace) => {
        const parts = await axios.get(`http://192.168.0.90:5000/part/${trace}`)
        
      // The value we return becomes the `fulfilled` action payload
      return{
          parts: parts.data,
      };
    }
  );
export const createCompleteObjectAsync = createAsyncThunk(
'workView/createCompleteObject',
async (data) => {
    const part = await axios.put(`http://192.168.0.90:5000/part/${data.trace}`, {
        user: data.user,
        process: data.process,
        start: new Date(),
        end: new Date(),
        trackingNumber: data.trackingNumber, 
    },{validateStatus: () => true})
    if(part.data.message === 'Tracking Number required.'){
        console.log('bop')
        throw new Error('Tracking Number required.')
    }else{
        return{
            part: part.data,
        };
    }
}
);
export const deleteCompleteObjectAsync = createAsyncThunk(
    'workView/deleteCompleteObject',
    async (data) => {
        const part = await axios.put(`http://192.168.0.90:5000/part/${data.trace}/${data.process}`)
        
        // The value we return becomes the `fulfilled` action payload
        return{
            part: part.data,
        };
    }
    );

export const deleteTrackingNumberAsync = createAsyncThunk(
    'workView/deleteTrackingNumber',
    async (data) => {
        const part = await axios.delete(`http://192.168.0.90:5000/part/${data.trace}/${data.trackingNumber}`)
        
        // The value we return becomes the `fulfilled` action payload
        return{
            part: part.data,
        };
    }
    );
export const createIssueAsync = createAsyncThunk(
    'workView/createIssue',
    async (data) => {
        const part = await axios.put(`http://192.168.0.90:5000/part/newissue/${data.trace}`, data.issue)
        
        // The value we return becomes the `fulfilled` action payload
        return{
            part: part.data,
        };
    }
    );
export const resolveIssueAsync = createAsyncThunk(
    'workView/resolveIssue',
    async (data) => {
        const part = await axios.put(`http://192.168.0.90:5000/part/resolveissue/${data.trace}/${data.issueId}`, data.issue)
        
        // The value we return becomes the `fulfilled` action payload
        return{
            part: part.data,
        };
    }
    );

export const workViewSlice = createSlice({
    name: 'workView',
    initialState,
    reducers: {
        createCompleteObject: (state, action) => {
            let index = state.parts.findIndex(part => part.trace === action.payload.trace)
            state.parts[index].completeTracker.push({
                user: action.payload.user,
                process: action.payload.process,
                start: new Date(),
                end: new Date()
            })
        },
        toggleIssueIsOpen: (state) => {
            state.issue.isOpen = !state.issue.isOpen
        },
        setTrace: (state, action) => {
            state.issue.trace = action.payload
        },
        toggleIssuesDialogIsOpen: (state) => {
            state.issuesDialog.isOpen = !state.issuesDialog.isOpen
        },
        setIssuesDialogIssues: (state, action) => {
            state.issuesDialog.issues = action.payload.issues
        },
        setIssuesDialogTrace: (state, action) => {
            state.issuesDialog.trace = action.payload.trace
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(setPartsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(setPartsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.parts = action.payload.parts;
            
            })
            .addCase(createCompleteObjectAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createCompleteObjectAsync.fulfilled, (state, action) => {
                let index = state.parts.findIndex(part => part.trace === action.payload.part.trace)
                state.status = 'idle';
                state.parts[index] = action.payload.part
            })
            .addCase(createCompleteObjectAsync.rejected, (state, action) => {
                console.log(action);
                state.status = 'error';
                state.error = action.error.message
            })
            .addCase(deleteCompleteObjectAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCompleteObjectAsync.fulfilled, (state, action) => {
                let index = state.parts.findIndex(part => part.trace === action.payload.part.trace)
                state.status = 'idle';
                state.parts[index] = action.payload.part
            })
            .addCase(deleteTrackingNumberAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTrackingNumberAsync.fulfilled, (state, action) => {
                let index = state.parts.findIndex(part => part.trace === action.payload.part.trace)
                state.status = 'idle';
                state.parts[index] = action.payload.part
            })
            .addCase(createIssueAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createIssueAsync.fulfilled, (state, action) => {
                let index = state.parts.findIndex(part => part.trace === action.payload.part.trace)
                state.status = 'idle';
                state.parts[index] = action.payload.part
            })
            .addCase(resolveIssueAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resolveIssueAsync.fulfilled, (state, action) => {
                let index = state.parts.findIndex(part => part.trace === action.payload.part.trace)
                state.status = 'idle';
                state.parts[index] = action.payload.part
            })

      },

});

export const { toggleIssueIsOpen, setTrace, toggleIssuesDialogIsOpen, setIssuesDialogIssues, setIssuesDialogTrace} = workViewSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectParts = (state) => state.workView.parts
export const selectStatus = (state) => state.workView.status
export const selectIssue = (state) => state.workView.issue
export const selectIssueDialog = (state) => state.workView.issuesDialog



export default workViewSlice.reducer;
