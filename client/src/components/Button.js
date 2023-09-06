import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'
import { useNavigate } from 'react-router-dom' 

const STYLES = [
  'btn--primary',
  'btn--outline'
]

const SIZES = [
  'btn-medium',
  'btn--large'
]


export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) =>{
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

  const navigate = useNavigate()

  return (
    <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick = {() => navigate("/login")} type={type}>
      {children}
    </button>
  )
}