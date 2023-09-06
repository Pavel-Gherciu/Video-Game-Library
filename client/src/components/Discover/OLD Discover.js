import React, { Component } from 'react'
import "./Discover.css"
import front_img from '../../images/eldenring.jpg'
import front_img_mob from '../../images/yakuza-mobile.jpg'
import {FrontGames} from "./FrontGames"

/*
if (window.screen.width <= 960) {
  document.querySelector('.disc-front-img').src="yakuza-mobile.jpg";
}

*/

class Discover extends Component{
  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render(){
    return(
      <header>
        <div className='header-container'>
          <div className='disc-front-container'>
            <img src={front_img} alt="discover front image" className='disc-front-img'/>
          </div>
          <div className='tab-container'>
            <ul className='tabs'>
              {FrontGames.map((item, index)=>{
                return (
                  <li key={index}>
                    <div className="discover-tabs">
                      <img src={item.img} className="discover-img"/>
                      <div>
                        {item.title}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export default Discover