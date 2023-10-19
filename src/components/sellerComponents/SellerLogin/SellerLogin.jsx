import React, { useState } from 'react'
import './SellerLogin.css'
import axios from 'axios'
import server from '../../../server'
import { toast } from 'react-toastify'

const SellerLogin = () => {
  const [shopEmail, setShopEmail] = useState('')
  const [shopPassword, setShopPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios
        .post(
          `${server}/api/shop/login`,
          { shopEmail, shopPassword },
          { withCredentials: true }
        )
        .then(res => {
          setShopEmail('')
          setShopPassword('')
          const td = setTimeout(() => {
            window.location.href = '/seller/dashboard'
            clearTimeout(td)
          }, [1000])
        })
        .catch(err => {
          console.log(err)
          toast.error(err.response.data)
        })
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  return (
    <div className='seller-login-container'>
      <h1>Hey, Welcome back</h1>
      <div className='seller-login-form-container'>
        <form onSubmit={handleSubmit} className='seller-login-form'>
          <input
            autoFocus
            type='text'
            placeholder='Enter your store email address'
            value={shopEmail}
            onChange={e => {
              setShopEmail(e.target.value)
            }}
          />
          <input
            value={shopPassword}
            onChange={e => {
              setShopPassword(e.target.value)
            }}
            type='password'
            placeholder='Enter your store password'
          />
          <div className='seller-sign-up-tag-container'>
            <h5>
              Do not have an account? <a href='/seller/sign-up'>Sign up</a>
            </h5>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default SellerLogin
