import React from 'react'
import Login from '../../components/Login/Login.jsx'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
import './LoginPage.css'

const LoginPage = () => {
  return (
    <div>
      <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>
        <div className='brand-name'>
          <span className='shem'>Shem's</span>
          <span className='books'>Books</span>
        </div>
      </Link>
      <div className='login-bg-container'>
        <Login />
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage
