import React from 'react';
import Grid from '@material-ui/core/Grid';
import CutListItem from './CutListItem';
import { makeStyles} from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { selectParts } from './workView.slice';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
    cutListContainer: {
        width: '100vw',
        justifyContent: 'center',
        paddingTop: theme.spacing(3)
    },
    filterContainer: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 0,
        marginBottom: theme.spacing(3),
      
    },
    filter:{
        marginRight: theme.spacing(1),
    }
}))


const CutList = () => {
    const parts = useSelector(selectParts)
    console.log(parts);
    const classes = useStyles();
    const mappedParts = parts.map(part => {
        return(
            <CutListItem
                cutItem={part}
                
            />
        )
    }) 
    return(
        <React.Fragment>
            <Grid container className={classes.cutListContainer} >
                <Grid item container className={classes.filterContainer}  md={9}sm ={10} xs={10}>
                <Paper elevation={3} className={classes.filterContainer}>
                    <Grid item className={classes.filter}>
                        Filter
                    </Grid>
                </Paper>
                <Divider variant='middle' width='90%'/>
                </Grid>

                    {mappedParts}
            </Grid>
        </React.Fragment>
    )
}

export default CutList;