import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import JobCard from './JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { toggleJobAuthorIsOpen } from '../dialogs/dialogs.slice';
import { fetchJobsAsync, selectJobs, selectJobsStatus} from './jobView.slice';
import Button from '@material-ui/core/Button';
import BackButton from '../../components/BackButton';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '600', // Fix IE 11 issue.
        height: 400
    },
    jobViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    jobViewBody: {
        width: '600px'
    },
    jobViewHeader: {
        width: '600px'
    }
    
}));

const JobView = () => {
    const dispatch = useDispatch();
    const jobsStatus = useSelector(selectJobsStatus);
    const jobs = useSelector(selectJobs);
    const classes = useStyles();
    useEffect(() => {
        dispatch(fetchJobsAsync())
    },[dispatch])

    useEffect(() => {
        if(jobsStatus === 'needsUpdate'){
            dispatch(fetchJobsAsync())
        }
    },[jobsStatus, dispatch])

        
    const mappedJobs = jobs.map(job => {
        return(
            <div>
                <JobCard key={job.trace} trace={job.trace}/>
            </div>
        )
    })

    return (
        <div className={(classes.form, classes.jobViewContainer)}>
            <div className={classes.jobViewHeader}>
            <BackButton/>
            <Button onClick={() => dispatch(toggleJobAuthorIsOpen({type: 'create'}))}>New Job</Button>

            </div>
            <div className={classes.jobViewBody}>
                {mappedJobs }
            </div>
        </div>
    )
}

export default JobView