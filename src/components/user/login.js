import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ValidatorForm} from 'react-material-ui-form-validator';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

import '../../style/global.css';
// import Logo from '../../images/logowebp.jpeg';
import Logo from "../../images/lotus.webp";

const LOGIN_style = {
    signTitle : {marginTop: '10px', marginBottom: '10px', fontSize: '1.3rem'},
    awsloader:{position: "absolute",margin: "auto",width: "20%",height: "20%",top: '0',
           left: '0',bottom: '0',right: '0',fontSize: '20px',fontWeight: 'bold'
    },
    awsOption:{
      position:'relative','top':'10px','background': '#fff','fontWeight':'bold','padding':'5px'},
    awsLineOption:{'textAlign':'center','color':'#333','border-bottom': '1px solid #ccc','margin-top':'10px','margin-bottom':'30px'}
  } 





let onSingleSingin =()=>{
    
}


function Login(){
    const [field,setField] = useState({email:'',password:''});    
    
    let handleChange =(e) =>{  
      console.log(e.target.name)
        setField({...field,  [e.target.name]:e.target.value})              
    }
    
    let handleLogIn = (e)=>{      
        e.preventDefault();
        console.log("fe",field)  
        const {email,password} = field;
        fetch("http://localhost:5000/loginuser", {
          method:"POST",
          crossDomain:true,
          headers:{
            "content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-origin":"*",
          },
          body:JSON.stringify({
            email,password,
          }),
        }).then((res)=>res.json())
        .then((data)=>{console.log(data,'userlogin')
        if(data.status=='ok'){
         
          window.localStorage.setItem("token",data.data)
          window.localStorage.setItem("loggedIn",true)

          window.location.href="/Home"
        }
      })
        
    }
    
    console.log("login")
    return (
        <div className='outside_div'> 
         <div style={{height: '100vh', width:'100%',backgroundImage: `url("https://png.pngtree.com/background/20210711/original/pngtree-literary-cartoon-book-teaching-banner-poster-picture-image_1078154.jpg")`, backgroundSize: 'cover'}}>           
         <Container className="inner-div" >              
           <Container className="main" component="main" style={{height:'500px', width:'30%'}}  > 
           <h1 align="center">
                <Avatar alt="App Logo" src={Logo} style={{maxWidth: '250px', maxHeight: '75px',width: '35%', height: 'auto',margin:'auto'}}/>
            </h1>
            <h2 className="signIn" align="center">Sign In  </h2>
            <ValidatorForm className="form" name="submitLoginForm" onSubmit= {handleLogIn} style={{ width:'80%',margin:'auto',marginTop:'30px'}}>
              <h2 title="Enter Email">
                <TextField  
                  sx={{ my: 1}}                            
                  variant="outlined"            
                  fullWidth
                  id="outlined-password-input"
                  label="Email"                  
                  name="email"   
                  type="email"          
                  value={field.email}
                  onChange={handleChange}
                />
              </h2>
              <h2 title="Enter Password">                
                <TextField
                    sx={{ my: 2 }}
                    id="outlined-password-input" 
                    label="password" 
                    variant="outlined" 
                    fullWidth     
                    type="password"  
                    name="password"  
                    // sx={{ my: 3 }}  
                    value={field.password}
                    onChange={handleChange}         
                    
                    
                 />
              </h2>
              <Grid container style={{marginTop:'16px'}}>
              <Grid item style={{'margin':'auto'}} >
              <Link to='/signup' variant="contained"  className='button_resistor'>Resistor</Link>
             </Grid>
                <Grid item xs className="progressOutside">
                  <Container className="progressInside" maxWidth={false} style={{ paddingLeft: '0',paddingRight:'0',textAlign:'right' }}>
                    <h2 title="Login">
                      <div>
                      <Button variant="contained" type="submit" style={{backgroundColor:'greeen'}}>Login</Button>
                      </div>
                    </h2>
                  </Container>
                </Grid>
              </Grid>
            <>
            <p  style={LOGIN_style.awsLineOption} >
            {/* <span style={LOGIN_style.awsOption}> OR </span> */}
            </p>
            <Grid container >
                <Link to="/forgetpassword" variant="body2" className="forgotFontSize" >
                      Forgot Password?
                </Link>               
             
            </Grid>
            </>            
            </ValidatorForm>
          </Container>
         </Container> 
         </div>
        </div>
    )
}

export default Login;