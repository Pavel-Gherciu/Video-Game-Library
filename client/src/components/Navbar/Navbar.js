import React, { Component, useState, useEffect} from 'react';
import {MenuItems} from "./MenuItems";
import "./Navbar.css";
import logo from '../../images/logodark.png';
import { Button } from '../Button';
import { UserBtn } from '../UserBtn';
import { Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = ({setAuth, name, logout}) => {

  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(boolean => !boolean);
  }

  const navigate = useNavigate()

  return(
    <nav className='NavbarItems'>
      <h1 className='navbar-logo' onClick={() => navigate("/")}><img src={logo} alt="Icon" className='logo-img'/></h1>
      <div className='menu-icon' onClick={handleClick}>
        <i className={state ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={state ? 'nav-menu active' : 'nav-menu'}>
        {MenuItems.map((item, index)=>{
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
              {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className='right-items'>
        {name? <UserBtn name={name} logout={logout}/> : <Button>Sign In</Button>}
      </div>
    </nav>
  )
}

export default Navbar