import {useState,useEffect,createContext} from "react";
import './App.css';
import Login from "./components/User/Login";
import Signup from './components/User/Signup';
import ForgetPassword from './components/User/ForgetPassword';
import Layout from './Layout';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetPassword from './components/User/ResetPassword';
import CreateMemory from "./components/Layout/CreateMemory/CreateMemory";
import AllMemories from './components/Layout/AllMemories/AllMemories';
import Protected from "./components/Protected";
import CheckLogin from "./components/CheckLogin";
import UserList from "./components/Layout/UsersList/UsersList";
import MyMemory from "./components/Layout/MyMemory/MyMemory";


function App() {
  console.log("=========App");
  const [open, setOpen] = useState(false);
  const [admin,setAdmin] = useState(true);
  const [memories, setMemories] = useState([]);
  const [likeCounts, setLikeCounts] = useState([]);
  const [userLikedMemories, setUserLikedMemories] = useState([]);
  let login = localStorage.getItem("loggedIn");
  
  // Function to fetch all memories
  async function fetchMemories() {
    try {
        const token = window.localStorage.getItem("token");
        const headers = {
            "content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        // Make API requests in parallel
        const memoriesResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}memories`, { headers });
        console.log("memoriesResponse",memoriesResponse);

        // Update state with API response data
        setMemories(memoriesResponse.data.data);

        // Handle token expiration
        if (memoriesResponse.data.data === 'Token Expired'){
            alert("Token Expired");
            localStorage.clear();
            window.location.href = '/login';
        }
    } catch (error) {
      // Handle errors
      if(error.response.status===401){
        localStorage.clear();
        window.location.href = '/login';
      }
        console.log(error);
    }
}



async function likeMemoryCounts(){
  try{
    const token = window.localStorage.getItem("token");
        const headers = {
            "content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const likeCountsResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}countlikememory`, { headers });
        console.log(likeCountsResponse)
        setLikeCounts(likeCountsResponse.data.data);
      }catch(error){
        if(error.response.status===401){
          localStorage.clear();
          window.location.href = '/login';
        }
        console.log(error);
  }
}

async function userLikeMemory() {
  try{
    const token = window.localStorage.getItem("token");
        const headers = {
            "content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const userLikesResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}userlikememory`, { headers });
        setUserLikedMemories(userLikesResponse.data.data);
  }catch(error){
    if(error.response.status===401){
      localStorage.clear();
      window.location.href = '/login';
    }
    console.log(error);
  }
}
console.log("likeCounts",likeCounts)
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
      
      <Route exact path='/home' element={<Protected Component={AllMemories} open={open} memories={memories} userLikedMemories={userLikedMemories} setUserLikedMemories={setUserLikedMemories} fetchMemories={fetchMemories} likeCounts={likeCounts} userLikeMemory={userLikeMemory} likeMemoryCounts={likeMemoryCounts}/>}/>
      <Route exact path='/usermemories' element={<Protected Component={MyMemory} open={open} setOpen={setOpen} userLikedMemories={userLikedMemories} setUserLikedMemories={setUserLikedMemories} likeCounts={likeCounts} userLikeMemory={userLikeMemory} likeMemoryCounts={likeMemoryCounts}/>}/>

      <Route exact path='/create' element={<Protected Component={CreateMemory} open={open} setOpen={setOpen} memories={memories} setMemories={setMemories} fetchMemories={fetchMemories}/>}/>
      {/* <Route exact path='/update' element={<Protected Component={CreateMemory} open={open} setOpen={setOpen} isUpdate={true} />}/> */}

                        
    </Routes>    
    </>
  );
}

export default App;
// export {UserContext} ;
