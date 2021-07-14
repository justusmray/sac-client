import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleReleaseAuthorIsOpen } from '../dialogs/dialogs.slice';
import { fetchReleasesAsync, selectReleases, selectReleasesStatus} from './releaseView.slice';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import ReleaseCard from './ReleaseCard';
import BackButton from '../../components/BackButton';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '600', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        height: 400
    },
    releaseViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    releaseViewBody: {
        width: '600px'
    },
    releaseViewHeader: {
        width: '600px'
    }
    
}));


const ReleaseView = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const releasesStatus = useSelector(selectReleasesStatus);
    const releases = useSelector(selectReleases);
    const classes = useStyles();
    useEffect(() => {
        dispatch(fetchReleasesAsync(params.trace))
    },[params.trace, dispatch])
    useEffect(() => {
        if(releasesStatus === 'needsUpdate'){
            dispatch(fetchReleasesAsync(params.trace))
        }
    },[releasesStatus,params.trace, dispatch])

        
    const mappedReleases = releases.map(release => {
        return(
            <ReleaseCard key={release.trace} trace={release.trace}/>
        )
    })

    return (
        <div className={(classes.form, classes.releaseViewContainer)}>
            <div className={classes.releaseViewHeader}>
                <BackButton/>
                <Button onClick={() => dispatch(toggleReleaseAuthorIsOpen({trace: params.trace, type: 'create'}))}>New Release</Button>
            </div>
            <div className={classes.releaseViewBody}>
                {mappedReleases }
            </div>
        </div>
    )
}

export default ReleaseView