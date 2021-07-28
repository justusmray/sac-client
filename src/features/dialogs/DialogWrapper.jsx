import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogWrapper = (props) => {
    return (
        <Dialog
            open={props.isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
        >
            <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
        </Dialog>
    );
}

DialogWrapper.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string
}

export default DialogWrapper;