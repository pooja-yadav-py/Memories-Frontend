import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import { Grid, Typography, Button, Box, Container, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CreateMemoryForm from "../CreateMemory/CreateMemoryForm";
import LikeButton from '../AllMemories/LikeButton/LikeButton';
import Modal from '@mui/material/Modal';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './myMemory.css';

let drawerWidth = 240
const useStyles = makeStyles({
    appbar: {
        width: "100%",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)!important`,
        marginLeft: '16%!important',
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const styleEdit = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function MyMemory(props) {
    console.log("11111",props)
    const [deleteUser, setDeleteUser] = useState('');
    const [editUser, setEditUser] = useState('');
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpen = (e, item) => { setOpen(true); setDeleteUser(item) };
    const handleClose = () => setOpen(false);

    const handleEditOpen = (e, item) => { setOpenEdit(true); setEditUser(item) };
    const handleEditClose = () => setOpenEdit(false);

    const classes = useStyles();
    const [loginUserMemory, setLoginUserMemory] = useState([]);

    useEffect(() => {
        props.fetchMemories();
    }, []);
    
    async function MemoryList() {
        try {
            const token = window.localStorage.getItem("token");
            const headers = {
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            let result = await axios.get(`${process.env.REACT_APP_BASE_URL}usermemories`, { headers: headers })
            if (result.data.message === "Token Expired") {
                return alert("Token Expired");
            }
            setLoginUserMemory(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        MemoryList();
    }, [])
    const removeMemory = async (e, deleteUser) => {
        try {
            const token = window.localStorage.getItem("token");
            const admin = window.localStorage.getItem('isAdmin');
            const headers = {
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                'isAdmin':`${admin}`                
            }           
            await axios.delete(`${process.env.REACT_APP_BASE_URL}deletememory/${deleteUser._id}`,{ headers: headers })
        } catch (error) {
            console.log(error);
        }
        handleClose();
        MemoryList();
    }


    return (
        <>
            <Container minwidth="sm" className={props.open ? classes.appBarShift : classes.appbar}>
                <Grid container>
                    {Object.keys(loginUserMemory).length === 0 ?
                        <Card sx={{ minWidth: 275, margin: 'auto', color: '#673ab7' }}>
                            <CardContent>
                                <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
                                    You have no memory&#x1F623;
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Please create Memory First&#x1F917;
                                </Typography>
                            </CardContent>
                        </Card> :
                        loginUserMemory.map((userMemory) =>
                        (
                            <Grid xs={12} sm={6} lg={4} sx={{ marginBottom: '20px' }}>
                                <Card sx={{ maxWidth: 345, marginLeft: '10%' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={userMemory.selectedFile}
                                            alt="green iguana"
                                            sx={{ objectFit: 'contain', backgroundColor: '#837ca74f' }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {userMemory.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {userMemory.message}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions sx={{ justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography>Created By: <b style={{ color: 'blue' }}>{userMemory.name}</b></Typography>
                                            <LikeButton memory={userMemory} userLikedMemories={props.userLikedMemories} setUserLikedMemories={props.setUserLikedMemories} fetchMemories={props.fetchMemories} likeCounts={props.likeCounts} />
                                            <Typography>
                                                {props.likeCounts.map((like) => {
                                                    if (like._id === userMemory._id) {
                                                        return like.totalLikes;
                                                    }
                                                })}
                                            </Typography>
                                    </div>
                                        <div>
                                            <DeleteIcon className="delete-icon" onClick={(e) => handleOpen(e, userMemory)} />
                                            <BorderColorIcon className="edit-Icon" onClick={(e) => handleEditOpen(e, userMemory)} />
                                        </div>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                        )}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                &#x1F633; Are you sure you want to delete this Memory?
                            </Typography>
                            <Button id="modal-action" sx={{ mt: 2 }} onClick={(e) => removeMemory(e, deleteUser)}>
                                yes
                            </Button>
                            <Button sx={{ mt: 2 }} onClick={handleClose}>No</Button>
                        </Box>
                    </Modal>
                    <Modal
                        open={openEdit}
                        onClose={handleEditClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleEdit}>
                            <CreateMemoryForm isUpdate={true} editUser={editUser} handleClose={handleEditClose} MemoryList={MemoryList} />
                        </Box>
                    </Modal>
                </Grid>
            </Container>
            {/* <Dialog onClose={handleClose} open={openModal}>
                <DialogTitle sx={{ fontSize: '20px', fontWeight: 'bold', backgroundColor: '#f0f0f0', padding: '16px' }}>Memory Liked Users </DialogTitle>
                <List sx={{ pt: 0 }}>
                    {likeUsersList.map((item) => {
                       return <ListItem sx={{ fontFamily: 'Arial', fontSize: '18px', color: '#333',backgroundColor: '#dfd5dd', marginBottom: '8px' }} key={item.userId._id}>{item.userId.uname}
                                <FavoriteIcon className="heart"/>
                            </ListItem>;
                    })}
                </List>
            </Dialog> */}
        </>
    )
}

export default MyMemory;