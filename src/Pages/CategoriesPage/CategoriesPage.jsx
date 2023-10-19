import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Categories from '../../components/Categories/Categories.jsx'
import NavbarHeadroom from '../../components/NavbarHeadroom/NavbarHeadroom'

const CategoriesPage = ({ active, setActive }) => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/categories') {
      setActive(2)
    }
  }, [location])
  return (
    <div>
      <Header />
      <NavbarHeadroom active={active} setActive={setActive} />
      <Categories />
      <Footer />
    </div>
  )
}

export default CategoriesPage
