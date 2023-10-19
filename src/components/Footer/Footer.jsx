import React from 'react'
import { BiLogoFacebookSquare } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'
import { GrInstagram } from 'react-icons/gr'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className='footer-bg-container'>
      <div className='footer-container'>
        <div className='brand-name-container'>
          <span className='footer-brand-shem'>Shem's</span>
          <span className='footer-brand-books'>Books</span>
        </div>
        <div className='footer-body-container'>
          <div className='sitemap-container'>
            <h6>Sitemap</h6>
            <h6>Home</h6>
            <h6>Profile</h6>
            <h6>Seller Page</h6>
          </div>
          <div className='socials-container'>
            <h6>Socials</h6>
            <h6>
              <BiLogoFacebookSquare className='icon' />
              Facebook
            </h6>
            <h6>
              <BsTwitter className='icon' />
              Twitter
            </h6>
            <h6>
              <GrInstagram className='icon' />
              Instagram
            </h6>
          </div>
          <div className='services-container'>
            <h6>Services</h6>
            <h6>Home delivery</h6>
            <h6>Pay Later</h6>
            <h6>Seller Priviledge</h6>
          </div>
        </div>
        <div className='copyright-container'>
          <h6>Copyright {currentYear} </h6>
        </div>
      </div>
    </div>
  )
}

export default Footer
