import React from "react";
import clsx from 'clsx';
import { Link, Route, Routes } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar } from "@mui/material";
import Icon from '@mui/material/Icon';

import Button from '@mui/material/Button';

import './HeaderStyle.css';
import ProfileMenu from "./ProfileMenus";
import { makeStyles } from '@mui/styles';
import Logo from '../../../images/lotus.webp';

let drawerWidth = 240
const useStyles = makeStyles({
    appbar: {
        width: "100%",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)!important`,
    }
});
function Header(props) {
    console.log("====header");
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [profileMenus, setProfileMenuOpen] = React.useState(false);

    const getProfilePhoto = () => {
        return <Avatar src="https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png" />
    }
    
    const openProfileMenuHandleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setProfileMenuOpen(true)
    }

    const handleMemoryCreate = () => {
        window.location.href = "/memory";
    }
    let admin = localStorage.getItem("isAdmin");

    let menus = [
        {name: "Memories", url:"/home"},
        {name: "My Memories", url:"/usermemories"},
      ]
      
      let adminMenus = [
        {name: "Users", url:"/userList"},
        {name: "Memories", url:"/home"},
        {name: "My Memories", url:"/usermemories"}, 
      ]
      let result = (admin === "true" ? adminMenus : menus);
      const currentUrl = window.location.href;
        
        const parts = currentUrl.split("/");
        const lastPart = "/"+parts[parts.length - 1];
       
        let heading = result.find((item)=>{
            return item.url===lastPart;
        })
        
    return (
        <>
            <AppBar
                position="fixed"
                style={{ backgroundColor: '#fff', fontFamily: 'Georgia, serif' }}
                className={props.open ? classes.appBarShift : classes.appbar}
            >
                <Toolbar>
                    <div className="toolbar-container" >
                        <div style={{ display: 'flex' }}>
                            {!props.open ? <Avatar alt="Small Logo" src={Logo} /> : ''}

                            <span
                                color="inherit"
                                aria-label="open drawer"
                                onClick={props.handleDrawerOpen}
                                edge="start"
                                className={!props.open ? "menuButtonShow" : "menuButtonHide"}                            >
                                <MenuIcon />
                            </span>
                            <div className={props.open ? "closeMenuButtonShow" : "closeMenuButtonShowHide"}>
                                <span alt="Icon Button" onClick={props.handleDrawerClose}
                                // className={props.open?"closeMenuButtonShow":"closeMenuButtonShowHide"}
                                >
                                    X
                                </span>
                            </div>
                        </div>
                        <div style={{ margin: 'auto' }}>
                            <h2>{heading?heading.name:"Memories"}</h2>
                            
                        </div>
                        <div>

                            <Link to="/create">
                                <Icon className="create-post" title="create Post" sx={{
                                    fontSize: '30px'
                                }}>add_circle</Icon>
                            </Link>



                        </div>
                        <div>
                            <div onClick={openProfileMenuHandleClick} className="expandButton">
                                <span>{getProfilePhoto()}</span>
                                <span style={{ marginTop: '5px' }}><ExpandMoreIcon /></span>
                            </div>
                        </div>
                    </div>

                    <ProfileMenu setAnchorEl={setAnchorEl} setProfileMenuOpen={setProfileMenuOpen} anchorEl={anchorEl} profileMenus={profileMenus} />

                </Toolbar>
            </AppBar>
        </>
    );
}


export default Header;