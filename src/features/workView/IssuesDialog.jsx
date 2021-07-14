import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { resolveIssueAsync, toggleIssuesDialogIsOpen, setIssuesDialogTrace, setIssuesDialogIssues, selectIssueDialog } from './workView.slice';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({

    buttonPadding: {
        padding: 0
    },
    
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IssuesDialog = (props) => {
    const dispatch = useDispatch();
    const IssuesDialogData = useSelector(selectIssueDialog);
    console.log(IssuesDialogData)
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        dispatch(toggleIssuesDialogIsOpen())
    };

    const handleClose = () => {
        dispatch(toggleIssuesDialogIsOpen())
    };
    const handleResolve = (issueId) => {
        dispatch(resolveIssueAsync({
            trace: props.trace,
            issueId,

        }))
    }
    const mappedIssues = props.issues.map(issue => {
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
    })
    return (
        <div>
            <IconButton onClick={() => handleClickOpen()} className={classes.buttonPadding}>
            <WarningRoundedIcon />
        </IconButton>
            <Dialog
            open={IssuesDialogData.isOpen}
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

export default IssuesDialog;