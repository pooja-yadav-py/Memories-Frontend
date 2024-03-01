import React, { useState, useEffect }  from 'react';
import './createMemory.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './createMemory.css';

import { TextField, Typography, Button } from '@mui/material';


function CreateMemoryForm(props) {
    const [loading,setLoading] = useState(false)
    console.log("====",props)
    const { isUpdate,editUser,handleClose, MemoryList,memories,setMemories } = props;   
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
    
    useEffect(() => {
        let initialData = isUpdate ? { title: editUser.title, message: editUser.message, tags: editUser.tags, selectedFile: '' } : { title: '', message: '', tags: '', selectedFile: '' }
        setPostData({ ...initialData })
    }, [isUpdate])
    
    const handlesubmit = async (event) => {  
        // Get token and user name from local storage
        const token = window.localStorage.getItem("token");
        const name = window.localStorage.getItem("uname");
        event.preventDefault();
        // Create form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('title', postData.title);
        formData.append('message', postData.message);
        formData.append('tags', postData.tags);
        formData.append('selectedFile', postData.selectedFile);
        { isUpdate && formData.append('_id', editUser._id) }
        console.log("postData",postData)
        const headers = {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        }
        try {        
            // Validate form fields
            if (postData.title === '' || postData.message === '' || postData.tags === '' || (!isUpdate && postData.selectedFile === '')) {
                 alert("Fields cannot be empty");
                 return;
            }
            setLoading(true) 
            if (isUpdate) {   
                // Update memory if isUpdate flag is true
                let response = await axios.put(`${process.env.REACT_APP_BASE_URL}updatememory`, formData, { headers: headers }) 
                
                // Handle response statuses
                if(response.status === 401){
                     alert("Token Expired");
                }else if(response.status === 200){
                     alert(response.data.message)
                }else if(response.status === 403){
                     alert(response.data.message)
                }
            } else {
                // Create new memory if isUpdate flag is false
                let response = await axios.post(`${process.env.REACT_APP_BASE_URL}creatememory`, formData, { headers: headers })              
                
                // Handle response statuses
                if(response.status === 401){
                    return alert("Token Expired");
                }else if(response.status === 201){
                    setMemories([...memories,response.data.data])
                    props.fetchMemories();
                    return alert(response.data.message)
                }    
            }  
            setLoading(false)  
            handleClose();                          
            props.MemoryList();             
        } catch (error) {
            console.error(error);
        }
    }
    const clear = () => {
        setPostData({ title: '', message: '', tags: '', selectedFile: '' })
    }

    

    return (
        <>
            <div autoComplete='off' noValidate className='form'>
                <Typography variant='h6' className="mamory-header"> {isUpdate ? "Update a Mempry" : "Creating a Memory"}</Typography>
                <TextField name="title" sx={{ mb: 1 }} variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}></TextField>
                {/* <TextareaAutosize name="message" placeholder="message here..." sx={{ mb: 1 }} style={{width: '100%',height:'56px'}} variant='outlined'label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/> */}
                <TextField name="message" sx={{ mb: 1 }} variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}></TextField>
                <TextField name="tags" sx={{ mb: 1 }} variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })}></TextField>
                <TextField className='fileInput' type="file" onChange={(e) => setPostData({ ...postData, selectedFile: e.target.files[0] })} ></TextField>
                <Button className='buttonSubmit' disabled={loading} sx={{ mb: 1, mt: 1 }} variant='contained' color='primary' size='large' onClick={handlesubmit} fullWidth>{isUpdate ? "Update Memory": <Link to="/home">Create Memory</Link>}</Button>
                <Button className='buttonSubmit' variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                theme="colored"
            />
        </>
    )
}

export default CreateMemoryForm;