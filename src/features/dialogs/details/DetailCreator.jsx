import React, {useState, useEffect} from 'react'
import DialogWrapper from "../DialogWrapper";
import { useSelector, useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import { 
    selectDetailCreatorStatus,
    selectDetailCreatorIsOpen, 
    setIsOpen, 
    setStatus,
    createDetailAsync } from "./detailCreator.slice";



const DetailCreator = (props) => {
    const dispatch = useDispatch();
    const [detailName, setDetailName] = useState('');
    const [materialRequirements, setMaterialRequirements] = useState('');
    const [qty, setQty] = useState(0);
    const isOpen = useSelector(selectDetailCreatorIsOpen);
    const status = useSelector(selectDetailCreatorStatus);

    useEffect(() => {
        if(status === 'needsUpdate'){
            setDetailName('')
            setMaterialRequirements('')
            setQty(0)
            dispatch(setStatus())
            

        }

    },[status])
    const handleOpen = () => {setIsOpen(true)}
    const handleClose = () => {dispatch(setIsOpen(false))}
    const handleChangeDetailName = (name) => {setDetailName(name)}
    const handleChangeQty = (qty) => {setQty(+qty)}
    const handleSubmit = async () => {
        dispatch(createDetailAsync({
            parentTrace: props.trace,
            qty,
            detailName
        }))
    }

    return(
        <DialogWrapper 
            title='Create Detail'
            isOpen={isOpen} 
            handleClose={handleClose}
        >
            <div>
                <TextField
                    variant='outlined'
                    placeholder='Detail Name'
                    value={detailName}
                    onChange={(event) => handleChangeDetailName(event.target.value)}
                >
                </TextField>
                <TextField
                    variant='outlined'
                    type='number'
                    placeholder='Qty'
                    value={qty}
                    label='Quanity'
                    onChange={(event) => handleChangeQty(event.target.value)}
                >
                </TextField>
                <Divider/>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Material Req</FormLabel>
                    <RadioGroup 
                        aria-label="materialRequirements" 
                        name="materialRequirements" 
                        value={materialRequirements} 
                        // onChange={(event) => handleChange('materialRequirements', event.target.value)} 
                    >
                        <FormControlLabel value="domestic" control={<Radio />} label="domestic" />
                        <FormControlLabel value="import" control={<Radio />} label="import" />
                    </RadioGroup>
                </FormControl>
            </div>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSubmit}>Submit</Button>
        </DialogWrapper>
    )
}

export default DetailCreator;