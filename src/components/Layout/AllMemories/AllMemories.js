import React, { useState, useEffect } from "react";
import "../../../style/global.css";
import "../searchBar/searchBar.css";
import {imageStyles} from '../../../style/global';
import Loading from "../Loading/loading";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Grid,
  Box,
  Typography,
  Container,
  CardActionArea,
  CardActions,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import LikeButton from "../LikeButton/LikeButton";
import SearchBar from "../searchBar/SearchBar";

let drawerWidth = 240;
const useStyles = makeStyles({
  appbar: {
    width: "100%",
    position: "absolute",
    left: "7%",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)!important`,
    marginLeft: "17%!important",
  },
  cardAction: {
    width: "300px",
  },
});

const MemoryCard = ({
  open,
  memories,
  userLikedMemories,
  setUserLikedMemories,
  fetchMemories,
  likeCounts,
  userLikeMemory,
  likeMemoryCounts,
  setSearchValue,
  searchValue,
  showLikeUser,
  likeUserListModal,
  setLikeUserListModal,
  likeUsersList,
  loading,
  res
}) => {
  const classes = useStyles();

  const [openModalImage, setOpenModalImage] = useState(false);
  const [img, setImg] = useState("");

  useEffect(() => {
    fetchMemories();
    likeMemoryCounts();
    userLikeMemory();
  }, []);

  const handleCloseLikeUserList = () => {
    setLikeUserListModal(false);
  };

  const showMemoryImage = (pic) => {
    console.log(pic);
    setOpenModalImage(true);
    setImg(pic);
  };

  const handleCloseImage = () => {
    setOpenModalImage(false);
  };
console.log(res)
  return (
    <>
      {loading && res===false? (
        <Loading/>
      ) : (
        <Container className={open ? classes.appBarShift : classes.appbar}>
          <Grid container className="search-bar-container">
            <Grid item>
              <SearchBar
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                fetchMemories={fetchMemories}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            {memories.map((memory) => (
              <Grid
                item
                xs={12}
                sm={4}
                lg={3}
                key={memory._id}
                sx={{ marginBottom: "20px" }}
              >
                <Card sx={{ maxWidth: 350 }}>
                  <CardActionArea className={classes.cardAction}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={memory.selectedFile}
                      alt="Memory Image"
                      sx={imageStyles}
                      onClick={() => showMemoryImage(memory.selectedFile)}
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
                    <Typography>
                      Created By: <b style={{ color: "blue" }}>{memory.name}</b>
                    </Typography>
                    <LikeButton
                      memory={memory}
                      userLikedMemories={userLikedMemories}
                      setUserLikedMemories={setUserLikedMemories}
                      likeMemoryCounts={likeMemoryCounts}
                    />
                    <Typography
                      className="count"
                      onClick={() => showLikeUser(memory._id)}
                    >
                      {likeCounts.map((like) => {
                        if (like._id === memory._id) {
                          return like.totalLikes === 0 ? "" : like.totalLikes;
                        }
                      })}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      <Dialog onClose={handleCloseLikeUserList} open={likeUserListModal}>
        <DialogTitle
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: "#f0f0f0",
            padding: "16px",
          }}
        >
          Memory Liked Users{" "}
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          {likeUsersList.map((item) => {
            return (
              <ListItem
                sx={{
                  fontFamily: "Arial",
                  fontSize: "18px",
                  color: "#333",
                  backgroundColor: "#dfd5dd",
                  marginBottom: "8px",
                }}
                key={item.userId._id}
              >
                {item.userId.uname}
                <FavoriteIcon className="heart" />
              </ListItem>
            );
          })}
        </List>
      </Dialog>
      <Dialog
        onClose={handleCloseImage}
        open={openModalImage}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
          }}
          src={img}
        />
      </Dialog>
    </>
  );
};

export default MemoryCard;
