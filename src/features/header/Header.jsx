import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import sac from '../../assets/SAClogo2.png';
import HideOnScroll from './HideOnScroll.jsx';
// import LoginButton from '../LoginButton/LoginButton';
import { useSelector, useDispatch } from 'react-redux';
// import MenuAvatar from '../MenuAvatar/MenuAvatar.jsx';
import NavDrawer from './NavDrawer.jsx';
import { 
    toggleNavDrawerIsOpen, 
} from './header.slice';

import './Header.css';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));
 
const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const headerData = useSelector(state => state.header);
    const handleToggleNavDrawer = () => {
        dispatch(toggleNavDrawerIsOpen());
    };
    return (
        <div className={(classes.root, 'header')} hidden={headerData.isInvisible}>
            <NavDrawer/>
            <HideOnScroll>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={() => handleToggleNavDrawer()}
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {headerData.pageHeader}
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            {/* <img className="logo" src={sac} alt="sac logo" /> */}
                        </Typography>
                        {true ? (
                            '<MenuAvatar />'
                        ) : (
                            'login'
                            // <LoginButton />
                        )}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div>
    );
};
 
export default Header;