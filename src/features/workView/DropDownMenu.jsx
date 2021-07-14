import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  moreOptions: {
    color: "#FFFFFF",
    padding: 0,
    
},
dropDown: {
    position: 'relative',
    zIndex: 10000000
}
}));

const DropDownMenu = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const handleCbThenClose = (cb, event) => {
        cb()
        handleClose(event);
    }
    // const handleOpenIssue = () => {
    //     dispatch(toggleIssueIsOpen())
    //     dispatch(setTrace(props.trace))
    //     setOpen(false);
        
    // }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    
     

  // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
    prevOpen.current = open;
    }, [open]);
    
    return (
        <div className={classes.root}>
                
            <div>
                <IconButton 
                    className={classes.moreOptions}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Popper 
                    className={classes.dropDown}
                    open={open} 
                    anchorEl={anchorRef.current} 
                    role={undefined} 
                    transition 
                    disablePortal
                    placement={'left'}
                    >
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center-top' : 'center-bottom' }}
                    >
                        <Paper >
                        <ClickAwayListener onClickAway={handleClose}>
                            
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                
                                <MenuItem onClick={(event) => {
                                    handleClose(event)
                                    props.openIssueCreation()
                                }}>Add Issue </MenuItem>
                                
                                <MenuItem 
                                    onClick={(event) => {
                                    handleClose(event)
                                    props.openIssueList(false)
                                }}
                                >
                                    All Issues
                                </MenuItem>
                                
                                <MenuItem onClick={handleClose}>Mark Complete</MenuItem>
                                
                                <MenuItem onClick={(event) => handleCbThenClose(props.openEdit, event)}>Edit</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}

export default DropDownMenu;