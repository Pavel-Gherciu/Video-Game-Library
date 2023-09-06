import Discover from '../components/Discover/Discover';
import Navbar from '../components/Navbar/Navbar';
import Games from '../components/Games/Games';
import React, { Component, Fragment, useEffect, useState, preventDefault } from "react";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = ({setAuth}) => {

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
    <Discover/>
    <Games setAuth={setAuth} name={name}/>
    <Footer />
    </>
  )
}

export default Home;