import React from 'react'
import Footer from '../../../components/Footer/Footer'
import SellerLogin from '../../../components/sellerComponents/SellerLogin/SellerLogin.jsx'
import { Link } from 'react-router-dom'
import './SellerLoginPage.css'

const SellerLoginPage = () => {
  return (
    <div>
      <Link
        style={{
          textDecoration: 'none',
          color: 'black',
          display: 'inline-block'
        }}
        to='/'
      >
        <div className='brand-name'>
          <span className='shem'>Shem's</span>
          <span className='books'>Books</span>
        </div>
      </Link>
      <div className='seller-login-bg-container'>
        <SellerLogin />
      </div>
      <Footer />
    </div>
  )
}

export default SellerLoginPage
