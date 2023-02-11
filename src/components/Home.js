import { Logout } from '@mui/icons-material';
import react,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';


function Home(){
    
    let Logout = ()=>{
        window.localStorage.clear("token");
        window.location.href="/login";
    }
    const [userData, setUserData] = useState();
    useEffect(() => {
        fetch("http://localhost:5000/userData", {
            method:"POST",
            crossDomain:true,
            headers:{
              "content-Type":"application/json",
              Accept:"application/json",
              "Access-Control-Allow-origin":"*",
            },
            body:JSON.stringify({
              token:window.localStorage.getItem("token"),
            }),
          }).then((res)=>res.json())
          .then((result)=>{console.log(result,'userData');
          setUserData(result.data);
        })
      
    }, [])
    console.log("ddd",userData)
    return(
        <>
            <div style={{marginLeft:"50px"}}>
                {/* Name<h2>{userData.uname}</h2><br></br>
                email<h2>{userData.email}</h2><br></br> */}
                heelo
            
            <Button variant="contained" onClick={Logout}>Logout</Button>
            </div>
      
        </>
    )
}

export default Home;