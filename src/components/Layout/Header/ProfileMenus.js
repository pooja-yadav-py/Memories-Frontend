import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

function ProfileMenus(props) {
  const { setAnchorEl, setProfileMenuOpen, anchorEl, profileMenus } = props;
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [field, setField] = useState({ username: '', email: '',oldPassword:'', newPassword:'', gender: '' })
  
  const profileMenuHandleClose = () => {
    setAnchorEl(null);
    setProfileMenuOpen(false);
  };
  
  const handleCloseLogout = () => {
    setAnchorEl(null);
    setProfileMenuOpen(false);
    window.localStorage.clear("token");
    localStorage.clear("isAdmin");
    window.location.href = "/login";
  };

  async function userDetail() {
    try {
        const token = window.localStorage.getItem("token");
        const headers = {
            "content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        let response = await axios.get(`${process.env.REACT_APP_BASE_URL}userslist`, { headers: headers,params:{loginuser:true} })
                       
        if(response.data.data==="Token Expired"){
            alert("Token Expired, Login Again");
            window.location.href = "/login";
        }
        setUserData(response.data.data)
        setField({ username: response.data.data.uname, email: response.data.data.email, oldPassword:'', newPassword:'',gender: response.data.data.gender })
    } catch (error) {
        console.log(error)
    }
  }
  
  const handleOpenModal = () => {
    setOpenModal(true);
    profileMenuHandleClose(); 
    userDetail();
    
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  const handleUpdateProfile = async () =>{
    try{
      const token = window.localStorage.getItem("token");
      const headers = {
          "content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      };

      // Send request to update profile with old and new password
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}updateuser`,
        { 
          _id: userData._id,
          ...field 
        },
        { headers: headers }
      );
      console.log(response)
      if(response.data.status===false){
        alert(response.data.message)
      }else if(response.data.status===true){
        toast.success(response.data.message); 
        setField({ username: '', email: '',oldPassword:'', newPassword:'', gender: '' })
        handleCloseModal();
      }
      console.log("Profile updated successfully", response);
    }catch(error){
      console.error("Error updating profile:", error);
    }
    console.log("my name is pooja")
  }
  const handlechange = (e) =>{
    setField({...field,[e.target.name]:e.target.value});
  }
  
  const handleProfileCancle = () =>{
    setField({ username: '', email: '',oldPassword:'', newPassword:'', gender: '' })
    
  }
  console.log("userData=================",userData)
  console.log(field)
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={profileMenus}
        onClose={profileMenuHandleClose}
      >
        <MenuItem onClick={handleOpenModal}>Setting</MenuItem>
        <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
      </Menu>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "2rem",
            width: "30%",
          }}
        >
          {/* Modal content */}
          <ValidatorForm
            className="form"
            name="submitLoginForm"
            style={{ width: "90%", margin: "auto", marginTop: "16px" }}
          >
            <h2 title="Enter Username">
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                fullWidth
                name="username"
                  value={field.username}
                  onChange={handlechange}
              />
            </h2>
            <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Old Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="oldPassword"
                type="password"
                value={field.oldPassword}
                onChange={handlechange}
                label="Old Password"
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
              <InputLabel htmlFor="outlined-adornment-password">
                New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="newPassword"
                type="password"
                value={field.newPassword}
                onChange={handlechange}
                label="New Password"
              />
            </FormControl>
            <h2 title="Enter Username">
              <TextField
                sx={{ mt: 2 }}
                id="outlined-basic"
                label="Email"
                name="email"
                variant="outlined"
                type="email"
                fullWidth
                  value={field.email}
                  onChange={handlechange}
              />
            </h2>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={field.gender}
              >
                <FormControlLabel
                  value="female"
                  name="gender"
                  control={<Radio />}
                  label="Female"
                  onChange={handlechange}
                />
                <FormControlLabel
                  value="male"
                  name="gender"
                  control={<Radio />}
                  label="Male"
                  onChange={handlechange}
                />
                <FormControlLabel
                  value="other"
                  name="gender"
                  control={<Radio />}
                  label="Other"
                  onChange={handlechange}
                />
              </RadioGroup>
            </FormControl>

            <Grid container style={{ marginTop: "16px" }}>
              <Grid item xs className="progressOutside">
                <Container
                  className="progressInside"
                  maxWidth={false}
                  style={{
                    paddingLeft: "0",
                    paddingRight: "0",
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ backgroundColor: "greeen" }}
                      onClick={handleUpdateProfile}
                    >
                      Save
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ backgroundColor: "greeen" }}
                      onClick={handleProfileCancle}
                    >
                      Cancle
                    </Button>
                  </div>
                </Container>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}

export default ProfileMenus;
