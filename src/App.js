import './App.css';
import Login from "./components/User/Login";
import Signup from './components/User/Signup';
import Home from './components/Home';
import ForgetPassword from './components/User/ForgetPassword';
import { Route, Routes } from 'react-router-dom'; 
import ResetPassword from './components/User/ResetPassword';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Routes>
      <Route path='/' element={isLoggedIn?<Home />:<Login />}/>  
      <Route path='/login' element={isLoggedIn?<Home />:<Login />}/>   
      <Route path='/home' element={<Home />}/>     
      <Route path='/signup' element={<Signup />}/>
      <Route path='/forgetpassword' element={<ForgetPassword />}/>  
      <Route path='/resetpassword/:id' element={<ResetPassword/>}/>    
    </Routes>
    

  );
}

export default App;
