import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import server from '../../../server'
import axios from 'axios'
import { toast } from 'react-toastify'

const ActivationPage = () => {
  const [error, setError] = useState(false)
  const { activation_token } = useParams()
  console.log(`activationToken: ${activation_token}`)
  const messageRef = useRef(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${server}/api/shop/activation/${activation_token}`
        )
        toast.success('Account activation successful')
      } catch (err) {
        toast.error(err)
        setError(true)
      }
    }

    getData()

    const td = setTimeout(() => {
      if (
        messageRef.current.textContent.includes('Account activation successful')
      ) {
        window.location.href = '/seller/dashboard'
        clearTimeout(td)
      } else {
        null
        clearTimeout(td)
      }
    }, 3000)
  }, [activation_token])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        background: 'white'
      }}
    >
      <div style={{ fontFamily: 'Inter', fontSize: '35px' }} ref={messageRef}>
        {error === false ? 'Account activation successful' : 'Token expired'}
      </div>
    </div>
  )
}

export default ActivationPage
