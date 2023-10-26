import React, { useState } from 'react'
import './SellerSignUp.css'
import server from '../../../server'
import axios from 'axios'
import { toast } from 'react-toastify'

const SellerSignUp = () => {
  const [shopName, setShopName] = useState('')
  const [shopEmail, setShopEmail] = useState('')
  const [shopNumber, setShopNumber] = useState(null)
  const [shopPassword, setShopPassword] = useState('')
  const [shopCountry, setShopCountry] = useState('')
  const [shopState, setShopState] = useState('')
  const [shopStreetAddress, setShopStreetAddress] = useState('')
  const [shopZipCode, setShopZipCode] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await axios
        .post(
          `${server}/api/shop/sign-up`,
          {
            shopName,
            shopEmail,
            shopNumber,
            shopPassword,
            shopCountry,
            shopState,
            shopZipCode,
            shopStreetAddress
          },
          {
            withCredentials: true
          }
        )
        .then(res => {
          toast.success(
            `Activation link sent to ${shopEmail}, click on it to complete sign up`
          )
        })
        .catch(err => {
          toast.error(err.response)
          console.log(err)
        })
    } catch (err) {
      toast.error(err.response)
      console.log(err.response)
    }
  }

  return (
    <div className='seller-sign-up-container'>
      <h1>Sign up your book store</h1>
      <div className='seller-sign-up-form-container'>
        <form onSubmit={handleSubmit} className='seller-sign-up-form'>
          <input
            value={shopEmail}
            onChange={e => {
              setShopEmail(e.target.value)
            }}
            autoFocus
            type='text'
            placeholder='Enter your store email address'
          />
          <input
            value={shopName}
            onChange={e => {
              setShopName(e.target.value)
            }}
            type='text'
            placeholder='Enter your  store  name'
          />
          <input
            value={shopNumber}
            onChange={e => {
              setShopNumber(e.target.value)
            }}
            type='number'
            placeholder='Enter your store phone number'
          />
          <input
            value={shopCountry}
            onChange={e => {
              setShopCountry(e.target.value)
            }}
            type='text'
            placeholder='Enter your store country location'
          />
          <input
            value={shopState}
            onChange={e => {
              setShopState(e.target.value)
            }}
            type='text'
            placeholder='Enter your  store state location'
          />
          <input
            value={shopZipCode}
            onChange={e => {
              setShopZipCode(e.target.value)
            }}
            type='number'
            placeholder='Enter your store zip code location'
          />
          <input
            value={shopStreetAddress}
            onChange={e => {
              setShopStreetAddress(e.target.value)
            }}
            type='text'
            placeholder='Enter your store street address'
          />
          <input
            value={shopPassword}
            onChange={e => {
              setShopPassword(e.target.value)
            }}
            type='password'
            placeholder='Enter your store password'
          />
          <div className='seller-login-tag-container'>
            <h5>
              Already have an account? <a href='/seller/login'>Login</a>
            </h5>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SellerSignUp
