import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import NavbarHeadroom from '../../components/NavbarHeadroom/NavbarHeadroom'
import Footer from '../../components/Footer/Footer'
import AllEvents from '../../components/AllEvents/AllEvents.jsx'
import { useLocation } from 'react-router-dom'

const AllEventsPage = ({ active, setActive }) => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/all-events') {
      setActive(4)
    }

    console.log(location.pathname)
  }, [location])

  return (
    <div>
      <Header />
      <NavbarHeadroom active={active} setActive={setActive} />
      <AllEvents />
      <Footer />
    </div>
  )
}

export default AllEventsPage
