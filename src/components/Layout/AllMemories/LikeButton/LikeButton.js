import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';


const LikeButton = ({memory, userLikedMemories, setUserLikedMemories, fetchMemories}) => {
    async function getLikedMemoriesForUser() {
        try {
            const token = window.localStorage.getItem("token");
            const headers = {
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            let result = await axios.get(`${process.env.REACT_APP_BASE_URL}userlikememory`, { headers: headers })
            console.log(result.data.data)
            
            setUserLikedMemories(result.data.data);   
        } catch (error) {
            console.log(error);
        }        
    }



    const handleLike = async (p) => {
        try {
            const token = window.localStorage.getItem("token");
            const memory_id = memory._id;
            const postData = { memory_id };
            const headers = {
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            let response = await axios.post(`${process.env.REACT_APP_BASE_URL}likememory`, postData, { headers: headers });
            console.log("=====--",response.data.data)
            getLikedMemoriesForUser(); 
            fetchMemories()
        } catch (error) {
            console.log(error);
        }
    };
    let c = userLikedMemories.map((item)=>{
        return item.memoryId;
    })
    
    return (
        <IconButton onClick={(e)=>{handleLike(memory._id)}} sx={{ fontSize: '10px' }} title={!(c.includes(memory._id)) ? "Like This Post" : "Dislike This Post"}>
            {c.includes(memory._id) ? <FavoriteIcon sx={{ color: "#ff1744" }} /> : <FavoriteBorderIcon />}
        </IconButton>
    );
};

export default LikeButton;
