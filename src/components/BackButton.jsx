import { useHistory } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackButton = () => {
    const history = useHistory();
    return(
        <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon/>
        </IconButton>
    )
}

export default BackButton;