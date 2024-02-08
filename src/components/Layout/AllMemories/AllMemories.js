import React, { useEffect, useState } from 'react';
import { UserContext } from '../../../App.js';
import { Grid, Typography, Button, Paper, Container, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from '@mui/styles';
import LikeButton from "./LikeButton/LikeButton";

let drawerWidth = 240
const useStyles = makeStyles({
    appbar: {
        width: "100%",
        position: "absolute",
        left: "7%"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)!important`,
        marginLeft: '17%!important',
        // width:'83%',
    },
    cardAction:{
        width:"300px",
    }
});


const MemoryCard = ({open, setOpen, memories, setMemories}) => {
    const classes = useStyles();    
    const [likeCounts, setLikeCounts] = useState([]);
    // const [memories, setMemories] = useState([]);
    const [userLikedMemories, setUserLikedMemories] = useState([]);

    // Fetch memories, user likes, and like counts on component mount
    useEffect(() => {
        fetchMemories();
    }, []);

    // Function to fetch memories, user likes, and like counts
    async function fetchMemories() {
        try {
            const token = window.localStorage.getItem("token");
            const headers = {
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            // Make API requests in parallel
            const [memoriesResponse, userLikesResponse, likeCountsResponse] = await Promise.all([
                axios.get(`${process.env.REACT_APP_BASE_URL}memories`, { headers }),
                axios.get(`${process.env.REACT_APP_BASE_URL}userlikememory`, { headers }),
                axios.get(`${process.env.REACT_APP_BASE_URL}countlikememory`, { headers })
            ]);

            // Update state with API response data
            setMemories(memoriesResponse.data.data);
            setUserLikedMemories(userLikesResponse.data.data);
            setLikeCounts(likeCountsResponse.data.data);

            // Handle token expiration
            if (memoriesResponse.data.data === 'Token Expired') {
                alert("Token Expired");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className={open ? classes.appBarShift : classes.appbar}>
            <Grid container spacing={1}>
                {memories.map((memory) => (
                    <Grid item xs={12} sm={4} lg={3} key={memory._id} sx={{ marginBottom: '20px' }}>
                        <Card sx={{ maxWidth: 350 }}>
                            <CardActionArea className={classes.cardAction}>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={memory.selectedFile}
                                    alt="Memory Image"
                                    sx={{
                                        objectFit: 'contain',
                                        backgroundColor: '#837ca74f',
                                        transition: 'transform 0.3s ease-in-out', 
                                        '&:hover': {
                                            transform: 'scale(1.2)',
                                        } 
                                    }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {memory.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {memory.message}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Typography>Created By: <b style={{ color: 'blue' }}>{memory.name}</b></Typography>
                                <LikeButton memory={memory} userLikedMemories={userLikedMemories} setUserLikedMemories={setUserLikedMemories} fetchMemories={fetchMemories}/>
                                <Typography>
                                    {likeCounts.map((like) => {
                                        if (like._id === memory._id) {
                                            return like.totalLikes;
                                        }
                                    })}
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MemoryCard;
