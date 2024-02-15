import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';


const LikeButton = ({memory, userLikedMemories, setUserLikedMemories,likeMemoryCounts}) => {
    
    const handleLike = async (p) => {
        try {
            const token = window.localStorage.getItem("token");
            const memory_id = memory._id;
            console.log("memory_id",memory_id)
            const postData = { memory_id };
            const headers = {
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            let response = await axios.post(`${process.env.REACT_APP_BASE_URL}likememory`, postData, { headers: headers });
            if(response.data.message==='Memory Like'){
                setUserLikedMemories([...userLikedMemories,response.data.data])
            }else if(response.data.message==='Memory DisLike'){
                let filteredData = userLikedMemories.filter((item)=>{
                    return item.memoryId!==memory._id
                })
                setUserLikedMemories([...filteredData]);
            }
            
            likeMemoryCounts();
            
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
