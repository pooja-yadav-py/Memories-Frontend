import * as React from 'react';
import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import TimelineIcon from '@mui/icons-material/Timeline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BallotIcon from '@mui/icons-material/Ballot';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural'; 
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
  
  let admin = localStorage.getItem("isAdmin");
  
  let menus = [
    {name: "Memories", url:"/home", getIcon: () => <PermMediaIcon style={{ color: '#dd0f78', fontSize: '34px', }} />},
    {name: "My Memories", url:"/usermemories", getIcon: () => <FaceRetouchingNaturalIcon style={{ color: '#dd0f78', fontSize: '34px', }} />},
    {name: "Created Memory Chart", url:"/create-memory-chart", getIcon: () => <TimelineIcon style={{ color: '#dd0f78', fontSize: '34px', }}/>},
    {name: "Like Memory Chart",url:"/memories-menu",getIcon: () => <ThumbUpIcon style={{ color: '#dd0f78', fontSize: '34px', }}/>}

  ]
  
  let adminMenus = [
    {name: "Users", url:"/userList", getIcon: () => <PeopleIcon style={{ color: '#dd0f78', fontSize: '34px', }} />},
    {name: "Memories Data", url:"/memoriesList", getIcon: () => <BallotIcon style={{ color: '#dd0f78', fontSize: '34px', }} />},
    {name: "Memories", url:"/home", getIcon: () => <PermMediaIcon style={{ color: '#dd0f78', fontSize: '34px', }} />},
    {name: "My Memories", url:"/usermemories", getIcon: () => <FaceRetouchingNaturalIcon style={{ color: '#dd0f78', fontSize: '34px', }} />}, 
    {name: "Created Memory Chart", url:"/create-memory-chart", getIcon: () => <TimelineIcon style={{ color: '#dd0f78', fontSize: '34px', }}/>},
    {name: "Like Memory Chart",url:"/memories-menu",getIcon: () => <ThumbUpIcon style={{ color: '#dd0f78', fontSize: '34px', }}/>}

  ]
  console.log("111admin",typeof admin)
  let result = (admin === "true" ? adminMenus : menus);
  console.log("111result",result)

  const handleClick = (menu) =>{
    console.log(menu)
    
    props.fetchMemories(true)
    
  }
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
                  onClick={() => handleClick(menu)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: props.open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                    className="menuicon"
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