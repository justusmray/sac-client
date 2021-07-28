import { useEffect} from 'react';
import { selectErrorStatus, clearError, selectErrorMessage } from './errorHandler.slice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';



const ErrorHandler = () => {
    const dispatch = useDispatch();
    const errorStatus = useSelector(selectErrorStatus)
    const errorMessage = useSelector(selectErrorMessage)
    useEffect(() => {
        if(errorStatus === 'error'){
            toast.error(errorMessage, {autoClose: 2000})
            dispatch(clearError())
            console.log(errorMessage)
        }
    },[errorStatus, dispatch])

    return(null)
}

export default ErrorHandler;