import React, { Component, useState, useEffect} from 'react';
import "./PageTemplate.css"
import Discover from './Discover/Discover';
import Navbar from './Navbar/Navbar';
import Games from './Games/Games';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from "react-toastify";
import Footer from '../components/Footer';

const PageTemplate = ({setAuth,title,game_image_big, game_logo, release_date, description, about, genre_title, developer, publisher}) => {

  const [name, setName] = useState("");

  async function getName(){
    try {
      const response = await fetch("http://localhost:5000/dashboard",{
        method: "GET",
        headers: { token : localStorage.token }
      });

      const parseRes = await response.json();

      setName(parseRes.username);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = async e =>{
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out succesfully!");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() =>{
    getName();
  });

  return(
    <>
    <Navbar setAuth={setAuth} name={name} logout = {e => logout(e)}/>
    <main>
      <div className='game-container'>
        <div className='game-title'>{title}</div>
        <div className='game-main-container'>
          <div className='game-front-container'>
            <img src={game_image_big} alt="game front image" className='game-front-img'/>
          </div>
          <div className='game-desc-container'>
            <div className='desc-logo-container'>
              <img src={game_logo} alt="game logo" className='game-desc-logo' />
            </div>
            <div className='desc-info-container'>&emsp;{description}</div>
            <div className='desc-dev-container'>
              <div className='desc-item'>
                <div className='desc-item-title'>Genre</div>
                <div className='desc-item-value'>{genre_title}</div>
              </div>
              <div className='desc-item'>
                <div className='desc-item-title'>Developer</div>
                <div className='desc-item-value'>{developer}</div>
              </div>
              <div className='desc-item'>
                <div className='desc-item-title'>Publisher</div>
                <div className='desc-item-value'>{publisher}</div>
              </div>
              <div className='desc-item'>
                <div className='desc-item-title'>Release date</div>
                <div className='desc-item-value'>{release_date}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='about-game-container'>
          <div className='about-game-title'>ABOUT THIS GAME</div>
          <div className='about-game-content'>{about}
          </div>
        </div>
        <div className='forum-game-container'>
          <div className='about-game-title'>FORUM POSTS</div>
          <div className='forum-game-content'>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
    </>
  )
}

export default PageTemplate;