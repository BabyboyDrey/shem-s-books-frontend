import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer.jsx'
import Lottie from 'react-lottie'
import animationData from '../../Assets/animation_ll21s96c.json'
import './OrderSuccessPage.css'

const OrderSuccessPage = () => {
  const navigate = useNavigate()

  const td = setTimeout(() => {
    navigate('/')
    clearTimeout(td)
  }, 3000)

  return (
    <div>
      <Success />
      <Footer />
    </div>
  )
}

const Success = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYmid slice'
    }
  }
  return (
    <div className='success-page-bg-container'>
      <br />
      <h3>Order placed succesfully</h3>
      <Lottie width={300} height={300} options={defaultOptions} />
    </div>
  )
}

export default OrderSuccessPage
