import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core';
import { createIssueAsync } from '../workView/workView.slice';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({

    buttonPadding: {
        padding: 0
    },
    inputs: {
        width: '100%',
        marginBottom: 10
    }
    
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IssueCreationDialog = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [issue, setIssue] = useState({
        type: '',
        text: '',
    });

    const {
        isOpen,
        toggleIsOpen,
        trace,
    } = props

    const handleClose = () => {
        toggleIsOpen()
    }
    const handleChangeIssue = (value, target) => {
        let newIssue = {...issue, [target]: value};
        setIssue(newIssue)
    }
    const handleSubmit = () => {
        dispatch(createIssueAsync({
            trace,
            issue: {
                ...issue,
                author: 'placeholder'
            },
        })).then(() => {
            setIssue({
                type: '',
                text: '',
            })
            
        })
    }
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
            <DialogTitle id="alert-dialog-slide-title">{"New Issue"}</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} >
                        <FormControl variant="outlined" className={(classes.formControl, classes.inputs)}>
                            <InputLabel id="select-outlined-label">Type</InputLabel>
                            <Select
                            labelId="select-outlined-label"
                            id="select-outlined"
                            value={issue.type}
                            onChange={(event) => handleChangeIssue(event.target.value, 'type')}
                            label="Type"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'missing material'}>Missing Material</MenuItem>
                            <MenuItem value={'drawing inaccuracy'}>Drawing inaccuracy</MenuItem>
                            <MenuItem value={'equipment down'}>Equipment Down</MenuItem>
                            </Select>
                        </FormControl><br/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.inputs}
                            variant='outlined'
                            multiline
                            placeholder='Describe The Issue'
                            onChange={(event) => handleChangeIssue(event.target.value, 'text')}
                            value={issue.text}
                        />      
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Close
                </Button>
                <Button onClick={() => handleSubmit()} color="primary">
                Submit
                </Button>
                
            </DialogActions>
            </Dialog>
        </div>
    );
}

IssueCreationDialog.propTypes = {
    isOpen: PropTypes.bool,
    toggleIsOpen: PropTypes.func,
    trace: PropTypes.string

}

export default IssueCreationDialog;