import React from 'react'
import Footer from '../../../components/Footer/Footer'
import SellerSignUp from '../../../components/sellerComponents/SellerSignUp/SellerSignUp.jsx'
import { Link } from 'react-router-dom'
import './SellerSignUpPage.css'

const SellerSignUpPage = () => {
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
      <div className='seller-sign-up-bg-container'>
        <SellerSignUp />
      </div>
      <Footer />
    </div>
  )
}

export default SellerSignUpPage
