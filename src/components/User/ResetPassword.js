import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Logo from "../../images/lotus.webp";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState('');
    let Url = window.location.href.split("/");
    let UserId = Url[Url.length - 1];

    const passwordHandlechange = (e) => {
        setMessage('')
        setPassword(e.target.value)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const ChangePassword = async (e) => {
        try {
            if (password == '') {
                setMessage('Field cannot be empty!')
                return;
            }
            const postData = { password: password, id: UserId };
            const headers = {
                "content-Type": "application/json"
            }
            let response = await axios.post(`${process.env.REACT_APP_BASE_URL}resetpassword`, postData, { headers: headers })
            
            if (response.data.success === true) {
                let a = toast.success(response.data.message);                
                setPassword('');
                //window.location.href="/login";                            
            } else {
                setMessage(response.data.message)
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='outside_div'>
            <div style={{ height: '100vh', width: '100%', backgroundImage: `url("https://png.pngtree.com/background/20210711/original/pngtree-literary-cartoon-book-teaching-banner-poster-picture-image_1078154.jpg")`, backgroundSize: 'cover' }}>
                <Container className="inner-div" >
                    <Container className="main" component="main" style={{ height: '300px', width: '30%', marginTop: '10%' }}  >
                        <h1 align="center">
                            <Avatar alt="App Logo" src={Logo} style={{ maxWidth: '250px', maxHeight: '75px', width: '35%', height: 'auto', margin: 'auto' }} />
                        </h1>
                        <h2 className="signup" align="center" >ResetPassword </h2>
                        {message.length ? <span style={{ color: 'red', marginLeft: '2rem' }}>{message}</span> : ''}

                        <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
                            <InputLabel htmlFor="outlined-adornment-password" >New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={passwordHandlechange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="New Password"
                            />
                        </FormControl>
                        <Grid container spacing={1} >
                            <Button variant="contained" style={{ margin: 'auto', marginTop: '2rem' }} onClick={ChangePassword}>confirm</Button>
                        </Grid>
                    </Container>
                </Container>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
            />
        </div>
    )
}

export default ResetPassword;