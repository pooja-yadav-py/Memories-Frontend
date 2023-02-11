import React,{useState} from 'react';
import Container from '@mui/material/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
// import Link from '@mui/material/Link';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import '../../style/global.css';
import { color, width } from '@mui/system';
import Logo from "../../images/lotus.webp";

function Signup(){
    const [showPassword, setShowPassword] = useState(false);

    const [field,setField] = useState({username:'',email:'',password:'',gender:''})
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    const handlechange =(e)=>{
        console.log("e",e.target.name);
        setField({...field,[e.target.name]:e.target.value})
    }
    let handleSignup = (e)=>{
        e.preventDefault();
        const {username,email,password,gender} = field;
        fetch("http://localhost:5000/resister", {
          method:"POST",
          crossDomain:true,
          headers:{
            "content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-origin":"*",
          },
          body:JSON.stringify({
            username,email,password,gender,
          }),
        }).then((res)=>res.json())
        .then((data)=>{console.log(data,'userResister')
      })
    }
    console.log("signup")
    return(
        <div className='outside_div'> 
         <div style={{height: '100vh', width:'100%',backgroundImage: `url("https://png.pngtree.com/background/20210711/original/pngtree-literary-cartoon-book-teaching-banner-poster-picture-image_1078154.jpg")`, backgroundSize: 'cover'}}>        
         <Container className="inner-div" >              
           <Container className="main" component="main" style={{height:'500px', width:'30%'}}  > 
           <h1 align="center">
                <Avatar alt="App Logo" src={Logo} style={{maxWidth: '250px', maxHeight: '75px',width: '35%', height: 'auto',margin:'auto'}}/>
            </h1>
            <h2 className="signup" align="center" >Sign up  </h2>
            <ValidatorForm className="form" name="submitLoginForm" onSubmit= {handleSignup} style={{ width:'80%',margin:'auto',marginTop:'30px'}}>
              <h2 title="Enter Username">
              <TextField 
               id="outlined-basic" 
                label="username" 
                variant="outlined" 
                fullWidth
                name="username"
                value={field.username}
                onChange={handlechange}
                />
              </h2>
              <FormControl  variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'} 
                        value={field.password}
                        onChange={handlechange}                       
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}                                
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                       label="Password"                       
                    />
               </FormControl>
               <h2 title="Enter Username">
                <TextField 
                  sx={{mt:1}}
                  id="outlined-basic" 
                  label="Email" 
                  name="email"
                  variant="outlined" 
                  type="email"
                  fullWidth
                  value={field.email}
                  onChange={handlechange}
                  />                  
                </h2>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={field.gender}                        
                    >
                        <FormControlLabel value="female" name="gender" onChange={handlechange} control={<Radio />} label="Female" />
                        <FormControlLabel value="male" name="gender" onChange={handlechange} control={<Radio />} label="Male" />
                        <FormControlLabel value="other" name="gender" onChange={handlechange} control={<Radio />} label="Other" />                       
                    </RadioGroup>
                </FormControl>

              
              <Grid container style={{marginTop:'16px'}}>
              <Grid item style={{'margin':'auto'}} >
              <Link to="/" variant="contained"  className='button_resistor'>Login</Link>
              </Grid>
                <Grid item xs className="progressOutside">
                  <Container className="progressInside" maxWidth={false} style={{ paddingLeft: '0',paddingRight:'0',textAlign:'right' }}>
                    <h2 title="Login">
                      <div>
                        <Button variant="contained" type="submit" style={{backgroundColor:'greeen'}}>Signup</Button>
                      </div>
                    </h2>
                  </Container>
                </Grid>
              </Grid>                      
            </ValidatorForm>
          </Container>
         </Container> 
         </div>
        </div>
    )
}

export default Signup;
