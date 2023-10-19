import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import React from 'react'
import Loading from '../components/Loader/Loader.js'

const SellerProtectedRoute = ({ children }) => {
  const { isAuth, isLoading, seller } = useSelector(state => state.seller)

  if (isLoading === true) {
    return (
      <div>
        <Loading />
      </div>
    )
  } else {
    if (!isAuth) {
      return <Navigate to='/seller/login' replace />
    } else {
      return children
    }
  }
}

export default SellerProtectedRoute
