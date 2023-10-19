import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import UserProfile from '../../components/UserProfile/UserProfile.jsx'
import './UserProfilePage.css'
import GoBack from '../../components/GoBack/GoBack.jsx'

const UserProfilePage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='user-profile-header-container'>
        <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
          <div className='brand-name'>
            <span className='shem'>Shem's</span>
            <span className='books'>Books</span>
          </div>
        </Link>
        <div>
          <button className='user-profile-become-seller-button'>
            Become Seller
          </button>
        </div>
      </div>
      <GoBack />
      <div className='white-space-user-profile-bg'>
        <div className='user-profile-bg-container'>
          <UserProfile />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserProfilePage
