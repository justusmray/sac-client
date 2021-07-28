import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDetailAuthorIsOpen } from '../dialogs/dialogs.slice';
import { fetchDetailsAsync, selectDetails, selectDetailsStatus} from './detailView.slice';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import DetailCard from './DetailCard';
import BackButton from '../../components/BackButton';
import DetailCreator from '../dialogs/details/DetailCreator';
import { setIsOpen } from '../dialogs/details/detailCreator.slice';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '600', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        height: 400
    },
    detailViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    detailViewBody: {
        width: '600px'
    },
    detailViewHeader: {
        width: '600px'
    }
    
}));

const DetailView = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const detailsStatus = useSelector(selectDetailsStatus);
    const details = useSelector(selectDetails);
    const classes = useStyles();
    useEffect(() => {
        dispatch(fetchDetailsAsync(params.trace))
    },[params.trace, dispatch])
    useEffect(() => {
        if(detailsStatus === 'needsUpdate'){
            dispatch(fetchDetailsAsync(params.trace))
        }
    },[detailsStatus, params.trace, dispatch])

        
    const mappedDetails = details.map(detail => {
        return(
            <DetailCard key={detail.trace} trace={detail.trace}/>
        )
    })

    return (
        <React.Fragment>
            <DetailCreator trace={params.trace}/>
            <div className={(classes.form, classes.detailViewContainer)}>
                <div className={classes.detailViewHeader}>
                    <BackButton/>
                    <Button onClick={() => dispatch(setIsOpen(true))}>New Detail</Button>
                </div>
                <div className={classes.detailViewBody}>
                    {mappedDetails }
                </div>
            </div>
        </React.Fragment>
    )
}

export default DetailView