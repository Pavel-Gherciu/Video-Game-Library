import './App.css';
import { Fragment, useState, useEffect} from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from "react-toastify";
import {PageItems} from "./components/PageItems";
import PageTemplate from "./components/PageTemplate";
import PostTemplate from "./components/PostTemplate";
import CreateItem from './pages/CreateItem';
import EditItem from './pages/EditItem';
import Forum from './pages/Forum';
import CreatePost from './pages/CreatePost';

function App() {

  async function isAuth(){
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {token : localStorage.token},
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
    }
  };

  useEffect(()=>{
    isAuth();
  },[]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) =>{
    setIsAuthenticated(boolean);
  };


  const [games, setGames] = useState([]);

  const getGames = async() => {
    try {
      
      const response = await fetch("http://localhost:5000/games/readall")
      const jsonData = await response.json();

      setGames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

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

  useEffect(()=>{
    getGames();
    getPosts();
  },[])

  return (
    <div classname="container">
      <Routes>
        <Route path="/" element={<Home setAuth={setAuth}/>}/>
        <Route path="/about" element={<About setAuth={setAuth}/>}/>
        <Route path="/register" element={!isAuthenticated? <Register setAuth={setAuth}/> : <Navigate to="/login"/>}/>
        <Route path="/login" element={!isAuthenticated? <Login setAuth={setAuth}/> : <Navigate to="/"/>}/>
        <Route path="/createitem" element={<CreateItem setAuth={setAuth}/>}/>
        <Route path="/forum" element={<Forum setAuth={setAuth}/>}/>
        {games.map(game =>(
          <Route key={game.game_id} path={game.game_url} element={
          <PageTemplate 
            setAuth={setAuth} 
            title={game.game_title} 
            game_image_big = {game.game_image_big}
            game_logo = {game.game_logo}
            release_date = {game.release_date}
            description = {game.description}
            about = {game.about}
            genre_title = {game.genre_title}
            developer = {game.developer}
            publisher = {game.publisher}
            />
        }/>
        ))}
         {games.map(game =>(
          <Route key={game.game_id} path={"/edititem"+game.game_url} element={
          <EditItem
            game_id = {game.game_id}
            game_title={game.game_title} 
            game_image_big = {game.game_image_big}
            game_image_small = {game.game_image_small}
            game_logo = {game.game_logo}
            release_date = {game.release_date}
            description = {game.description}
            about = {game.about}
            game_url = {game.game_url}
            genre_id = {game.genre_id}
            developer = {game.developer}
            publisher = {game.publisher}
            />
        }/>
        ))}
        <Route path="/createpost" element={<CreatePost setAuth={setAuth}/>}/>
        {posts.map(post =>(
          <Route key={post.post_id} path={"/forum"+ post.post_url} element={
          <PostTemplate 
            setAuth={setAuth} 
            post_id = {post.post_id}
            post_title={post.post_title} 
            post_content={post.post_content}
            game_topic={post.game_topic}
            post_url={post.post_url}
            date={post.date}
            time={post.time}
            username={post.username}
            />
        }/>
        ))}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
