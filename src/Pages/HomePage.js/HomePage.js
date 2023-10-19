import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Home from '../../components/Home/Home.jsx'

const HomePage = ({ active, setActive }) => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      setActive(1)
    }
  }, [location])
  return (
    <div>
      <Home active={active} setActive={setActive} />
    </div>
  )
}

export default HomePage
