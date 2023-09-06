import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './UserBtn.css'
import { useNavigate } from 'react-router-dom' 
import PersonIcon from '@mui/icons-material/Person';


export const UserBtn = ({name,logout}) =>{
  
  const navigate = useNavigate()

  const [style, setStyle] = useState({display: 'none'});

  return(
    <div className='user-wrapper' onMouseEnter={e => {setStyle({display: 'block'});}} onMouseLeave={e => {setStyle({display: 'none'})}}>
      <PersonIcon className='user-icon'/>
      <div className=''>{name}</div>
      <ul className='user-list' style={style}>
        <li className='user-item' onClick = {() => navigate("/")}>
          account
        </li>
        <li className='user-item' onClick = {() => navigate("/createitem")}>
          ADD GAME
        </li>
        <li className='user-item' onClick={logout}>
          sign out
        </li>
      </ul>
    </div>
  )
}

