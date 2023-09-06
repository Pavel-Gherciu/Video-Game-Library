import './CreateItem.css';
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
  game_title: Joi.string().required().messages({
    'string.empty':'Please enter a game title',
  }),
  game_image_big: Joi.string().required().messages({
    'string.empty':'Please enter a game desktop image url',
  }),
  game_image_small: Joi.string().required().messages({
    'string.empty':'Please enter a game mobile image url',
  }),
  game_logo: Joi.string().required().messages({
    'string.empty':'Please enter a game logo image url',
  }),
  release_date: Joi.string().required().messages({
    'string.empty':'Please enter the release date of the game',
  }),
  description: Joi.string().required().messages({
    'string.empty':'Please enter a short description of the game',
  }),
  about: Joi.string().required().messages({
    'string.empty':'Please enter some information about the game',
  }),
  game_url: Joi.string().required().messages({
    'string.empty':'Please enter the game url',
  }),
  genre_id: Joi.string().required().messages({
    'string.empty':'Please enter the genre id of the game',
  }),
  developer: Joi.string().required().messages({
    'string.empty':'Please enter the developer of the game',
  }),
  publisher: Joi.string().required().messages({
    'string.empty':'Please enter the publisher of the game',
  }),
});


const CreateItem = ({setAuth}) => {

  const navigate = useNavigate()


  const goHome = () => {
    navigate("/");
  }

  const onSubmitForm = async (data) =>{
    try {

      const body = data

      const response = await fetch("http://localhost:5000/games/add",
      
      {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      });
      goHome();
      toast.success("Added game succesfully!");    
      
    } catch (err) {
      console.error(err.message);
    }
  }



  const {control, handleSubmit, formState:{errors}} = useForm({
    resolver: joiResolver(validationSchema),
  });
  
  
  const onSubmit = data => {
    onSubmitForm(data);
  }

  const onKeyPressbig = (e) => {
    if (e.key === "Enter") {
      document.querySelector(".preview-image-big").src = e.target.value;
      e.preventDefault();
    }
  }

  const onKeyPresssmall = (e) => {
    if (e.key === "Enter") {
      document.querySelector(".preview-image-small").src = e.target.value;
      e.preventDefault();
    }
  }

  const onKeyPresslogo = (e) => {
    if (e.key === "Enter") {
      document.querySelector(".preview-image-logo").src = e.target.value;
      e.preventDefault();
    }
  }

  

  return(
    <div className='dash-bg'>
      <div className='reg-container'>
        <img src={logo} alt="logo" className='reg-logo'/>
        <div className='signup'>Add new game</div>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="game_title"
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
                error={!!errors.game_title}
                helperText={errors.game_title?.message}
               ></TextField>
          )}
          />
          <Controller
            control={control}
            name="game_image_big"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field} 
                autoComplete='off' 
                className='reg-textfield' 
                fullWidth={true} 
                required={true} 
                variant="outlined" 
                label="Dekstop image (URL)"
                error={!!errors.game_title}
                helperText={errors.game_image_big?.message}
                onKeyPress={onKeyPressbig}
               ></TextField>
          )}
          />
          <div className='preview-container'>
            Preview (Press Enter in the field above)
            <img src="" className='preview-image-big' />
          </div>
          <Controller
            control={control}
            name="game_image_small"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field} 
                autoComplete='off' 
                className='reg-textfield' 
                fullWidth={true} 
                required={true} 
                variant="outlined" 
                label="Mobile image (URL)"
                error={!!errors.game_image_small}
                helperText={errors.game_image_small?.message}
                onKeyPress={onKeyPresssmall}
               ></TextField>
          )}
          />
          <div className='preview-container'>
            Preview (Press Enter in the field above)
            <img src="" className='preview-image-small' />
          </div>
          <Controller
            control={control}
            name="game_logo"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field} 
                autoComplete='off' 
                className='reg-textfield' 
                fullWidth={true} 
                required={true} 
                variant="outlined" 
                label="Logo image (URL)"
                error={!!errors.game_logo}
                helperText={errors.game_logo?.message}
                onKeyPress={onKeyPresslogo}
               ></TextField>
          )}
          />
          <div className='preview-container'>
            Preview (Press Enter in the field above)
            <img src="" className='preview-image-logo' />
          </div>
          <Controller
            control={control}
            name="release_date"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field}
                required={true} 
                variant="outlined" 
                autoComplete='off' 
                label="Release date (MM/DD/YY)" 
                fullWidth={true} 
                error={!!errors.release_date}
                helperText={errors.release_date?.message}
                className='reg-textfield'
                >
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="description"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field}
                required={true} 
                multiline
                maxRows={5}
                variant="outlined" 
                autoComplete='off' 
                label="Short description" 
                fullWidth={true} 
                fullHeight={true}
                error={!!errors.description}
                helperText={errors.description?.message}
                className='reg-textfield'
                >
              </TextField>
            )}
          />
          <div className='space-area'></div>
          <Controller
            control={control}
            name="about"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field}
                required={true} 
                multiline
                maxRows={5}
                variant="outlined" 
                autoComplete='off' 
                label="About game (more information)" 
                fullWidth={true} 
                fullHeight={true}
                error={!!errors.about}
                helperText={errors.about?.message}
                className='reg-textfield'
                >
              </TextField>
            )}
          />
          <div className='space-area'></div>
          <Controller
            control={control}
            name="game_url"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field}
                required={true} 
                variant="outlined" 
                autoComplete='off' 
                label="Game URL (begin with / )" 
                fullWidth={true} 
                error={!!errors.game_url}
                helperText={errors.game_url?.message}
                className='reg-textfield'
                >
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="genre_id"
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
                label="Genre ID (number)"
                error={!!errors.genre_id}
                helperText={errors.genre_id?.message}
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
                            lineHeight: '1.5625rem',
                            whiteSpace: 'pre-wrap'
                          },
                        },
                       }}
                        title="1) Action
                        2) Adventure & Casual
                        3) Role-Playing
                        4) Simulation
                        5) Strategy
                        6) Sports & Racing
                        ">
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
            name="developer"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field}
                required={true} 
                variant="outlined" 
                autoComplete='off' 
                label="Developer" 
                fullWidth={true} 
                error={!!errors.developer}
                helperText={errors.developer?.message}
                className='reg-textfield'
                >
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="publisher"
            defaultValue=""
            render={({field}) => (
              <TextField 
                {...field}
                required={true} 
                variant="outlined" 
                autoComplete='off' 
                label="Publisher" 
                fullWidth={true} 
                error={!!errors.publisher}
                helperText={errors.publisher?.message}
                className='reg-textfield'
                >
              </TextField>
            )}
          />
          <Box className='button-wrapper'>
            <Button type="submit" fullWidth={true} variant="contained" className='reg-button'>
              ADD GAME
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

export default CreateItem;