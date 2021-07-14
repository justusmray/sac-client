import React from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { resolveIssueAsync } from '../workView/workView.slice';


const useStyles = makeStyles((theme) => ({

    buttonPadding: {
        padding: 0
    },
    
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IssueListDialog = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const {
        isOpen,
        issues,
        toggleIsOpen,
        trace,
        onlyShowActive
    } = props

    const handleClose = () => {
        toggleIsOpen()
    };
    const handleResolve = (issueId) => {
        dispatch(resolveIssueAsync({
            trace,
            issueId,

        }))
    }
    const filteredIssues = issues.filter(issue => issue.status === 'unresolved')
    const issuesToMap = onlyShowActive ? filteredIssues : issues
    const mappedIssues = issuesToMap.map(issue => {
        
        return(
        <div>
            <div>Created By: {issue.author}</div><br/>
            <div className={classes.indent}>Issue: {issue.text}</div><br/>
            <div>Type: {issue.type}</div> <br/>
            <div>Status: {issue.status}</div> <br/>
            <Button size='small' onClick={() => handleResolve(issue._id)}>resolve</Button>
            <Divider/>
        </div>
        )
    });
    return (
        <div>
            <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Issues"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {mappedIssues}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

IssueListDialog.propTypes = {
    isOpen: PropTypes.bool,
    issues: PropTypes.array,
    toggleIsOpen: PropTypes.func,
    trace: PropTypes.string,
    onlyShowActive: PropTypes.bool
}

export default IssueListDialog;


