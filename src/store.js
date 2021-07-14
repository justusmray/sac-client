import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './features/header/header.slice.js';
import workViewSlice from './features/workView/workView.slice.js';
import dialogSlice from './features/dialogs/dialogs.slice.js';
import jobViewSlice from './features/jobView/jobView.slice.js';
import errorHandlerSlice from './features/errorHandler/errorHandler.slice.js';
import releaseViewSlice from './features/releaseView/releaseView.slice.js';
import detailViewSlice from './features/detailView/detailView.slice.js';

export const store = configureStore({
  reducer: {
    header: headerSlice,
    workView: workViewSlice,
    dialogs: dialogSlice,
    jobView: jobViewSlice,
    releaseView: releaseViewSlice,
    detailView: detailViewSlice,
    errorHandler: errorHandlerSlice
  },
});
