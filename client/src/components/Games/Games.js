import React, { Component, Fragment, useEffect, useState } from 'react'
import "./Games.css"
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Games = ({setAuth, name}) => {

  const navigate = useNavigate()

  const [actGames, setActGames] = useState([]);

  const [Games, setGames] = useState([]);

  const getActGames = async () => {
    try {
      
      const response = await fetch("http://localhost:5000/games/readact")
      const jsonData = await response.json();

      setActGames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }


  const [advGames, setAdvGames] = useState([]);

  const getAdvGames = async () => {
    try {
      
      const response = await fetch("http://localhost:5000/games/readadv")
      const jsonData = await response.json();

      setAdvGames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }


  const [rpGames, setRPGames] = useState([]);

  const getRPGames = async () => {
    try {
      
      const response = await fetch("http://localhost:5000/games/readrpg")
      const jsonData = await response.json();

      setRPGames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const [simGames, setSimGames] = useState([]);

  const getSimGames = async () => {
    try {
      
      const response = await fetch("http://localhost:5000/games/readsim")
      const jsonData = await response.json();

      setSimGames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const [stratGames, setStratGames] = useState([]);

  const getStratGames = async () => {
    try {
      
      const response = await fetch("http://localhost:5000/games/readstrat")
      const jsonData = await response.json();

      setStratGames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }


  const [sportGames, setSportGames] = useState([]);

  const getSportGames = async () => {
    try {
      
      const response = await fetch("http://localhost:5000/games/readsport")
      const jsonData = await response.json();

      setSportGames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(()=>{
    getActGames();
    getAdvGames();
    getRPGames();
    getSimGames();
    getStratGames();
    getSportGames();
  },[Games])


  const deleteGame = async id => {
    try {
      const deleteGame = await fetch(`http://localhost:5000/games/delete/${id}`,{
        method: "DELETE"
      });
      
      setGames(id);
      toast.success("Deleted game succesfully!");  
      
    } catch (err) {
      console.log(err.message);
    }
  }


  

  function show_buttons(id){
    if (name == "Admin") {
      document.getElementById("delete"+id).style.display = 'block';
      document.getElementById("edit"+id).style.display = 'block';
    }
  }
  function hide_buttons(id){
    if (name == "Admin") {
      document.getElementById("delete"+id).style.display = 'none';
      document.getElementById("edit"+id).style.display = 'none';
    }
  }


  return (
    <div className='game-showcase'>
      <div className='game-showcase-container'>
        <div className='showcase-title'>Action Games</div>
        <div className='showcase-list-container'>
          {actGames.map(actgame =>(
            <>
              <ul className='showcase-list'>
                <li className='showcase-item' onMouseEnter={() => show_buttons(actgame.game_id)} onMouseLeave={() => hide_buttons(actgame.game_id)}>
                  <div className='showcase-img-container'>
                    <img src={actgame.game_image_small} alt="game image"  className='showcase-img' onClick={() => navigate(actgame.game_url)}/>
                    <div className='showcase-delete' style={{display:'none'}} id={"delete"+actgame.game_id} onClick={()=>deleteGame(actgame.game_id)}>DELETE</div>
                    <div className='showcase-edit' style={{display:'none'}} id={"edit"+actgame.game_id} onClick={() => navigate("edititem" + actgame.game_url)}>EDIT</div>
                  </div>
                  <div className='showcase-name' onClick={() => navigate(actgame.game_url)}>{actgame.game_title}</div>
                </li>
              </ul>
            </>
          ))}
        </div>
        <div className='showcase-title'>Adventure & Casual</div>
        <div className='showcase-list-container'>
          {advGames.map(advgame =>(
            <>
            <ul className='showcase-list'>
              <li className='showcase-item' onMouseEnter={() => show_buttons(advgame.game_id)} onMouseLeave={() => hide_buttons(advgame.game_id)}>
                <div className='showcase-img-container'>
                  <img src={advgame.game_image_small} alt="game image"  className='showcase-img'  onClick={() => navigate(advgame.game_url)}/>
                  <div className='showcase-delete' style={{display:'none'}} id={"delete"+advgame.game_id} onClick={()=>deleteGame(advgame.game_id)}>DELETE</div>
                  <div className='showcase-edit' style={{display:'none'}} id={"edit"+advgame.game_id} onClick={() => navigate("edititem" + advgame.game_url)}>EDIT</div>
                </div>
                <div className='showcase-name'  onClick={() => navigate(advgame.game_url)}>{advgame.game_title}</div>
              </li>
            </ul>
            </>
          ))}
        </div>
        <div className='showcase-title'>Role-Playing Games</div>
        <div className='showcase-list-container'>
          {rpGames.map(rpgame =>(
            <>
            <ul className='showcase-list'>
              <li className='showcase-item' onMouseEnter={() => show_buttons(rpgame.game_id)} onMouseLeave={() => hide_buttons(rpgame.game_id)}>
                <div className='showcase-img-container'>
                  <img src={rpgame.game_image_small} alt="game image"  className='showcase-img' onClick={() => navigate(rpgame.game_url)}/>
                  <div className='showcase-delete' style={{display:'none'}} id={"delete"+rpgame.game_id} onClick={()=>deleteGame(rpgame.game_id)}>DELETE</div>
                  <div className='showcase-edit' style={{display:'none'}} id={"edit"+rpgame.game_id} onClick={() => navigate("edititem" + rpgame.game_url)}>EDIT</div>
                </div>
                <div className='showcase-name' onClick={() => navigate(rpgame.game_url)}>{rpgame.game_title}</div>
              </li>
            </ul>
            </>
          ))}
        </div>
        <div className='showcase-title'>Simulation Games</div>
        <div className='showcase-list-container'>
          {simGames.map(simgame =>(
            <>
            <ul className='showcase-list'>
              <li className='showcase-item' onMouseEnter={() => show_buttons(simgame.game_id)} onMouseLeave={() => hide_buttons(simgame.game_id)}>
                <div className='showcase-img-container'>
                  <img src={simgame.game_image_small} alt="game image"  className='showcase-img' onClick={() => navigate(simgame.game_url)}/>
                  <div className='showcase-delete' style={{display:'none'}} id={"delete"+simgame.game_id} onClick={()=>deleteGame(simgame.game_id)}>DELETE</div>
                  <div className='showcase-edit' style={{display:'none'}} id={"edit"+simgame.game_id} onClick={() => navigate("edititem" + simgame.game_url)}>EDIT</div>
                </div>
                <div className='showcase-name' onClick={() => navigate(simgame.game_url)}>{simgame.game_title}</div>
              </li>
            </ul>
            </>
          ))}
        </div>
        <div className='showcase-title'>Strategy Games</div>
        <div className='showcase-list-container'>
          {stratGames.map(stratgame =>(
            <>
            <ul className='showcase-list'>
              <li className='showcase-item' onMouseEnter={() => show_buttons(stratgame.game_id)} onMouseLeave={() => hide_buttons(stratgame.game_id)}>
                <div className='showcase-img-container'>
                  <img src={stratgame.game_image_small} alt="game image"  className='showcase-img' onClick={() => navigate(stratgame.game_url)}/>
                  <div className='showcase-delete' style={{display:'none'}} id={"delete"+stratgame.game_id} onClick={()=>deleteGame(stratgame.game_id)}>DELETE</div>
                  <div className='showcase-edit' style={{display:'none'}} id={"edit"+stratgame.game_id} onClick={() => navigate("edititem" + stratgame.game_url)}>EDIT</div>
                </div>
                <div className='showcase-name' onClick={() => navigate(stratgame.game_url)}>{stratgame.game_title}</div>
              </li>
            </ul>
            </>
          ))}
        </div>
        <div className='showcase-title'>Sports & Racing Games</div>
        <div className='showcase-list-container'>
          {sportGames.map(sportgame =>(
            <>
            <ul className='showcase-list'>
              <li className='showcase-item' onMouseEnter={() => show_buttons(sportgame.game_id)} onMouseLeave={() => hide_buttons(sportgame.game_id)}>
                <div className='showcase-img-container'>
                  <img src={sportgame.game_image_small} alt="game image"  className='showcase-img' onClick={() => navigate(sportgame.game_url)}/>
                  <div className='showcase-delete' style={{display:'none'}} id={"delete"+sportgame.game_id} onClick={()=>deleteGame(sportgame.game_id)}>DELETE</div>
                  <div className='showcase-edit' style={{display:'none'}} id={"edit"+sportgame.game_id} onClick={() => navigate("edititem" + sportgame.game_url)}>EDIT</div>
                </div>
                <div className='showcase-name' onClick={() => navigate(sportgame.game_url)}>{sportgame.game_title}</div>
              </li>
            </ul>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}



export default Games