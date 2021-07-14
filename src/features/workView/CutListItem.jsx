import React, { useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import WarningRounded from '@material-ui/icons/WarningRounded';
import { 
    createCompleteObjectAsync, 
    deleteCompleteObjectAsync,
    deleteTrackingNumberAsync,
} from './workView.slice';
import { useDispatch } from 'react-redux';
import DropDownMenu from './DropDownMenu';
import IssueListDialog from '../dialogs/IssueListDialog';
import IssueCreationDialog from '../dialogs/IssueCreationDialog';
import { toggleDetailAuthorIsOpen } from '../dialogs/dialogs.slice';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        position: 'static',
        backgroundColor: theme.palette.primary.main,
        height: theme.spacing(5),
        color: 'white',
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    cardTrace: {

    },
    cardBody: {
        padding: theme.spacing(1)
    },
    cardContainer: {
        margin: theme.spacing(.5)
    },
    trackingNumber: {
        width: '100%',
        // '&:hover': {
        //     backgroundColor: "#808080",
        //     color: "#FFFFFF"
        // },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deleteIcon: {
        fontSize: 'small',
    },
   
    buttonPadding: {
        padding: 0
    }
}))
const colorSchemes = {
    CS: {
        backgroundColor: 'rgb(226, 68, 92)'
    },
    "304SS": {
        backgroundColor: 'rgb(87, 155, 252)'
    },
    ALUMINUM: {
        backgroundColor: 'rgb(0, 200, 117)'
    },
    "316SS": {
        backgroundColor: 'rgb(255, 203, 0)'
    },
    purple: {
        backgroundColor: 'rgb(162, 93, 220)'
    }
}
const CutListItem = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [issueList, setIssueList] = useState({
        isOpen : false,
        onlyShowActive: true,
    })
    const [issueCreation, setIssueCreation] = useState({
        isOpen: false,
    })
    const [trackingNumber, setTrackingNumber] = useState('');
    const {
        trace,
        material,
        type,
        size,
        dimensions,
        qty,
        trackingNumbers,
        completeTracker,
        issues

    } = props.cutItem;
    const detailName = trace.split('-')[2]
    console.log(detailName)

    const toggleIssueListIsOpen = (onlyActive = true) => {
        setIssueList({...issueList, onlyShowActive: onlyActive, isOpen: !issueList.isOpen})
    }
    const toggleIssueCreationIsOpen = () => {
        setIssueCreation({...issueCreation, isOpen: !issueCreation.isOpen})
    }
    const changeCounter = (type) => {
        if(type === 'increment'){
            dispatch(createCompleteObjectAsync({
                user: 'test',
                process: 'saws',
                trace,
                trackingNumber,
            }))
        }else{
            dispatch(deleteCompleteObjectAsync({
                process: 'saws',
                trace,
            }))
        }
    }
    const mappedTracking = trackingNumbers.map(number => {
        return(
            <Grid 
                item 
                className={classes.trackingNumber}
                >
                {number} 
                
                <IconButton onClick={()=> dispatch(deleteTrackingNumberAsync({trace, trackingNumber: number}))}>
                    <ClearIcon className={classes.deleteIcon}/>
                </IconButton>
            </Grid>
        )
    })
    const openEdit = () => {
        const jobTrace = trace.split('-')[0] + '-'+ trace.split('-')[1]

        dispatch(toggleDetailAuthorIsOpen({trace: jobTrace, type: 'edit', detailName, qty}))
    }
    const activeIssues = issues.filter(issue => issue.status === 'unresolved' )
    return(
        <React.Fragment>
            <IssueListDialog
                issues={issues}
                isOpen={issueList.isOpen}
                trace={trace}
                onlyShowActive={issueList.onlyShowActive}
                toggleIsOpen={() => toggleIssueListIsOpen(true)}
            />
            <IssueCreationDialog
                isOpen={issueCreation.isOpen}
                toggleIsOpen={toggleIssueCreationIsOpen}
                trace={trace}
            />
            
            <Grid className={classes.cardContainer} item xs={10} sm={5} md={3} >
                <Paper elevation={3}>
                    <Grid 
                        xs={12}
                        container
                        style={colorSchemes[material]} 
                        className={classes.cardHeader}
                    >
                            <Grid item xs={5}>

                                <Typography variant='subtitle1'>
                                    {trace}
                                </Typography>
                            </Grid>
                            {activeIssues[0] ? 
                            <Grid>
                                {console.log(activeIssues)}
                                <IconButton onClick={() => toggleIssueListIsOpen(true)} className={classes.buttonPadding}>
                                    <WarningRounded />
                                </IconButton>
                            </Grid> :
                            null}
                            <Grid item xs={1.5}>
                                <DropDownMenu 
                                    trace={trace} 
                                    openIssueList={toggleIssueListIsOpen}
                                    openIssueCreation={toggleIssueCreationIsOpen}
                                    openEdit={openEdit}
                                />
                            </Grid>
                    </Grid>
                    <Grid container className={classes.cardBody}>
                        <Grid item xs={5}>
                            <List dense={true}>
                                <ListItem>Material: {material}</ListItem>
                                <Divider component="li" />
                                <ListItem>Type: {type}</ListItem>
                                <Divider component="li" />
                                <ListItem>Size: {size}</ListItem>
                                <Divider component="li" />
                                <ListItem>Length: {dimensions}</ListItem>
                                <Divider component="li" />
                                <ListItem>QTY: {completeTracker.length || 0}/{qty}</ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid 
                            item 
                            container
                            xs={6} 
                            direction='column'
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <div item>  
                                <TextField
                                    placeholder='Tracking #'
                                    value={trackingNumber}
                                    onChange={e => {setTrackingNumber(e.target.value)}}
                                >
                                    
                                </TextField>
                            </div>
                                {mappedTracking}
                            <Grid container justify='space-between'>
                                <Grid item>

                                    <Button onClick={() => changeCounter('decrement')}>-</Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => changeCounter('increment')}>+</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    
                    </Grid>
                </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default CutListItem;