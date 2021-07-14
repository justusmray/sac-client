import React, {useState, useEffect} from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core';
import { toggleDetailAuthorIsOpen, selectDetailAuthorIsOpen, selectDetailAuthorStatus } from './dialogs.slice';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createDetailAsync } from '../detailView/detailView.slice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import VertMoreMenu from '../../components/VertMoreMenu';

const useStyles = makeStyles({
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    dialogHeader: {
        display: 'flex',
        justifyContent: 'space-between',
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
    },
})




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DetailAuthorDialog = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isOpen = useSelector(selectDetailAuthorIsOpen)
    const status = useSelector(selectDetailAuthorStatus)
    const trace = useSelector(state => state.dialogs.detailAuthor.trace);
    const detailName = useSelector(state => state.dialogs.detailAuthor.detailName);
    const detailQty = useSelector(state => state.dialogs.detailAuthor.qty)
    const type = useSelector(state => state.dialogs.detailAuthor.type);

    const [detailData, setDetailData] = useState({
        detailName: '',
        qty: 0,
        materialRequirements: '',
    })
    const [counter, setCounter] = useState(0)
    
    const [parts, setParts] = useState([]);
    const [partsWithChanges, setPartsWithChanges] = useState([])
    const [isDeleteActive, setIsDeleteActive] = useState(false);
    const [partsForDeletion, setPartsForDeletion] = useState([]);
    const [updatesHaveOccured, setUpdatesHaveOccured] = useState(true);
    const [editableParts, setEditableParts] = useState(true);

    useEffect(() => {
        setDetailData({detailName, qty: detailQty})
    }, [detailName])
    useEffect(() => {
        (detailName && isOpen === true) && (
            axios.get(`http://192.168.0.90:5000/part/${trace}-${detailName}`)
            .then(response => {
                console.log(response);
                const tableData = response.data.map(part => {
                    return {
                        ...part,
                        isInDb: true
                    }
                })
                if(tableData[0]){setParts(tableData)}
                else{
                    setParts([{
                    _id: `${counter}`,
                    partMark: '',
                    material: '',
                    type: '',
                    size: '',
                    dimensions: '',
                    qty: 0,
                    isInDb: false
                }])
                setCounter(counter + 1)
            }
                
                if(updatesHaveOccured){setUpdatesHaveOccured(false);}
                
            })
            )
    },[isOpen, updatesHaveOccured, dispatch])

    useEffect(() => {if(status === 'complete'){dispatch(toggleDetailAuthorIsOpen())}}, [status, dispatch])

    const handleClose = () => {
        setDetailData({
            detailName: '',
            materialRequirements: '',
            qty: 0,
        })
        setPartsWithChanges([])
        setParts([])
        dispatch(toggleDetailAuthorIsOpen({detail: ''}))
    };
    const handleChange = (target, value) => {
        setDetailData({
            ...detailData,
            [target]: value
        })
        setPartsWithChanges([])
    }
    const updateDetailData = ({
        detailName,
        materialRequirements,
        qty
    }) => {
        axios.put()
    }
    const handleSubmit = () => {
        if(type === 'create'){
            dispatch(createDetailAsync({...detailData, trace: `${trace}-${detailData.detailName}`}))
            handleClose();
        }
        
        let updatedParts = [];
        partsWithChanges.forEach(partId => {
            const updatedPart = parts.find(part => (part["_id"] === partId))
            console.log(updatedPart)
            if(updatedPart){updatedParts = [...updatedParts, updatedPart]}
            
        })
        if(window.confirm('Would you like to modify this detail?')){
            axios.post('http://192.168.0.90:5000/part/', {parts: updatedParts, trace: `${trace}-${detailData.detailName}`})
            .then(response => {
                if(response.data.message === 'success'){
                    toast.success('saved', {autoClose: 2000})
                    setUpdatesHaveOccured(true);
                }
                
            })
        }
        
    }
    const handleAddPart = () => {
        let newParts = [ {
            _id: `${counter}`,
            partMark: '',
            material: '',
            type: '',
            size: '',
            dimensions: '',
            qty: 0,
            isInDb: false
        },...parts]
        setCounter(counter + 1);
        setParts(newParts);
    }
    const handleDeleteParts = () => {
        let filteredPartsForDeletion = partsForDeletion.filter(id => id.length > 8)
        
        
        axios.post('http://192.168.0.90:5000/part/delete', {partsForDeletion: filteredPartsForDeletion})
        .then(response => {
            if(response.data.deletedParts || response.data.message){
                toast.success('Deleted', {autoClose: 2000})
                toggleIsDeleteActive();
                setUpdatesHaveOccured(true);
                setPartsForDeletion([])
            }
        })
    }
    const toggleIsDeleteActive = () => {
        setIsDeleteActive(!isDeleteActive);
        // !isDeleteActive && setPartsForDeletion([])
    }
    const handleChangeDeletionList = (id, status) => {
        if(status === true){
            let index = partsForDeletion.indexOf(id)
            if(index === -1) setPartsForDeletion([...partsForDeletion, id])
        }else{
            let index = partsForDeletion.indexOf(id)
            if(index !== -1){
                let newPartsForDeletion = [...partsForDeletion]
                newPartsForDeletion.splice(index, 1)
                setPartsForDeletion(newPartsForDeletion);
            }
        }
    }
    const handleModifyPart = (_id, field, value) => {
        const index = parts.findIndex(part => part._id === _id)
        if(partsWithChanges.indexOf(_id) === -1){
            setPartsWithChanges([...partsWithChanges,_id])
        }
        const newPart = {...parts[index], [field]: value}
        const newParts = [...parts]
        newParts.splice(index,1,newPart);  
        setParts(newParts);      
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
                <div className={classes.dialogHeader}>
                    <DialogTitle id="alert-dialog-slide-title">
                        {`${type} Detail`}
                    </DialogTitle>
                    <VertMoreMenu 
                    menuItems={[
                        {text: 'Edit', function: ''}
                    ]}
                    />
                </div>
            
            <DialogContent>
                <div>
                    
                        <div item xs={4} className={classes.input}>
                            
                            {type === 'edit' ? 
                            <Typography>Detail: {detailData.detailName}</Typography> :
                            <TextField
                                variant='outlined'
                                placeholder='Detail Name'
                                value={detailData.detailName}
                                onChange={(event) => handleChange('detailName', event.target.value)}
                            >
                            </TextField>}
                            
                        </div>
                        <div item xs={4} className={classes.input}>
                            {type === 'edit' ?
                            <Typography>Quanity: {detailData.qty}</Typography> :
                            <TextField
                                variant='outlined'
                                placeholder='Quanity'
                                value={detailData.qty}
                                type='number'
                                onChange={(event) => handleChange('qty', event.target.value)}
                            >
                            </TextField>
                            }
                            
                        </div>
                    
                    
                
                    <Divider className={classes.input}/>
                    <div item xs={4} className={classes.input}>
                    
                        <FormControl component="fieldset">
                        <FormLabel component="legend">Material Req</FormLabel>
                        <RadioGroup aria-label="materialRequirements" name="materialRequirements" value={detailData.materialRequirements} onChange={(event) => handleChange('materialRequirements', event.target.value)} >
                            <FormControlLabel value="domestic" control={<Radio />} label="domestic" />
                            <FormControlLabel value="import" control={<Radio />} label="import" />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    {type === 'edit' ? 
                    <React.Fragment>

                        <Divider className={classes.input}/>
                        <Button onClick={() => handleAddPart()}>add</Button>
                        <Button onClick={() => toggleIsDeleteActive()}>delete</Button>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}  aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Part Mark</TableCell>
                                    <TableCell align="right">Material</TableCell>
                                    <TableCell align="right">Type</TableCell>
                                    <TableCell align="right">Size</TableCell>
                                    <TableCell align="right">Dimensions</TableCell>
                                    <TableCell align="right">QTY</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {parts.map((part) => (
                                    <TableRow key={part.trace}>
                                    <TableCell component="th" scope="part"><TextField value={part.partMark} onChange={(event) => handleModifyPart(part._id, 'partMark', event.target.value)}></TextField></TableCell>
                                    <TableCell align="right"><TextField value={part.material} onChange={(event) => handleModifyPart(part._id, 'material', event.target.value)}></TextField></TableCell>
                                    <TableCell align="right"><TextField value={part.type} onChange={(event) => handleModifyPart(part._id, 'type', event.target.value)}></TextField></TableCell>
                                    <TableCell align="right"><TextField value={part.size} onChange={(event) => handleModifyPart(part._id, 'size', event.target.value)}></TextField></TableCell>
                                    <TableCell align="right"><TextField value={part.dimensions} onChange={(event) => handleModifyPart(part._id, 'dimensions', event.target.value)}></TextField></TableCell>
                                    <TableCell align="right"><TextField value={part.qty} onChange={(event) => handleModifyPart(part._id, 'qty', event.target.value)}></TextField></TableCell>
                                    {isDeleteActive ? <TableCell align="right"><input type='checkbox' onClick={(event) => handleChangeDeletionList(part._id,event.target.checked)}></input></TableCell> : null}
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </React.Fragment>:
                    null
                    }
                </div>
            </DialogContent>
            <DialogActions className={classes.buttonBox}>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                {isDeleteActive ?
                <Button onClick={handleDeleteParts}>
                    Delete
                </Button>:
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>

                }
            </DialogActions>
            </Dialog>
            
        </div>
    )
}

export default DetailAuthorDialog;