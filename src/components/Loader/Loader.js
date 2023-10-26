import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../Assets/animation_lnuh0cp0 (5).json'

const Loading = () => {
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
      <Lottie width={200} height={300} options={defaultOptions} />
    </div>
  )
}

export default Loading
