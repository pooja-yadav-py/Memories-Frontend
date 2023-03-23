import React from "react";
import './App.css';
import Login from "./components/User/Login";
import Signup from './components/User/Signup';
import ForgetPassword from './components/User/ForgetPassword';
import Layout from './Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetPassword from './components/User/ResetPassword';
import CreateMemory from "./components/Layout/CreateMemory/CreateMemory";
import CreateMemoryForm from "./components/Layout/CreateMemory/CreateMemoryForm";
import AllMemories from './components/Layout/AllMemories/AllMemories';
import Protected from "./components/Protected";
import CheckLogin from "./components/CheckLogin";
import UserList from "./components/Layout/UsersList/UsersList";
import MyMemory from "./components/Layout/MyMemory/MyMemory";

function App() {
  const [open, setOpen] = React.useState(false);
  const [admin,setAdmin] = React.useState(true);
  let login = localStorage.getItem("loggedIn");

  return (
    <>     
    {login && <Layout open={open} setOpen={setOpen} admin={admin}/>} 
    <Routes>      
      <Route path='/' element={<CheckLogin Component={Login}/>} />
      <Route path='/login' element={<CheckLogin Component={Login}/>} />
      <Route path='/signup' element={<CheckLogin Component={Signup}/>} />
      <Route path='/forgetpassword' element={<CheckLogin Component={ForgetPassword}/>} />
      <Route path='/resetpassword/:id' element={<CheckLogin Component={ResetPassword}/>} />
      <Route path='/userList' element={<Protected Component={UserList} open={open}/>} />    
      
      <Route exact path='/home' element={<Protected Component={AllMemories} open={open} setOpen={setOpen}/>}/>
      <Route exact path='/usermemories' element={<Protected Component={MyMemory} open={open} setOpen={setOpen}/>}/>

      <Route exact path='/create' element={<Protected Component={CreateMemory} open={open} setOpen={setOpen}/>}/>
      {/* <Route exact path='/update' element={<Protected Component={CreateMemory} open={open} setOpen={setOpen} isUpdate={true} />}/> */}

                        
    </Routes>
    </>
  );
}

export default App;
