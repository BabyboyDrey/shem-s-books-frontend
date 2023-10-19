import React from 'react'
import './Event.css'
import server from '../../server'
import Timer from '../sellerComponents/Timer/Timer.jsx'

const Event = ({ event }) => {
  function truncateSentence (sentence, numWords) {
    const words = sentence?.split(' ')
    if (words?.length <= numWords) {
      return sentence
    }
    const truncatedWords = words?.slice(0, numWords)
    return truncatedWords?.join(' ') + '...'
  }

  const truncatedSentence = truncateSentence(event?.eventDesc, 15)
  return (
    <div className='event-card'>
      <div className='image-conatiner'>
        <img loading='lazy' src={`${server}/${event?.eventImages[0]}`} />
      </div>
      <div className='event-details'>
        <div className='product-details'>
          <h3 className='product-title'>{event?.eventName}</h3>
          <h3 className='product-desc'>{truncatedSentence}</h3>
        </div>
        <div className='seller-cat-container'>
          <h3 className='seller'>{event?.seller?.name}</h3>
          <h3 className='product-cat'>{event?.category}</h3>
        </div>
        <h3 className='countdown'>{<Timer data={event} />}</h3>
        <div className='prices-container'>
          <h3 className='total-price'>{event?.discountPrice}</h3>
          <h3 className='former-price'>{event?.currentPrice}</h3>
        </div>
      </div>
    </div>
  )
}

export default Event
