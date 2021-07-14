import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const VertMoreMenu = (props) => {
    

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const menuItems = props.menuItems !== undefined ?
        props.menuItems.map(item => {
        return <MenuItem onClick={item.function}>{item.text}</MenuItem>
    }):
    <MenuItem>None</MenuItem>
    return(
        <React.Fragment>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
                {menuItems}
            </Menu>
        </React.Fragment>
    )
}

export default VertMoreMenu;
