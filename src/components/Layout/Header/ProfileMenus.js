import React from 'react';
import { Menu, MenuItem } from '@mui/material';

function ProfileMenus(props) {
    const {setAnchorEl,setProfileMenuOpen,anchorEl,profileMenus} = props
    const profileMenuHandleClose = () => {
        setAnchorEl(null);
        setProfileMenuOpen(false)
    }  
    const handleCloseLogout = () =>{
        setAnchorEl(null);
        setProfileMenuOpen(false);
        window.localStorage.clear("token");
        localStorage.clear("isAdmin");
        window.location.href = "/login";
    }
    

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={profileMenus}
                onClose={profileMenuHandleClose}>
                <MenuItem onClick={profileMenuHandleClose}>Setting</MenuItem>
                <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default ProfileMenus;