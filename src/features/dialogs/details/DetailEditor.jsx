import DialogWrapper from "../DialogWrapper";
import { useSelector } from "react-redux";
import { selectDetailEditorIsOpen } from "./detailEditor.slice";



const DetailEditor = () => {
    const isOpen = useSelector(selectDetailEditorIsOpen);
    return(
        <DialogWrapper 
            title='oi'
            isOpen={isOpen} 
        >
        </DialogWrapper>
    )
}

export default DetailEditor;