import React from 'react';
import PropTypes from 'prop-types';
import { selectDetailByTrace} from './detailView.slice';
import { useSelector  } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { useDispatch } from 'react-redux';
import { toggleDetailAuthorIsOpen } from '../dialogs/dialogs.slice';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
    detailCard: {
        padding: '5px',
        marginBottom: '10px'
    }
})


const DetailCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();
    const {
        trace
    } = props

    const detail = useSelector((state) => selectDetailByTrace(state, trace));
    const {
        detailName,
        qty
    } = detail

    return(
        <Paper className={classes.detailCard}  onClick={() => dispatch(toggleDetailAuthorIsOpen({trace: params.trace, type: 'edit', detailName, qty}))}>
            {detailName}
        </Paper>
    )
}

DetailCard.propTypes = {
    trace: PropTypes.string,
}

export default DetailCard;