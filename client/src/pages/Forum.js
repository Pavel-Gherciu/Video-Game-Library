import Discover from '../components/Discover/Discover';
import Navbar from '../components/Navbar/Navbar';
import Games from '../components/Games/Games';
import React, { Component, Fragment, useEffect, useState, preventDefault } from "react";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import "./Forum.css"




const Forum = ({setAuth}) => {

  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const date_format = month + "/" + day;
  const time = date.getHours() + ":"+ date.getMinutes() + ":" + date.getSeconds();


  const [name, setName] = useState("");

  const [user_id, setUser] = useState("");

  async function getName(){
    try {
      const response = await fetch("http://localhost:5000/dashboard",{
        method: "GET",
        headers: { token : localStorage.token }
      });

      const parseRes = await response.json();

      setName(parseRes.username);
      setUser(parseRes.user_id);
    } catch (err) {
      console.error(err.message);
    }
  }


  const [logged, setLog] = useState(true);

  const logout = async e =>{
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out succesfully!");
      setLog(false);
    } catch (err) {
      console.error(err.message);
    }
  };


  const navigate = useNavigate();


  const [posts, setPosts] = useState([]);

  const getPosts = async() => {
    try {
      
      const response = await fetch("http://localhost:5000/forum/readall")
      const jsonData = await response.json();

      setPosts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }



  useEffect(() =>{
    getName();
    getPosts();
  },[logged]);

  return(
    <>
    <Navbar setAuth={setAuth} name={name} logout = {e => logout(e)}/>
    <main>
      <div className='game-container'>
        <div className='forum-page-title'>Forum posts</div>
        {posts.map(post =>(
          <div className='forum-post' onClick={()=>navigate("/forum" + post.post_url)}>
            <div className='forum-title'>
              Title: {post.post_title}
            </div>
            <div className='forum-game'>Topic: {post.game_topic}</div>
            <div className='forum-right'>
              <div className='forum-time'>Time: {post.time}</div>
              <div className='forum-date'>Date: {post.date}</div>
              <div className=''>
                Posted by: {post.username}
              </div>
            </div>
          </div>
        ))}
        <div className='create-post' onClick={()=>navigate("/createpost")}>Create post</div>
      </div>
    </main>
    <Footer />
    </>
  )
}


export default Forum;