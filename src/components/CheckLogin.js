import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Header from './Layout/Header/Header';
import LeftNav from './Layout/LeftNav/LeftNav';



function Protected(props) {
    let { Component } = props;
    const navigate = useNavigate()
    useEffect(() => {
        let login = localStorage.getItem("loggedIn");
        if (login) {
            navigate('/home')
        }
    }, [])
    return (
        <>
            <Component />
        </>
    )
}

export default Protected;