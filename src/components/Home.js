import { Logout } from '@mui/icons-material';
import react, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';


function Home() {

    let Logout = () => {
        window.localStorage.clear("token");
        window.location.href = "/login";
    }
    
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
                console.log("resss", response.data)
                // let p =response.data
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
          {userData &&
            <div style={{ marginLeft: "50px" }}>
                 Name-{userData.uname}
                email-{userData.email}
                

                
            </div>
            }
            <Button variant="contained" onClick={Logout}>Logout</Button>
        </>
    )
}

export default Home;