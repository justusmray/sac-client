import { configureStore } from '@reduxjs/toolkit';
import header from './features/header/header.slice.js';
import workView from './features/workView/workView.slice.js';
import dialogs from './features/dialogs/dialogs.slice.js';
import jobView from './features/jobView/jobView.slice.js';
import errorHandler from './features/errorHandler/errorHandler.slice.js';
import releaseView from './features/releaseView/releaseView.slice.js';
import detailView from './features/detailView/detailView.slice.js';
import detailCreator from './features/dialogs/details/detailCreator.slice.js';
import detailEditor from './features/dialogs/details/detailEditor.slice.js';
export const store = configureStore({
  reducer: {
    header,
    workView,
    dialogs,
    jobView,
    releaseView,
    detailView,
    errorHandler,
    detailCreator,
    detailEditor
  },
});
