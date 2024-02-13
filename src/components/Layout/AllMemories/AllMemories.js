import React, {useState, useEffect } from 'react';
import axios from 'axios';
import '../../../style/global.css';


import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, Typography, Container, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
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
    },
    cardAction:{
        width:"300px",
    }
});

const MemoryCard = ({open, memories,userLikedMemories, setUserLikedMemories,fetchMemories,likeCounts,userLikeMemory,likeMemoryCounts}) => {
    const classes = useStyles();   
    const [likeUsersList,setLikeUsersList] = useState([]);
    const [openModal , setOpenModal] = useState(false);
    
    useEffect(() => {
        fetchMemories();
        likeMemoryCounts();
        userLikeMemory();
    }, []);

    const showLikeUser = async (id) =>{
        try {
            const token = window.localStorage.getItem("token");
            const memory_id = id;
            const postData = { memory_id };
            const headers = {
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            let response = await axios.post(`${process.env.REACT_APP_BASE_URL}likeUsers`, postData, { headers: headers });
            setLikeUsersList(response.data.data)
            setOpenModal(true);
        } catch (error) {
            console.log(error);
        }
    }
    const handleClose = ()=>{
        setOpenModal(false);
    }
    return (
        <>
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
                                    <LikeButton memory={memory} userLikedMemories={userLikedMemories} setUserLikedMemories={setUserLikedMemories} likeMemoryCounts={likeMemoryCounts}/>
                                    <Typography className="count" onClick={()=>showLikeUser(memory._id)}>
                                        {likeCounts.map((like) => {
                                            if(like._id === memory._id) {
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
            <Dialog onClose={handleClose} open={openModal}>
                <DialogTitle sx={{ fontSize: '20px', fontWeight: 'bold', backgroundColor: '#f0f0f0', padding: '16px' }}>Memory Liked Users </DialogTitle>
                <List sx={{ pt: 0 }}>
                    {likeUsersList.map((item) => {
                       return <ListItem sx={{ fontFamily: 'Arial', fontSize: '18px', color: '#333',backgroundColor: '#dfd5dd', marginBottom: '8px' }} key={item.userId._id}>{item.userId.uname}
                                <FavoriteIcon className="heart"/>
                            </ListItem>;
                    })}
                </List>
            </Dialog>
        </>
    );
};

export default MemoryCard;
