import React from "react";
import Header from "./components/Layout/Header/Header";
import LeftNav from "./components/Layout/LeftNav/LeftNav";
import Main from "./components/Layout/UsersList/UsersList";
import MainMemory from "./components/Layout/CreateMemory/CreateMemory";
import MemoryCard from "./components/Layout/AllMemories/AllMemories";
import { Route, Routes } from 'react-router-dom';


function Layout(props) {
    const {open,setOpen,admin} = props
    // const [open, setOpen] = React.useState(false);
    // const [admin,setAdmin] = React.useState(false);
    const handleDrawerOpen =()=> {        
        setOpen(true);
    };
    const handleDrawerClose =()=>{        
        setOpen(false)
    }
    
    console.log("===============layout");
    return (
        <>
            <div>
                <Header handleDrawerOpen={handleDrawerOpen} open={open} handleDrawerClose={handleDrawerClose} admin={admin}/>
                <LeftNav handleDrawerOpen={handleDrawerOpen} open={open} setOpen={setOpen} admin={admin}/>                
                
                {/* <MainContainer/> */}
                {/* {admin && <Main/> } */}
                {/* <MainMemory/> */}
                {/* <MemoryCard/> */}
            </div>

        </>
    );
}

export default Layout;