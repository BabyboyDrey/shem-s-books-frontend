import React from 'react'
import Header from '../../components/Header/Header'
import NavbarHeadroom from '../../components/NavbarHeadroom/NavbarHeadroom'
import MostAffordable from '../../components/MostAffordable/MostAffordable.jsx'
import Footer from '../../components/Footer/Footer'

const MostAffordablePage = ({ active, setActive }) => {
  return (
    <div>
      <Header />
      <NavbarHeadroom active={active} setActive={setActive} />
      <MostAffordable />
      <Footer />
    </div>
  )
}

export default MostAffordablePage
