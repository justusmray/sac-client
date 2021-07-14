import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { selectJobByTrace } from './jobView.slice';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import VertMoreMenu from '../../components/VertMoreMenu';

const useStyles = makeStyles({
    jobCard: {
        padding: '5px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
    }
})


const JobCard = (props) => {
    const classes = useStyles();
    const job = useSelector((state) => selectJobByTrace(state, props.trace));
    const history = useHistory();
    const {
        jobName,
        jobNumber,
        description,
        materialRequirements
    } = job
    return(
        <Paper elevation={3} className={classes.jobCard} >
            <div onClick={() => history.push(`/releases/${props.trace}`)}>
                {jobName}<br/>
                {jobNumber}<br/>
                {description}<br/>
                {materialRequirements}<br/>
            </div>
            <div>
            <VertMoreMenu
                    menuItems={[
                        {text: 'Edit', function: ''},
                        {text: 'Delete', function: ''},
                        {text: 'Details', function: ''},
                        {text: 'Cut List', function: () => history.push(`/bending/workview/${props.trace}/cutlist`)}
                    ]}

                />
            </div>
        </Paper>
    )
}

export default JobCard;

JobCard.propTypes = {
    trace: PropTypes.string
}