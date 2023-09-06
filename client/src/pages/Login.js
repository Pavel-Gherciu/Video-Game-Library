import './Login.css';
import React, { Component, Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import logo from '../images/logodark.png'
import { InputAdornment, TextField, IconButton, Box, FormControlLabel, Checkbox, Typography, Button, Link } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom' ;
import CheckIcon from '@mui/icons-material/Check';
import Joi from 'joi';
import {joiResolver} from "@hookform/resolvers/joi";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Joi.object({
  email: Joi.string().required().email({  tlds: { allow: false } }).messages({
    'string.empty':'Please enter an email',
    'string.email':'Email must be valid'
  }),
  password: Joi.string().required().messages({
    'string.empty':'Please enter a password',
  })
});

const Login = ({setAuth}) => {


  const onSubmitForm = async (data) =>{
    try {

      const body = data

      const response = await fetch("http://localhost:5000/auth/login",
      
      {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

      if(parseRes.token){
        localStorage.setItem("token", parseRes.token);
  
        setAuth(true);
        toast.success("Logged in succesfully!");
      }else{
        setAuth(false);
        //toast.error(parseRes);
        toggleErrors(parseRes);
      }
      
    
    } catch (err) {
      console.error(err.message);
    }
  }
  
  const [shouldShowPassword, setShouldShowPassword] = useState(false)
  

  const toggleVisibility = () =>{
    setShouldShowPassword(prevValue => !prevValue)
  }

  const [server_errors, setServerErrors] = useState("")
  

  const toggleErrors = (error) =>{
    setServerErrors(error)
  }

  const navigate = useNavigate();

  const {control, handleSubmit, formState:{errors}} = useForm({
    resolver: joiResolver(validationSchema),
  });

  const onSubmit = data => {
    onSubmitForm(data);
  }


  return(
    <div className="login-bg">
      <div className='login-container'>
        <img src={logo} alt="logo" className='login-logo'/>
        <div className='signin'>Sign in with an existing account</div>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined" 
                autoComplete="off" 
                label="Email Address" 
                fullWidth={true} 
                className='login-textfield'>
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({field}) => (
              <TextField 
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleVisibility}>
                        {shouldShowPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  )}
                } 
                {...field}
                type={shouldShowPassword ? "text" : "password"} 
                variant="outlined" 
                label="Password" 
                fullWidth={true} 
                autoComplete='off' 
                className='login-textfield'>
              </TextField>
            )}
          />
          
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel label="Remember me" className='checkbox' control={<Checkbox 
              checkedIcon={
                <CheckIcon style={{fontSize: 24, backgroundColor: '#0074E4', color:"white", borderRadius: '4px', border: '1px solid black'}}/>
              }
            />}/>
            <Link className='link'>
            <Typography variant='body1'>Forgot your password?</Typography>
            </Link>
          </Box>
          <div className='server-errors'>{server_errors}</div>
          <Box className='button-wrapper'>
            <Button type="submit" fullWidth={true} variant="contained" className='login-button'>
              LOG IN NOW
            </Button>
          </Box>
          <Box className='login-wrapper'>
            <Typography variant='body1'>
              Don't have an account? &nbsp;
            </Typography>
            <Link className='link'>
              <Typography variant="body1" onClick = {() => navigate("/register")}>Sign Up</Typography>
            </Link>
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

export default Login;