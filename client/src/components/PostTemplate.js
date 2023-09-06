import React, { Component, useState, useEffect} from 'react';
import "./PostTemplate.css"
import Discover from './Discover/Discover';
import Navbar from './Navbar/Navbar';
import Games from './Games/Games';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from "react-toastify";
import Footer from '../components/Footer';
import Joi from 'joi';
import {joiResolver} from "@hookform/resolvers/joi"
import { InputAdornment, TextField, IconButton, Box, FormControlLabel, Checkbox, Typography, Button, Link, Tooltip, FormHelperText } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom'


const validationSchema = Joi.object({
  message: Joi.string().required().messages({
    'string.empty':'Please enter a message',
  }),
});

const PageTemplate = ({setAuth, post_id, post_title, post_content, game_topic, post_url, date, time, username}) => {

  const [name, setName] = useState("");

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

  const [user_id, setUser] = useState("");

  const onSubmitForm = async (data) =>{
    try {

      const date = new Date();
      const month = date.getMonth();
      const day = date.getDate();
      const date_format = month + "/" + day;
      const time = date.getHours() + ":"+ date.getMinutes() + ":" + date.getSeconds();

      data["post_id"] = post_id;
      data["message_date"] = date_format;
      data["message_time"] = time;
      data["user_id"] = user_id;

      const body = data

      const response = await fetch("http://localhost:5000/forum/addmsg",
    
      {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      });
      toast.success("Posted succesfully!");
      setPosted("yes");
    } catch (err) {
      console.error(err.message);
    }
  }

  const [server_errors, setServerErrors] = useState("")

  const toggleErrors = (error) =>{
    setServerErrors(error)
  }

  const navigate = useNavigate()
  

  const {control, handleSubmit, formState:{errors}} = useForm({
    resolver: joiResolver(validationSchema),
  });

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


  const [messages, setMessages] = useState([]);

  const getMessages = async id => {
    try {
      
      const response = await fetch(`http://localhost:5000/forum/readmsg/${id}`)
      const jsonData = await response.json();

      setMessages(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const [posted, setPosted] = useState("");
  

  useEffect(() =>{
    getName();
  },[logged]);

  useEffect(() =>{
    getMessages(post_id);
  },[posted]);



  const onSubmit = data => {
    onSubmitForm(data);
  }


  return(
    <>
    <Navbar setAuth={setAuth} name={name} logout = {e => logout(e)}/>
    <main className='post-page'>
      <div className='game-container'>
        <div className='post-main-title'>
          {post_title}
        </div>
        <div className='post-main-topic'>
          {game_topic}
        </div>
        <div className='main-post-container'>
          <div className='post-content'>
            <div className='post-author'>{username}</div>
            <div className='post-time'>{time}</div>
            <div className='post-date'>{date}</div>
          </div>
          <div className='post-message'>{post_content}</div>
        </div>
        {messages.map(message =>(
          <div className='post-container'>
          <div className='post-content'>
            <div className='post-author'>{message.username}</div>
            <div className='post-time'>{message.message_time}</div>
            <div className='post-date'>{message.message_date}</div>
          </div>
          <div className='post-message'>{message.message}</div>
        </div>
        ))}
        <form className='comment-container' onSubmit={handleSubmit(onSubmit)}>
          <Controller
              control={control}
              name="message"
              defaultValue=""
              render={({field}) => (
                <TextField 
                  {...field} 
                  variant="outlined" 
                  autoComplete='off' 
                  label="Post comment" 
                  fullWidth={true} 
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  className='reg-textfield'
                  >
                </TextField>
              )}
            />
            <Box>
              <Button type="submit" fullWidth={true} variant="contained" className='reg-button'>
                POST
              </Button>
            </Box>
        </form>
      </div>
    </main>
    <Footer/>
    </>
  )
}

export default PageTemplate;