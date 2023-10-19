import React, { useState } from 'react'
import axios from 'axios'
import server from '../../server'
import { toast } from 'react-toastify'
import './SignUp.css'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    const user = {
      email,
      firstName,
      lastName,
      password
    }

    await axios
      .post(`${server}/api/user/sign-up`, user, { withCredentials: true })
      .then(res => {
        toast.success(`Activation link sent to ${email}`)
      })
      .catch(err => toast.error(err))
  }

  return (
    <div className='sign-up-container'>
      <h1>Sign Up</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='sign-up-form'>
          <input
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
            autoFocus
            type='text'
            placeholder='Enter your email address'
          />
          <input
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value)
            }}
            type='text'
            placeholder='Enter your first name'
          />
          <input
            value={lastName}
            onChange={e => {
              setLastName(e.target.value)
            }}
            type='text'
            placeholder='Enter your last name'
          />
          <input
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
            type='password'
            placeholder='Enter your password'
          />
          <div className='login-tag-container'>
            <h5>
              Already have an account? <a href='/login'>Login</a>
            </h5>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
