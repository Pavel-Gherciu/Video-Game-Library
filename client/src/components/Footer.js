import React, { Component, Fragment, useEffect, useState } from 'react'
import "./Footer.css"
import { useNavigate } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {

  const navigate = useNavigate()


  return(
    <footer>
      <div className='footer-container'>
        <div className='footer-section1'>
          <a className='linkedin-icon' href="https://www.linkedin.com/in/pavel-gherciu-5667801ba/">
            <LinkedInIcon fontSize="big"></LinkedInIcon>
          </a>
          <div className='footer-resources'>
            <div className='resources-title'>Resources</div>
            <ul className='resources-list'>
              <li>
                <a className='resources-item' href="https://www.postgresql.org/">PostgreSQL</a>
              </li>
              <li>
                <a className='resources-item' href="https://expressjs.com/">Express</a>
              </li>
              <li>
                <a className='resources-item' href="https://reactjs.org/">React</a>
              </li>
              <li>
                <a className='resources-item' href="https://nodejs.org/en/">Node.js</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='footer-section2'>
          © 2022, Pavel Gherciu, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}


export default Footer