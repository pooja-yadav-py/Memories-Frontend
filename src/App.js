import { useState } from "react";
import "./App.css";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import ForgetPassword from "./components/User/ForgetPassword";
import Layout from "./Layout";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPassword from "./components/User/ResetPassword";
import CreateMemory from "./components/Layout/CreateMemory/CreateMemory";
import AllMemories from "./components/Layout/AllMemories/AllMemories";
import Protected from "./components/Protected";
import CheckLogin from "./components/CheckLogin";
import UserList from "./components/Layout/UsersList/UsersList";
import MyMemory from "./components/Layout/MyMemory/MyMemory";
import MemoryChart from "./components/Layout/chart/chart";
import MemoryLikesChart from "./components/Layout/chart/memoryLikeChart";

function App() {
  console.log("=========App");
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(true);
  const [likeUserListModal, setLikeUserListModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginUserMemory, setLoginUserMemory] = useState([]);

  const [memories, setMemories] = useState([]);
  const [likeCounts, setLikeCounts] = useState([]);
  const [userLikedMemories, setUserLikedMemories] = useState([]);
  const [likeUsersList, setLikeUsersList] = useState([]);
  const [res, setRes] = useState(false);

  const [searchValue, setSearchValue] = useState({
    name: "",
    tag: "",
    title: "",
    description: "",
  });

  let login = localStorage.getItem("loggedIn");

  // Function to fetch all memories
  async function fetchMemories() {
    try {
      setLoading(true);
      const token = window.localStorage.getItem("token");

      const headers = {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Make API requests in parallel
      const memoriesResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}memories`,
        {
          params: {
            ...searchValue,
          },
          headers: headers,
        }
      );

      if (memoriesResponse.data.success === true) {
        // Update state with API response data
        setMemories(memoriesResponse.data.data);
        return memoriesResponse.data.data;
      } else if (memoriesResponse.data.success === false) {
        alert(memoriesResponse.data.message);
        setRes(true);
      }
      // Handle token expiration
      if (memoriesResponse.data.data === "Token Expired") {
        alert("Token Expired");
        localStorage.clear();
        window.location.href = "/login";
      }
    } catch (error) {
      // Handle errors
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      console.log(error);
    } finally {
      setLoading(false); // Set loading state to false when data fetching is complete
    }
  }

  // Function to fetch memories of the logged-in user
  async function fetchMyMemories() {
    try {
      setLoading(true);
      const token = window.localStorage.getItem("token");
      const username = window.localStorage.getItem("uname");
      const headers = {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Make API request to get user memories
      let result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}memories`,
        {
          params: {
            ...searchValue,
            name: username,
            isMyMemory: true,
          },
          headers: headers,
        }
      );
      // Handle token expiration and Handle response statuses
      if (result.data.message === "Token Expired") {
        return alert("Token Expired");
      } else if (result.data.success === true) {
        setLoginUserMemory(result.data.data);
        return result.data.data;
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const showLikeUser = async (id) => {
    try {
      const token = window.localStorage.getItem("token");
      const memory_id = id;
      const postData = { memory_id };
      const headers = {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}likeUsers`,
        postData,
        { headers: headers }
      );
      setLikeUsersList(response.data.data);
      setLikeUserListModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  async function likeMemoryCounts() {
    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const likeCountsResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}countlikememory`,
        { headers }
      );

      setLikeCounts(likeCountsResponse.data.data);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      console.log(error);
    }
  }

  async function userLikeMemory() {
    try {
      const token = window.localStorage.getItem("token");
      const headers = {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const userLikesResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}userlikememory`,
        { headers }
      );
      setUserLikedMemories(userLikesResponse.data.data);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      console.log(error);
    }
  }
  return (
    <>
      {login && (
        <Layout
          open={open}
          setOpen={setOpen}
          admin={admin}
          fetchMemories={fetchMemories}
          setSearchValue={setSearchValue}
        />
      )}
      <Routes>
        <Route path="/" element={<CheckLogin Component={Login} />} />
        <Route path="/login" element={<CheckLogin Component={Login} />} />
        <Route path="/signup" element={<CheckLogin Component={Signup} />} />
        <Route
          path="/forgetpassword"
          element={<CheckLogin Component={ForgetPassword} />}
        />
        <Route
          path="/resetpassword/:id"
          element={<CheckLogin Component={ResetPassword} />}
        />
        <Route
          path="/userList"
          element={<Protected Component={UserList} open={open} />}
        />

        <Route
          exact
          path="/home"
          element={
            <Protected
              Component={AllMemories}
              open={open}
              memories={memories}
              userLikedMemories={userLikedMemories}
              setUserLikedMemories={setUserLikedMemories}
              fetchMemories={fetchMemories}
              likeCounts={likeCounts}
              userLikeMemory={userLikeMemory}
              likeMemoryCounts={likeMemoryCounts}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              showLikeUser={showLikeUser}
              likeUserListModal={likeUserListModal}
              setLikeUserListModal={setLikeUserListModal}
              likeUsersList={likeUsersList}
              loading={loading}
              res={res}
            />
          }
        />
        <Route
          exact
          path="/usermemories"
          element={
            <Protected
              Component={MyMemory}
              open={open}
              setOpen={setOpen}
              userLikedMemories={userLikedMemories}
              setUserLikedMemories={setUserLikedMemories}
              likeCounts={likeCounts}
              userLikeMemory={userLikeMemory}
              likeMemoryCounts={likeMemoryCounts}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              showLikeUser={showLikeUser}
              likeUserListModal={likeUserListModal}
              setLikeUserListModal={setLikeUserListModal}
              likeUsersList={likeUsersList}
              fetchMyMemories={fetchMyMemories}
              loginUserMemory={loginUserMemory}
              loading={loading}
              res={res}
              setRes={setRes}
            />
          }
        />

        <Route
          exact
          path="/create"
          element={
            <Protected
              Component={CreateMemory}
              open={open}
              setOpen={setOpen}
              memories={memories}
              setMemories={setMemories}
              fetchMemories={fetchMemories}
            />
          }
        />
        <Route
          exact
          path="/create-memory-chart"
          element={
            <Protected
              Component={MemoryChart}
              open={open}
            />
          }
        />
        <Route
          exact
          path="/memories-menu"
          element={
            <Protected
              Component={MemoryLikesChart}
              open={open}
              isUpdate={true}
              fetchMemories={fetchMemories}
              fetchMyMemories={fetchMyMemories}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
// export {UserContext} ;
