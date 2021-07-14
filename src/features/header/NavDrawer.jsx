import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useDispatch, useSelector } from 'react-redux';
import { selectNavDrawerIsOpen, toggleNavDrawerIsOpen } from './header.slice';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useHistory } from 'react-router';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    }));

const NavDrawer = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const navDrawerIsOpen = useSelector(selectNavDrawerIsOpen);

    const handleNavigation = (route) => {
        dispatch(toggleNavDrawerIsOpen())
        history.push(route);
    }

    return (
    <div className={classes.root}>
        
        <Drawer
        className={classes.drawer}
        open={navDrawerIsOpen}
        onClose={() => dispatch(toggleNavDrawerIsOpen())}
        classes={{
            paper: classes.drawerPaper,
        }}
        >
        <Toolbar />
        <div className={classes.drawerContainer}>
            <List>
                <ListItem button key={'Projects'} onClick={() => handleNavigation('/jobs')}>
                <ListItemIcon><AttachMoneyIcon/></ListItemIcon>
                <ListItemText primary={'Projects'} />
                </ListItem>
            </List>
            <Divider />
            <List>
            {['Bending', 'Prep', 'Plasma', 'Saws','StucturalWeld','PipeWeld'].map((text, index) => (
                <ListItem button key={text} onClick={() => handleNavigation(`/${text}`)}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
        </div>
        </Drawer>
        
    </div>
    );
}

export default NavDrawer;