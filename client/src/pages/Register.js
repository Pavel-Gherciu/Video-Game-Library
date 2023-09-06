import './Register.css';
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
  firstname: Joi.string().required().messages({
    'string.empty':'Please enter your first name',
  }),
  lastname: Joi.string().required().messages({
    'string.empty':'Please enter your last name',
  }),
  username: Joi.string().required().messages({
    'string.empty':'Please enter an email',
  }),
  email: Joi.string().required().email({  tlds: { allow: false } }).messages({
    'string.empty':'Please enter an email',
    'string.email':'Email must be valid'
  }),
  password: Joi.string().required().min(7).messages({
    'string.empty':'Please enter a password',
    'string.min':'Password must have at least 7 characters'
  }),
  termsAccepted: Joi.boolean().invalid(false).messages({
    'any.invalid':'Please confirm this field',
  }),
});

const Register = ({setAuth}) => {

  const onSubmitForm = async (data) =>{
    try {

      const body = data

      const response = await fetch("http://localhost:5000/auth/register",
      
      {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

      if(parseRes.token){
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered succesfully!");
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

  const navigate = useNavigate()

  const {control, handleSubmit, formState:{errors}} = useForm({
    resolver: joiResolver(validationSchema),
  });
  
  
  const onSubmit = data => {
    onSubmitForm(data);
  }
  

  return(
    <div className='reg-bg'>
      <div className='reg-container'>
        <img src={logo} alt="logo" className='reg-logo'/>
        <div className='signup'>Sign up</div>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <Box className='namebox' display="flex">
            <Controller
              control={control}
              name="firstname"
              defaultValue=""
              render={({field}) => (
                <TextField 
                  {...field}
                  className='reg-textfield' 
                  required={true} 
                  label="First Name" 
                  error={!!errors.firstname}
                  helperText={errors.firstname?.message}
                  autoComplete="off" 
                  variant="outlined"
                  //value = {firstname}
                  //onChange={e => onChange(e)}
                  >
                </TextField>
              )}
            />
            <Controller
              control={control}
              name="lastname"
              defaultValue=""
              render={({field}) => (
                <TextField 
                  {...field}
                  autoComplete='off' 
                  className='reg-textfield' 
                  required={true} 
                  label="Last Name" 
                  error={!!errors.lastname}
                  helperText={errors.lastname?.message}
                  variant="outlined"
                  //value = {lastname}
                  //onChange={e => onChange(e)}
                  >
                </TextField>
              )}
            />
          </Box>
          <Controller
            control={control}
            name="username"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field} 
                //value = {username}
                //onChange={e => onChange(e)}
                autoComplete='off' 
                className='reg-textfield' 
                fullWidth={true} 
                required={true} 
                variant="outlined" 
                label="Display Name"
                error={!!errors.username}
                helperText={errors.username?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: '#3a3a3a',
                            color: 'rgba(255,255,255,0.72)',
                            borderRadius: '4px',
                            fontSize: '0.875rem',
                            padding: '10px 20px',
                            lineHeight: '1.5625rem'
                          },
                        },
                      }}
                      title="Your display name must be between 3 and 16 characters, and may contain letters, numbers, and non-consecutive dashes, periods, underscores and spaces.">
                        <IconButton>
                          <InfoOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }
              }></TextField>
          )}
          />
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field}
                required={true} 
                variant="outlined" 
                autoComplete='off' 
                label="Email Address" 
                fullWidth={true} 
                error={!!errors.email}
                helperText={errors.email?.message}
                className='reg-textfield'
                //value = {email}
                //onChange={e => onChange(e)}
                >
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({field}) => (
              <TextField InputProps={{
                endAdornment: (
                  <>
                  <InputAdornment position="end">
                    <IconButton onClick={toggleVisibility}>
                      {shouldShowPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment><InputAdornment position="end">
                      <Tooltip
                        componentsProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: '#3a3a3a',
                              color: 'rgba(255,255,255,0.72)',
                              borderRadius: '4px',
                              fontSize: '0.875rem',
                              padding: '10px 20px',
                              lineHeight: '1.5625rem'
                            },
                          },
                        }}
                        title="Passwords must have 7+ characters, at least 1 number, at least 1 letter, and no whitespace."
                        >
                        <IconButton>
                          <InfoOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  </>
                )}
              } 
              {...field} 
              type={shouldShowPassword ? "text" : "password"} 
              required={true} 
              variant="outlined" 
              label="Password" 
              fullWidth={true} 
              autoComplete='off' 
              error={!!errors.password}
              helperText={errors.password?.message}
              className='reg-textfield'
              //value = {password}
              //onChange={e => onChange(e)}
              >
              </TextField>
          )}
          />
          <Controller
            control={control}
            name="termsAccepted"
            defaultValue="false"
            render={({field:{ref, ...rest}}) => (
            <CheckboxWithLabel
              {...rest}
              error={!!errors.termsAccepted}
              helperText={errors.termsAccepted?.message}
              inputRef={ref}
              label={
                <Typography variant="body1">
                  I have read and agree to the terms of service.
                </Typography>
              }
            />
          )}
          />
          <div className='server-errors'>{server_errors}</div>
          <Box className='button-wrapper'>
            <Button type="submit" fullWidth={true} variant="contained" className='reg-button'>
              SIGN UP
            </Button>
          </Box>
          <Box className='login-wrapper'>
            <Typography variant='body1'>
              Have an account? &nbsp;
            </Typography>
            <Link className='link'>
              <Typography variant="body1" onClick = {() => navigate("/login")}>Sign In</Typography>
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

export default Register;