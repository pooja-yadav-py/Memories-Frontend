import React, { useEffect, useState } from 'react';
import MaterialTable, { Column } from "@material-table/core";
import Container from '@mui/material/Container';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

function Main() {
  const [userList, setUserList] = useState([])
  
  useEffect(() => {
    async function UserList() {
      try {
        const token = window.localStorage.getItem("token");
        const headers = {
          "content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        let users = await axios.get(`${process.env.REACT_APP_BASE_URL}userslist`, { headers: headers })
        console.log(users.data.data);
        setUserList(users.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    UserList();
  }, [])
 
  const data = userList;
  const columns = [
    { title: "First Name", field: "uname" },
    { title: "Email", field: "email" },
    { title: "Gender", field: "gender" }
  ];

  return (
    <>
      <Container minwidth="sm">
        <MaterialTable title="Users Details"          
          columns={columns}
          data={data}
          options={{
            rowStyle: {
              backgroundColor: '#EEE',
            },
            headerStyle: {
              backgroundColor: '#808080ab',
              color: 'black',
              fontWeight: 'bold'
            }
          }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  const token = window.localStorage.getItem("token");
                  const headers = {
                    "content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  }                  
                  if (!newData.uname || !newData.email || !newData.gender || !newData.uname.trim().length || !newData.email.trim().length || !newData.gender.trim().length) {                    
                    toast.warn("All fields are mandatory");
                    reject();
                    return;
                  }
                  
                  let email, gender;
                  if ( ["male", "female", "other"].includes(newData.gender.toLowerCase())) {
                    gender = newData.gender
                  } else {
                    toast.warn("Please enter a valid gender");
                    reject();
                    return;
                  }
                  if (newData.email.includes("@gmail.com")) {
                    email = newData.email
                  } else {
                    toast.warn("Please enter a valid email address")
                    reject();
                    return;
                  }
                  const postData = {
                    username: newData.uname,
                    email: email,
                    password: 'kumar123',
                    gender: gender
                  };
                  try {
                    let response = await axios.post(`${process.env.REACT_APP_BASE_URL}resister`, postData, { headers: headers })
                    console.log(response);
                  } catch (error) {
                    console.log(error);
                  }
                  resolve();
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  const token = window.localStorage.getItem("token");
                  const headers = {
                    "content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  }
                  const postData = {
                    _id: newData._id,
                    uname: newData.uname,
                    email: newData.email,
                    gender: newData.gender
                  };
                  try {
                    let c = await axios.put(`${process.env.REACT_APP_BASE_URL}updateuser/`, postData, { headers: headers })
                    console.log(c);
                  } catch (error) {
                    console.log(error)
                  }
                  let updatedData = userList.map((item) => {

                    if (item._id == newData._id) {
                      item = newData;
                    }
                    return item;

                  })
                  setUserList(updatedData);
                  resolve();
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                console.log(oldData);
                setTimeout(async () => {
                  const token = window.localStorage.getItem("token");
                  const headers = {
                    "content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  }
                  try {
                    await axios.delete(`${process.env.REACT_APP_BASE_URL}deleteuser/${oldData._id}`, { headers: headers })
                  } catch (error) {
                    console.log(error);
                    reject();
                  }
                  let newData = data.filter((item) => {
                    console.log("itemid", item._id);
                    console.log("olddata", oldData._id);
                    return item._id !== oldData._id
                  })
                  setUserList(newData);
                  resolve()
                }, 1000)
              }),
          }}
        />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          theme="dark"
        />
      </Container>

    </>
  )
}

export default Main;