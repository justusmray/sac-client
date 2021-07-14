import React, {useState, useEffect} from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toggleJobAuthorIsOpen, selectJobAuthorIsOpen, selectJobAuthorStatus } from './dialogs.slice';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { createJobAsync } from '../jobView/jobView.slice';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    input: {
        marginBottom: 10
    },
    textBox: {
        width: '100%'
    },
    buttonBox: {
        display: 'flex',
        justifyContent: 'space-around'
    }
})


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




const JobAuthorDialog = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isOpen = useSelector(selectJobAuthorIsOpen)
    const status = useSelector(selectJobAuthorStatus)

    const [jobData, setJobData] = useState({
        jobName: '',
        jobNumber: '',
        materialRequirements: '',
        description: '',
    })

    useEffect(() => {
        if(status === 'complete'){
            dispatch(toggleJobAuthorIsOpen())
        }
        if(status === 'failed'){
            toast.error('Failed', {autoClose: 2000})
        }
    }, [status, dispatch])
    

    const handleClose = () => {
        dispatch(toggleJobAuthorIsOpen())
    };
    const handleChange = (target, value) => {
        setJobData({
            ...jobData,
            [target]: value
        })
    }
    const handleSubmit = () => {
        dispatch(createJobAsync(jobData))
    }

    return(
        <div>
            <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Create Job"}</DialogTitle>
            <DialogContent>
                <div>
                    <div item xs={4} className={classes.input}>
                        
                        <TextField
                            variant='outlined'
                            placeholder='Job Name'
                            value={jobData.jobName}
                            onChange={(event) => handleChange('jobName', event.target.value)}
                        >

                        </TextField>
                    </div>
                    <div item xs={4} className={classes.input}>
                        <TextField
                            variant='outlined'
                            placeholder='Job Number'
                            value={jobData.jobNumber}
                            onChange={(event) => handleChange('jobNumber', event.target.value)}
                        >

                        </TextField>
                    </div>
                    <Divider className={classes.input}/>
                    <div item xs={4} className={classes.input}>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Material Req</FormLabel>
                        <RadioGroup aria-label="materialRequirements" name="materialRequirements" value={jobData.materialRequirements} onChange={(event) => handleChange('materialRequirements', event.target.value)} >
                            <FormControlLabel value="domestic" control={<Radio />} label="domestic" />
                            <FormControlLabel value="import" control={<Radio />} label="import" />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    <Divider className={classes.input}/>
                    <div item xs={4} className={classes.input}>
                        <TextField
                            variant='outlined'
                            placeholder='Description'
                            multiline
                            value={jobData.description}
                            onChange={(event) => handleChange('description', event.target.value)}
                            className={classes.textBox}
                        >

                        </TextField>
                    </div>
                </div>
                {/* <DialogContentText id="alert-dialog-slide-description">
                </DialogContentText> */}
            </DialogContent>
            <DialogActions className={classes.buttonBox}>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}

export default JobAuthorDialog;