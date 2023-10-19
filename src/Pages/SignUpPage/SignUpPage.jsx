import React from 'react'
import SignUp from '../../components/SignUp/SignUp.jsx'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
import './SignUpPage.css'

const SignUpPage = () => {
  return (
    <div>
      <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>
        <div className='brand-name'>
          <span className='shem'>Shem's</span>
          <span className='books'>Books</span>
        </div>
      </Link>
      <div className='sign-up-bg-container'>
        <SignUp />
      </div>
      <Footer />
    </div>
  )
}

export default SignUpPage
