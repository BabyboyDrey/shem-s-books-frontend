import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import NavbarHeadroom from '../../components/NavbarHeadroom/NavbarHeadroom'
import Footer from '../../components/Footer/Footer'
import BestSelling from '../../components/BestSelling/BestSelling.jsx'
import Header from '../../components/Header/Header'

const BestSellingPage = ({ active, setActive }) => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/best-selling') {
      setActive(3)
    }
  }, [location])

  return (
    <div>
      <Header />
      <NavbarHeadroom active={active} setActive={setActive} />
      <BestSelling />
      <Footer />
    </div>
  )
}

export default BestSellingPage
