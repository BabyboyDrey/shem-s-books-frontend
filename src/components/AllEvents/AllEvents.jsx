import React, { useEffect, useState } from 'react'
import './AllEvents.css'
import Event from '../Event/Event'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import getAllEvents from '../../redux/actions/event'
import { addToWishlist, removeFromWishlist } from '../../redux/actions/wishlist'
import { toast } from 'react-toastify'
import Loading from '../Loader/Loader.js'

const AllEvents = () => {
  const colors = ['#f88379', '#dc143c', '#a95c68', '#faa0a0']
  const { isLoading, event } = useSelector(state => state.event)
  const { wishlist } = useSelector(state => state.wishlist)
  const [liked, setLiked] = useState([])
  const [backgroundColors, setBackgroundColors] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllEvents())
  }, [])

  useEffect(() => {
    if (event?.length > 0) {
      setLiked(new Array(event.length).fill(false))
      const generatedColors = event.map(() => getRandomColor())
      setBackgroundColors(generatedColors)

      event.forEach((e, index) => {
        const isExists = wishlist.some(i => i._id === e._id)
        if (isExists && !liked[index]) {
          setLiked(prevLiked => {
            const updatedLiked = [...prevLiked]
            updatedLiked[index] = true
            return updatedLiked
          })
        } else if (!isExists && liked[index]) {
          setLiked(prevLiked => {
            const updatedLiked = [...prevLiked]
            updatedLiked[index] = false
            return updatedLiked
          })
        }
      })
    }
  }, [event, wishlist])

  const handleLiked = index => {
    const updatedLiked = [...liked]
    if (updatedLiked[index] === true) {
      dispatch(removeFromWishlist(event[index]))
      toast.success('Item removed from wishlist')
    } else {
      const isExists = wishlist.find(i => {
        return i._id === event[index]._id
      })
      if (isExists) {
        toast.error('Item already in wishlist')
      } else {
        dispatch(addToWishlist(event[index]))
        toast.success('Item added to wishlist')
      }
    }
    setLiked(prevLiked => {
      const updatedLiked = [...prevLiked]
      updatedLiked[index] = !updatedLiked[index]
      return updatedLiked
    })
  }

  const getRandomColor = () => {
    const selectedIndex = Math.floor(Math.random() * colors.length)
    return colors[selectedIndex]
  }

  const renderEventContainers = () => {
    return event.map((singleE, index) => {
      const backgroundColor = backgroundColors[index]

      return (
        <div
          key={singleE._id}
          className='single-bg-event-container'
          style={{ backgroundColor }}
        >
          {liked[index] ? (
            <AiFillHeart
              onClick={() => handleLiked(index)}
              className='red-color event-heart-icon absolute'
            />
          ) : (
            <AiOutlineHeart
              onClick={() => handleLiked(index)}
              className='event-heart-icon absolute'
            />
          )}
          <Event event={singleE} />
        </div>
      )
    })
  }

  return (
    <div className='all-events-bg-container'>
      <h1>All Events</h1>
      <hr />
      <div className='all-events-container'>
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : event?.length > 0 ? (
          renderEventContainers()
        ) : (
          <div>No events yet</div>
        )}
      </div>
    </div>
  )
}

export default AllEvents
