import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam accusamus perferendis doloremque consectetur veritatis voluptatibus dolore voluptas fugit quam aspernatur vero cumque iste error commodi possimus odit illum, maxime iure voluptates temporibus repellendus in.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linked_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 7759887117</li>
                    <li>contact@gautam.com</li>
                </ul>

            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 @ Gautam | All Rights reserved
        </p>
      
    </div>
  )
}

export default Footer
