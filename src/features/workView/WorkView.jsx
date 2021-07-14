import React, {useState, useEffect} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import { useParams, useHistory } from 'react-router';
import CutList from './CutList';
import {useDispatch, useSelector} from 'react-redux';
import { setPartsAsync, selectStatus } from './workView.slice';
import {toast} from 'react-toastify';




const WorkView = () => {
    const dataStatus = useSelector(selectStatus)
    const error = useSelector(state => state.workView.error)
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(setPartsAsync(params.trace)).then(() => {
            (dataStatus === 'idle') && setLoading(false);
        })
    },[params.trace, dispatch])
    useEffect(() => {
        if(dataStatus === 'error'){
            console.log('hit')
            toast.error(error, {
                autoClose: 2000
            })
        }
    }, [dataStatus, error])
    const handleChange = (event, value) => {
        history.replace(value);
    }

    const views = {
        cutlist: <CutList/>,
        drawing: 'drawing',
        detailed: 'detailed',
    }
    return(
        <Grid container>
            <Grid item xs={12}>
            <AppBar position="static" color="default">
                <Tabs
                value={params.view}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                <Tab value='cutlist' label="CutList"/>
                <Tab value='drawing' label="Drawing"/>
                <Tab value='detailed' label="Detailed"/>
                </Tabs>
            </AppBar>
            </Grid>
            <Grid>
                { loading ? 'loading' : views[params.view] || 404}
            </Grid>
        </Grid> 
    )
}

export default WorkView;