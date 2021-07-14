import React from 'react';
import PropTypes from 'prop-types';
import { selectReleaseByTrace} from './releaseView.slice';
import { useSelector  } from 'react-redux';
import { useHistory } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import VertMoreMenu from '../../components/VertMoreMenu';

const useStyles = makeStyles({
    releaseCard: {
        padding: '5px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
    }
})


const ReleaseCard = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const release = useSelector((state) => selectReleaseByTrace(state, props.trace));
    const {
        releaseNumber,
        releaseType,
        materialRequirements,
        requestedShipDate,
    } = release
    return(
        <Paper elevation={3} className={classes.releaseCard} >
            <div onClick={() => {history.push(`/details/${props.trace}`)}}>
            {releaseNumber}<br/>  
            {releaseType}<br/>
            {materialRequirements}<br/>
            {requestedShipDate}<br/>

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

ReleaseCard.propTypes = {
    trace: PropTypes.string,
}

export default ReleaseCard;