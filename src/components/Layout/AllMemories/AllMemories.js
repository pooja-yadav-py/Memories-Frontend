import React, { useEffect, useState } from 'react';
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
        position:"absolute",
        left:"7%"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)!important`,
        marginLeft: '17%!important',
        // width:'83%',
    }
});


const MemoryCard = (props) => {
    const classes = useStyles();
    // console.log("props",props)
    const { open } = props
    const [response, setResponse] = useState([]);
    useEffect(() => {
        async function MemoryList() {
            try {
                const token = window.localStorage.getItem("token");
                const headers = {
                    "content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                let result = await axios.get(`${process.env.REACT_APP_BASE_URL}memories`, { headers: headers })
                setResponse(result.data.data);
                if (result.data.data == 'Token Expired') {
                    // window.localStorage.clear("token");
                    // localStorage.clear("isAdmin");
                    // window.location.href = "/login";
                    console.log("ok")
                    return alert("Token Expired");
                }

            } catch (error) {
                console.log(error);
            }
        }
        MemoryList();
    }, [])


    return (
        <>
            <Container className={props.open ? classes.appBarShift : classes.appbar}>
                <Grid container spacing={1}>
                    {response.map((item) => (
                        <Grid item xs={12} sm={4} lg={3} sx={{ marginBottom: '20px'}}>
                            <Card key={item._id} sx={{ maxWidth: 350 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={item.selectedFile}
                                        alt="green iguana"
                                        sx={{objectFit: 'contain',backgroundColor:'#837ca74f'}}                                        
                                    />                                    
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.message}
                                        </Typography>
                                        
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Typography>Created By: <b style={{ color: 'blue' }}>{item.name}</b></Typography> 
                                    <LikeButton/>                                   
                                </CardActions>
                                
                            </Card>
                        </Grid>
                    ))}

                </Grid>
            </Container>
        </>

    );
};

export default MemoryCard;
