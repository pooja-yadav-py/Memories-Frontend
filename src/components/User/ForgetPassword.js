import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import '../../style/global.css';
import Logo from "../../images/lotus.webp";
import axios from 'axios';

const FORGOTPASSWORD_style = {
    validateMessage: { color: '#f44336', fontSize: '0.75rem', margin: '-5px 0 8px 0', fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'", fontWeight: 400, lineHeight: 1.66, letterSpacing: '0.03333em' },
    forgotPasswordText: { marginTop: '10px', marginBottom: '10px', fontSize: '1.3rem' },
    forgotPasswordMsgText: { marginTop: '10px', marginBottom: '10px', fontSize: '14px', color: '#b62020' }
}


function ForgetPassword() {
    const [resetPasswordEmail, setResetPasswordEmail] = useState('');
    const [message, setMessage] = useState("");
    const [loading,setLoading] = useState(false);
    
    const ResetPasswordEmailHandleChange = (e) => {        
        setResetPasswordEmail(e.target.value)
        setMessage('')
    }

    const submitForm = async () => {        
        try{
            if(resetPasswordEmail===''){
                setMessage('Field cannot be empty!');
                return;
            }
            const postData = { email: resetPasswordEmail };
            const headers = {
                "content-Type": "application/json"
             }
             setLoading(true);
             let response = await axios.post(`${process.env.REACT_APP_BASE_URL}forgetpassword`, postData,{headers:headers});
             console.log(response)
             setMessage(response.data.message);            
             
        }catch(err){
            console.log(err)
        }        
    }
    console.log("message",message)

    return (
        <div className='outside_div'>
            <div style={{ height: '100vh', width: '100%', backgroundImage: `url("https://png.pngtree.com/background/20210711/original/pngtree-literary-cartoon-book-teaching-banner-poster-picture-image_1078154.jpg")`, backgroundSize: 'cover' }}>
                <Container className="inner-div" >
                    <Container className="main" component="main" style={{ height: '400px', width: '30%' }}  >
                        <h1 align="center">
                            <Avatar alt="App Logo" src={Logo} style={{ maxWidth: '250px', maxHeight: '75px', width: '35%', height: 'auto', margin: 'auto' }} />
                        </h1>
                        <h2 className="signIn" align="center" style={FORGOTPASSWORD_style.forgotPasswordText}>Forgot your password?</h2>
                        <h2 variant="h6" align="center" style={FORGOTPASSWORD_style.forgotPasswordMsgText}>Password reset instructions will be sent to the email address associated with your account.</h2>
                        {message.length ? <p style={{ color: 'red', marginLeft:'1rem'}}>{message}</p> : ''}

                        <ValidatorForm onSubmit={submitForm}>
                            <h2 title="Enter Username">
                                <TextField
                                    sx={{ mt: 2, mb: 3 }}
                                    id="outlined-basic"
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    type="email"
                                    fullWidth
                                    value={resetPasswordEmail}
                                    onChange={ResetPasswordEmailHandleChange}
                                />
                            </h2>

                            <Grid container spacing={1} >
                                <Button variant="contained" type='submit' style={{ margin: 'auto' }} disabled={loading}>send Email</Button>
                            </Grid>
                            <Grid container spacing={1} style={{ marginTop: '10px' }} >
                                <Link to='/signup' style={{ margin: 'auto' }}>Register</Link>
                            </Grid>

                        </ValidatorForm>
                    </Container>
                </Container>
            </div>
        </div>
    )
}

export default ForgetPassword;