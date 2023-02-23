import { Logout } from '@mui/icons-material';
import react, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import Header from './Layout/header/Header';
import { Container } from '@mui/system';


function Home() {
        
    const [userData, setUserData] = useState(null);
    useEffect(() => {

        async function userDetail() {
            try {
                const token = window.localStorage.getItem("token")
                const headers = {
                    "content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                let response = await axios.get(`${process.env.REACT_APP_BASE_URL}userData`, { headers: headers })
                               
                if(response.data.data=="Token Expired"){
                    alert("Token Expired, Login Again");
                    Logout();
                }
                setUserData(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        userDetail();
    }, [])
    return (
        <>         
            {/* <div>pooja</div> */}
            {/* <Header/> */}
            
        </>
    )
}

export default Home;