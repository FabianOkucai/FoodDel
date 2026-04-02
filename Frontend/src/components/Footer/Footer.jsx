import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia quo aut sint soluta voluptatibus earum accusantium minus libero molestias. Incidunt harum architecto fugiat numquam libero, distinctio earum explicabo sequi nostrum?</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.social_twitter} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>

        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <>
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy</li>

          </>

        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+254741901637</li>
            <li>contact@FoodDel.com</li>
          </ul>

        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer