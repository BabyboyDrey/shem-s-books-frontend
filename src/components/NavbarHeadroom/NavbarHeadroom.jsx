import React from 'react'
import Navbar from '../Navbar/Navbar'
import Headroom from 'react-headroom'

const NavbarHeadroom = ({ active, setActive }) => {
  return (
    <Headroom>
      <Navbar active={active} setActive={setActive} />
    </Headroom>
  )
}

export default NavbarHeadroom
