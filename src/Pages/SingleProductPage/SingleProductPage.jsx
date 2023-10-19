import React from 'react'
import NavbarHeadroom from '../../components/NavbarHeadroom/NavbarHeadroom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header.js'
import SingleProductCard from '../../components/SingleProductCard/SingleProductCard.js'

const SingleProductPage = () => {
  return (
    <div>
      <Header />
      <NavbarHeadroom />
      <SingleProductCard />
      <Footer />
    </div>
  )
}

export default SingleProductPage
