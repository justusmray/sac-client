import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router';

import React from 'react';
import Header from './features/header/Header';
import JobView from'./features/jobView/JobView';
import WorkView from './features/workView/WorkView';
import { ToastContainer } from 'react-toastify';
import JobAuthorDialog from './features/dialogs/JobAuthorDialog';
import ReleaseAuthorDialog from './features/dialogs/ReleaseAuthorDialog';
import DetailAuthorDialog from './features/dialogs/DetailAuthorDialog';
import ErrorHandler from './features/errorHandler/ErrorHandler';
import Grid from '@material-ui/core/Grid';
import './App.css';
import ReleaseView from './features/releaseView/ReleaseView';
import DetailView from './features/detailView/DetailView';
import WeldLength from './features/weldLength/WeldLength';


const App = () => {
    return(
        <React.Fragment>
            <DetailAuthorDialog/>
            <ReleaseAuthorDialog/>
            <JobAuthorDialog/>   
            <ToastContainer/> 
            <ErrorHandler/>
            <CssBaseline/>
            <Grid container>
                <Grid item xs={12}>
                    <Header/>
                </Grid>
                <Grid item xs={12} >
                    <Switch>
                        <Route path='/jobs' component={JobView}/>
                        <Route path='/releases/:trace' component={ReleaseView}/>
                        <Route path='/details/:trace' component={DetailView}/>
                        <Route path='/parts/:trace' component={() => 'hi'}/>
                        <Route path='/:originator/workView/:trace/:view' component={WorkView}/>
                        <Route path='/test' component={WeldLength}/>
                    </Switch>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}


export default App;