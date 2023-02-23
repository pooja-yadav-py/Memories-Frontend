import React from "react";
import Header from "./components/Layout/header/Header";
import LeftNav from "./components/Layout/left-nav/LeftNav";
import Main from "./components/Layout/main/main";


function Layout() {
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen =()=> {        
        setOpen(true);
    };
    const handleDrawerClose =()=>{        
        setOpen(false)
    }
    return (
        <>
            <div>
                <Header handleDrawerOpen={handleDrawerOpen} open={open} handleDrawerClose={handleDrawerClose}/>
                <LeftNav handleDrawerOpen={handleDrawerOpen} open={open} setOpen={setOpen}/>
                <Main/>
            </div>

        </>
    );
}

export default Layout;