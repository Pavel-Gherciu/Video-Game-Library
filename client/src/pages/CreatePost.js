import logo from '../images/logodark.png';
import Joi from 'joi';
import {joiResolver} from "@hookform/resolvers/joi"
import React, { Component, Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputAdornment, TextField, IconButton, Box, FormControlLabel, Checkbox, Typography, Button, Link, Tooltip, FormHelperText } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom' 
import CheckIcon from '@mui/icons-material/Check';
import CheckboxWithLabel from "../components/CheckboxWithLabel"
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const validationSchema = Joi.object({
  game_topic: Joi.string().required().messages({
    'string.empty':'Please enter a game title',
  }),
  post_title: Joi.string().required().messages({
    'string.empty':'Please enter the post title',
  }),
  post_content: Joi.string().required().messages({
    'string.empty':'Please enter text for the post',
  }),
  post_url: Joi.string().required().messages({
    'string.empty':'Please enter an URL for the post',
  }),
});

const CreatePost = ({setAuth}) => {

  const onSubmitForm = async (data) =>{
    try {

      const date = new Date();
      const month = date.getMonth();
      const day = date.getDate();
      const date_format = month + "/" + day;
      const time = date.getHours() + ":"+ date.getMinutes() + ":" + date.getSeconds();

      data["date"] = date_format;
      data["time"] = time;
      data["user_id"] = user_id;

      const body = data
      console.log(body);

      const response = await fetch("http://localhost:5000/forum/add",
      
      {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      });
      goHome();
      toast.success("Posted succesfully!");    

    } catch (err) {
      console.error(err.message);
    }
  }

  const [server_errors, setServerErrors] = useState("");
  

  const toggleErrors = (error) =>{
    setServerErrors(error)
  }

  const navigate = useNavigate()

  const {control, handleSubmit, formState:{errors}} = useForm({
    resolver: joiResolver(validationSchema),
  });
  
  
  const onSubmit = data => {
    onSubmitForm(data);
  }


  const [user_id, setUser] = useState("");

  async function getName(){
    try {
      const response = await fetch("http://localhost:5000/dashboard",{
        method: "GET",
        headers: { token : localStorage.token}
      });

      const parseRes = await response.json();

      setUser(parseRes.user_id);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() =>{
    getName();
  },[]);

  const goHome = () => {
    navigate("/forum");
  }
  

  return(
    <div className='reg-bg'>
      <div className='reg-container'>
        <img src={logo} alt="logo" className='reg-logo'/>
        <div className='signup'>Create post</div>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="post_title"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field}
                required={true} 
                variant="outlined" 
                autoComplete='off' 
                label="Post Title" 
                fullWidth={true} 
                error={!!errors.post_title}
                helperText={errors.post_title?.message}
                className='reg-textfield'
                >
              </TextField>
            )}
          />
         <Controller
            control={control}
            name="post_content"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field}
                required={true} 
                multiline
                maxRows={5}
                variant="outlined" 
                autoComplete='off' 
                label="Post Content" 
                fullWidth={true} 
                fullHeight={true}
                error={!!errors.post_content}
                helperText={errors.post_content?.message}
                className='reg-textfield'
                >
              </TextField>
            )}
          />
          <div className='space-area'></div>
          <Controller
            control={control}
            name="game_topic"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field} 
                autoComplete='off' 
                className='reg-textfield' 
                fullWidth={true} 
                required={true} 
                variant="outlined" 
                label="Game Title"
                error={!!errors.game_topic}
                helperText={errors.game_topic?.message}
                ></TextField>
          )}
          />
          <Controller
            control={control}
            name="post_url"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field} 
                autoComplete='off' 
                className='reg-textfield' 
                fullWidth={true} 
                required={true} 
                variant="outlined" 
                label="Post URL (begin with /)"
                error={!!errors.post_url}
                helperText={errors.post_url?.message}
                ></TextField>
          )}
          />
          <div className='server-errors'>{server_errors}</div>
          <Box className='button-wrapper'>
            <Button type="submit" fullWidth={true} variant="contained" className='reg-button'>
              CREATE POST
            </Button>
          </Box>
          <Box className='back-button'>
            <Typography variant="body1">Back to &nbsp;</Typography>
            <Link className='link' onClick = {() => navigate("/")}>
              <Typography variant="body1">home</Typography>
            </Link>
          </Box>
        </form>
      </div>
    </div>
  )
}

export default CreatePost;