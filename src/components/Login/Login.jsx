import React, { useState, useEffect, useRef } from 'react'
import server from '../../server'
import axios from 'axios'
import './Login.css'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const successRef = useRef(null)

  const handleSubmit = async e => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    await axios
      .post(`${server}/api/user/login`, user, { withCredentials: true })
      .then(res => {
        successRef.current = true
        setEmail('')
        setPassword('')
        const td = setTimeout(() => {
          window.location.href = '/'
          clearTimeout(td)
        }, 3000)
      })
      .catch(err => {
        console.log(err)
        toast.error(err.response.data)
      })
  }

  return (
    <div className='login-container'>
      <h1>Hey, welcome back</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='login-form'>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
            type='text'
            placeholder='Enter your email address'
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            placeholder='Enter your password'
          />
          <div className='login-tag-container'>
            <h5>
              Don't have an account? <a href='/sign-up'>Sign Up</a>
            </h5>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
