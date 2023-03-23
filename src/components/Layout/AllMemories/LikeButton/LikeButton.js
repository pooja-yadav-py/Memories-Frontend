import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <IconButton onClick={handleLike} sx={{fontSize:'10px'}} title={!liked?"Like This Post":"Dislike This Post"}>
            {liked ? <FavoriteIcon sx={{color:"#ff1744"}}/> : <FavoriteBorderIcon />}
        </IconButton>
    );
};

export default LikeButton;
