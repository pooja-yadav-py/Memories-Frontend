import React, { useState, useRef } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';

import { TextField, Typography, Button, Paper } from '@mui/material';
import './mainMemory.css';


function MainMemory() {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
    const handlesubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('message', postData.message);
        formData.append('tags', postData.tags);
        formData.append('selectedFile', postData.selectedFile);
       
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}creatememory`, formData, { headers: headers })
        } catch (error) {
            console.error(error);
        }
    }

    const clear = () => {
        setPostData({ title: '', message: '', tags: '', selectedFile: '' })
    }
    return (
        <>
            <Container minwidth="sm">
                <Paper className='paper' elevation={3}>
                    <div autoComplete='off' noValidate className='form'>
                        <Typography variant='h6' className="mamory-header"> Creating a Memory</Typography>
                        <TextField name="title" sx={{ mb: 1 }} variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}></TextField>
                        {/* <TextareaAutosize name="message" placeholder="message here..." sx={{ mb: 1 }} style={{width: '100%',height:'56px'}} variant='outlined'label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/> */}
                        <TextField name="message" sx={{ mb: 1 }} variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}></TextField>
                        <TextField name="tags" sx={{ mb: 1 }} variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })}></TextField>
                        <TextField className='fileInput' type="file" onChange={(e) => setPostData({ ...postData, selectedFile: e.target.files[0] })} ></TextField>
                        <Button className='buttonSubmit' sx={{ mb: 1, mt: 1 }} variant='contained' color='primary' size='large' onClick={handlesubmit} fullWidth>Submit</Button>
                        <Button className='buttonSubmit' variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
                    </div>
                </Paper>
            </Container>
        </>
    )
}

export default MainMemory;