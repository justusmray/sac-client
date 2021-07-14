import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
    issueCreationDialog:{
        isOpen: false,
        targetTrace: '',
        type: '',
        text: '',

    },
    issueListDialog: {
        isOpen: false,
        issues: [],

    },
    isOpen: {
        jobAuthor: false,
        releaseAuthor: false,
        detailAuthor: false,
    },
    jobAuthor: {
        isOpen: false,
        status: 'idle',
        type: 'create',

    },
    releaseAuthor: {
        isOpen: false,
        status: 'idle',
        trace: '',
        type: 'create',
    },
    detailAuthor: {
        isOpen: false,
        status: 'idle',
        trace: '',
        detailName: '',
        qty: 0,
        type: 'create',
    }
  
};

export const dialogSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        setText: (state, action) => {
            state[action.target][action.field] = action.value
        },
        toggleIssueListIsOpen: (state) => {
            state.issueListDialog.isOpen = !state.issueListDialog.isOpen
        },
        toggleIssueCreationIsOpen: (state) => {
            state.issueCreationDialog.isOpen = !state.issueCreationDialog.isOpen
        },
        setIssuesList: (state, action) => {
            state.issueListDialog.issues = action.payload.issues
        },
        toggleJobAuthorIsOpen: (state,action) => {
            state.jobAuthor.isOpen = !state.jobAuthor.isOpen
            action.payload && (state.jobAuthor.type = action.payload.type) 
        },
        toggleReleaseAuthorIsOpen: (state, action) => {
            state.releaseAuthor.isOpen = !state.releaseAuthor.isOpen
            action.payload && (state.releaseAuthor.trace = action.payload.trace)
            action.payload && (state.releaseAuthor.type = action.payload.type)
        },
        toggleDetailAuthorIsOpen: (state, action) => {
            state.detailAuthor.isOpen = !state.detailAuthor.isOpen
            action.payload.trace && (state.detailAuthor.trace = action.payload.trace)
            action.payload.type && (state.detailAuthor.type = action.payload.type)
            state.detailAuthor.detailName = action.payload.detailName || ''
            state.detailAuthor.qty = action.payload.qty
        },
        
        

    },
    extraReducers:(builder) => {
        builder
            .addCase('jobView/createJob/pending', (state) => {
                state.jobAuthor.status = 'pending';
            })
            .addCase('jobView/createJob/fulfilled', (state) => {
                state.jobAuthor.status = 'complete';
            })
            .addCase('releaseView/createRelease/pending', (state) => {
                state.releaseAuthor.status = 'pending';
            })
            .addCase('releaseView/createRelease/fulfilled', (state) => {
                state.releaseAuthor.status = 'complete';
            })
            
    }

});

export const { 
    setText, 
    toggleIssueListIsOpen, 
    setIssuesList,
    toggleJobAuthorIsOpen,
    toggleReleaseAuthorIsOpen,
    toggleDetailAuthorIsOpen
} = dialogSlice.actions;


export const selectIssueListState = (state) => state.dialogs.issueListDialog;
export const selectIssueCreationState = (state) => state.dialogs.issueCreationDialog;
export const selectJobAuthorIsOpen = (state) => state.dialogs.jobAuthor.isOpen;
export const selectJobAuthorStatus = (state) => state.dialogs.jobAuthor.status;
export const selectReleaseAuthorIsOpen = (state) => state.dialogs.releaseAuthor.isOpen;
export const selectReleaseAuthorStatus = (state) => state.dialogs.releaseAuthor.status;
export const selectDetailAuthorIsOpen = (state) => state.dialogs.detailAuthor.isOpen;
export const  selectDetailAuthorStatus = (state) => state.dialogs.detailAuthor.status;



export default dialogSlice.reducer;