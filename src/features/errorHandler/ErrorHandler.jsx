import { useEffect} from 'react';
import { selectErrorStatus, clearError } from './errorHandler.slice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';



const ErrorHandler = () => {
    const dispatch = useDispatch();
    const errorStatus = useSelector(selectErrorStatus)
    useEffect(() => {
        if(errorStatus === 'error'){
            toast.error('Error', {autoClose: 2000})
            dispatch(clearError())
        }
    },[errorStatus, dispatch])

    return(null)
}

export default ErrorHandler;