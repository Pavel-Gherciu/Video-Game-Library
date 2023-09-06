import React, { Component, Fragment, useEffect, useState } from 'react'
import "./Discover.css"
import front_img from '../../images/yakuza.jpg'
import game_logo from '../../images/yakuza-logo.png'
import front_img_mob from '../../images/yakuza-mobile.jpg'
import {FrontGames} from "./FrontGames"
import { useNavigate } from 'react-router-dom';

/*
if (window.screen.width <= 960) {
  document.querySelector('.disc-front-img').src="yakuza-mobile.jpg";
}

*/


const Discover = () => {

  const navigate = useNavigate()

  const [frontgames, setFrontGames] = useState([]);

  const getFrontGames = async() => {
    try {
      
      const response = await fetch("http://localhost:5000/frontgames")
      const jsonData = await response.json();

      setFrontGames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  //document.getElementById("1").style.backgroundColor="#363636";

  useEffect(()=>{
    getFrontGames();
    setGamelink("/yakuza0");
  },[])

  const goSomewhere = () => {
    navigate("kingdomcome");
  }

  const [gamelink, setGamelink] = useState();

  function change_img(source){
    var check = document.querySelectorAll('.discover-tabs');

    check.forEach(tab =>{
      if(tab.id==source.game_id){
        tab.style.backgroundColor="#363636";
      }else{
        tab.removeAttribute("style");
      }
    })

    document.querySelector(".disc-front-img").src = source.image_main;
    document.querySelector(".game-logo").src = source.logo;
    document.querySelector(".game-info").textContent = source.description;
    setGamelink(source.game_url);
  }


  return(
    <header>
      <div className='header-container'>
        <div className='disc-front-container' onClick={() => navigate(gamelink)}>
          <img src={front_img} alt="discover front image" className='disc-front-img'/>
          <div className='disc-front-img-click'>
            <img src={game_logo} alt="game logo" className='game-logo'/>
            <div className='game-info'>Discover the origins of the Yakuza game series on PC and its legendary cast as Yakuza 0 takes you back to the neon lights of Japan in 1988.</div>
            <a href="#" className='disc-button'>DISCOVER NOW</a>
          </div>
        </div>
        <div className='tab-container'>
          <ul className='tabs'>
            {frontgames.map(frontgame =>(
              <li key={frontgame.game_id}>
                <div className="discover-tabs" id={frontgame.game_id} onClick={()=>change_img(frontgame)}>
                  <img src={frontgame.image_mobile} className="discover-img" />
                  <div>
                    {frontgame.name}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}


export default Discover