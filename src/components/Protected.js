import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Header from './Layout/Header/Header';
import LeftNav from './Layout/LeftNav/LeftNav';



function Protected(props) {
    console.log("propssss",props)
    let { Component,open,setOpen } = props;
    const navigate = useNavigate()
    let isLoggedIn = localStorage.getItem("loggedIn");
    useEffect(() => {
        
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
    }, [])
    
    return (
        <>
            {isLoggedIn && <Component {...props}/>}
        </>
    )
}

export default Protected;