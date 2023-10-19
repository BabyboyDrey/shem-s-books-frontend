import React from 'react'
import './goBack.css'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const GoBack = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div
        onClick={() => {
          navigate(-1)
        }}
        className='go-back-button'
      >
        <h3>
          <FiArrowLeft /> Go back
        </h3>
      </div>
    </div>
  )
}

export default GoBack
