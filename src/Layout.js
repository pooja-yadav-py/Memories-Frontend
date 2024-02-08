import React from "react";
import Header from "./components/Layout/Header/Header";
import LeftNav from "./components/Layout/LeftNav/LeftNav";


function Layout(props) {
    console.log("===============layout");
    const { open, setOpen, admin } = props;
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    }

    return (
        <>
            <div>
                <Header handleDrawerOpen={handleDrawerOpen} open={open} handleDrawerClose={handleDrawerClose} admin={admin} />
                <LeftNav handleDrawerOpen={handleDrawerOpen} open={open} setOpen={setOpen} admin={admin} />
            </div>

        </>
    );
}

export default Layout;