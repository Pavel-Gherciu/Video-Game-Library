import Discover from '../components/Discover/Discover';
import Navbar from '../components/Navbar/Navbar';
import Games from '../components/Games/Games';
import React, { Component, Fragment, useEffect, useState, preventDefault } from "react";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import "./About.css";
import logo from '../images/utm.png';

const About = ({setAuth}) => {

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

  useEffect(() =>{
    getName();
  },[logged]);

  const navigate = useNavigate()
  return(
    <>
    <Navbar setAuth={setAuth} name={name} logout = {e => logout(e)}/>
    <main className='post-page'>
      <div className='game-container'>
        <div className='about-title'>About this project</div>
        <img src={logo} alt="" className='about-logo' />
        <div className='about-text'>
          <p>This project has been created as part of Pavel Gherciu's university practice.</p>
          <p>The main goal has been to learn the React library.</p>
          <p>It can be ascertained that the majority of goals set have been reached, and specifically the PERN stack has been used for most of the work.</p>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}

export default About;