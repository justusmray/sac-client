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
import { toggleReleaseAuthorIsOpen, selectReleaseAuthorIsOpen, selectReleaseAuthorStatus } from './dialogs.slice';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { createReleaseAsync } from '../releaseView/releaseView.slice';

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




const ReleaseAuthorDialog = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isOpen = useSelector(selectReleaseAuthorIsOpen)
    const status = useSelector(selectReleaseAuthorStatus)
    const trace = useSelector(state => state.dialogs.releaseAuthor.trace);
    const [releaseData, setReleaseData] = useState({
        releaseNumber: '',
        releaseType: '',
        materialRequirements: '',
        requestedShipDate: new Date(0)
    })

    useEffect(() => {
        if(status === 'complete'){
            dispatch(toggleReleaseAuthorIsOpen())
        }
        
    }, [status, dispatch])
    

    const handleClose = () => {
        dispatch(toggleReleaseAuthorIsOpen())
    };
    const handleChange = (target, value) => {
        setReleaseData({
            ...releaseData,
            [target]: value
        })
    }
    const handleSubmit = () => {
        dispatch(createReleaseAsync({...releaseData, trace: `${trace}-${releaseData.releaseNumber}`}))
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
            <DialogTitle id="alert-dialog-slide-title">{"Create Release"}</DialogTitle>
            <DialogContent>
                <div>
                    <div  xs={4} className={classes.input}>
                        
                        <TextField
                            variant='outlined'
                            placeholder='Release Number'
                            value={releaseData.releaseNumber}
                            onChange={(event) => handleChange('releaseNumber', event.target.value)}
                        >

                        </TextField>
                    </div>
                    <div  xs={4} className={classes.input}>
                        <TextField
                            variant='outlined'
                            placeholder='Release Type'
                            value={releaseData.releaseType}
                            onChange={(event) => handleChange('releaseType', event.target.value)}
                        >

                        </TextField>
                    </div>
                    <Divider className={classes.input}/>
                    <div  xs={4} className={classes.input}>
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Material Req</FormLabel>
                        <RadioGroup aria-label="materialRequirements" name="materialRequirements" value={releaseData.materialRequirements} onChange={(event) => handleChange('materialRequirements', event.target.value)} >
                            <FormControlLabel value="domestic" control={<Radio />} label="domestic" />
                            <FormControlLabel value="import" control={<Radio />} label="import" />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    <Divider className={classes.input}/>
                    <div  xs={4} className={classes.input}>
                        <TextField
                            variant='outlined'
                            placeholder='Requested Ship Date'
                            value={releaseData.description}
                            onChange={(event) => handleChange('requestedShipDate', event.target.value)}
                            className={classes.textBox}
                            type='date'
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

export default ReleaseAuthorDialog;