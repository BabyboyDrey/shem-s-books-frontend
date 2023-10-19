import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loader/Loader.js'

const UserProtectedRoute = ({ children }) => {
  const { isLoading, isAuth } = useSelector(state => state.user)
  if (isLoading === true) {
    return (
      <div>
        <Loading />
      </div>
    )
  } else {
    if (!isAuth) {
      return <Navigate to='/login' replace />
    } else {
      return children
    }
  }

  return children
}

export default UserProtectedRoute
