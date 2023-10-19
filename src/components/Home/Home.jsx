import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import './Home.css'
import Event from '../Event/Event'
import Footer from '../Footer/Footer'
import NavbarHeadroom from '../NavbarHeadroom/NavbarHeadroom'
import { useSelector, useDispatch } from 'react-redux'
import getAllEvents from '../../redux/actions/event'
import BestSelling from '../Layout/BestSelling/BestSelling.jsx'
import MostAffordable from '../Layout/MostAffordable/MostAffordable.jsx'
import CategorisedProducts from '../Layout/CategorisedProducts/CategorisedProducts.jsx'
import Loading from '../Loader/Loader.js'

const Home = ({ active, setActive }) => {
  const dispatch = useDispatch()

  const { isLoading, event, error } = useSelector(state => state.event)
  const { isLoading: isProductLoading } = useSelector(state => state.product)
  useEffect(() => {
    dispatch(getAllEvents())
  }, [])

  return isLoading && isProductLoading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <NavbarHeadroom active={active} setActive={setActive} />
      <div className='content-container'>
        <CategorisedProducts />

        <div className='event-card-container-bg'>
          <h1 className='event-header'>Event</h1>
          {isLoading ? (
            <div>Loading...</div>
          ) : event?.length > 0 ? (
            <div key={event[0]._id} className='event-card-category'>
              <Event event={event[0]} />
            </div>
          ) : (
            <div>No Events</div>
          )}
        </div>

        <BestSelling />
        <MostAffordable />
      </div>
      <Footer />
    </div>
  )
}

export default Home
