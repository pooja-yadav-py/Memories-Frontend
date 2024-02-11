import * as React from 'react';
import { Link } from "react-router-dom";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { Avatar } from "@mui/material";

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural'; import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import "./LeftNavStyle.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));




const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function LeftNav(props) {
  const {open} = props
  
  let admin = localStorage.getItem("isAdmin");
  
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);


  const handleDrawerClose = () => {
    // console.log("handleDrawerClose")
    props.setOpen(false);
  };
  
  let menus = [
    {name: "Memories", url:"/home", getIcon: () => <PermMediaIcon style={{ color: '#dd0f78', fontSize: '34px', }} />},
    {name: "My Memories", url:"/usermemories", getIcon: () => <FaceRetouchingNaturalIcon style={{ color: '#dd0f78', fontSize: '34px', }} />},
  ]
  
  let adminMenus = [
    {name: "Users", url:"/userList", getIcon: () => <PeopleIcon style={{ color: '#dd0f78', fontSize: '34px', }} />},
    {name: "Memories", url:"/home", getIcon: () => <PermMediaIcon style={{ color: '#dd0f78', fontSize: '34px', }} />},
    {name: "My Memories", url:"/usermemories", getIcon: () => <FaceRetouchingNaturalIcon style={{ color: '#dd0f78', fontSize: '34px', }} />}, 
  ]
  console.log("111admin",typeof admin)
  let result = (admin === "true" ? adminMenus : menus);
  console.log("111result",result)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={props.open} >
        <div className="logoContainer" style={{ fontSize: '30px', fontFamily: 'Georgia, serif', color: 'gray', height: '10%' }}>
          <marquee>&#128104;&#127995; Welcome &#128105;&#127995;</marquee>
        </div>
        <List>          
          {result.map((menu, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <Link to={menu.url} style={{ textDecoration:'none',color:'black' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: props.open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: props.open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                    title={menu.name}
                  >
                    {menu.getIcon()}
                  </ListItemIcon>                  
                     <ListItemText primary={menu.name}  sx={{ opacity: props.open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}

        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}

export default LeftNav;