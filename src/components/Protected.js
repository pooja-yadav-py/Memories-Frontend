import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


function Protected(props) {
    console.log("propssss",props)
    let { Component } = props;
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