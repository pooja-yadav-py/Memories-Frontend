import './App.css';
import Login from "./components/user/login";
import Signup from './components/user/Signup';
import Home from './components/Home';
import ForgetPassword from './components/user/ForgetPassword';
import { Route, Routes } from 'react-router-dom';

 

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Routes>
      <Route path='/' element={isLoggedIn?<Home />:<Login />}/>  
      <Route path='/login' element={<Login />}/>   
      <Route path='/Home' element={<Home />}/>     
      <Route path='/signup' element={<Signup />}/>
      <Route path='/forgetpassword' element={<ForgetPassword />}/>      
    </Routes>
    

  );
}

export default App;
