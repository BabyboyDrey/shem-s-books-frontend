import React, { useState, useEffect } from 'react'
import axios from 'axios'
import server from '../../../server'

const Timer = ({ data }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(setTimeComponentsLeft())
    }, 1000)

    if (
      typeof timeLeft.Days === 'undefined' &&
      typeof timeLeft.Hours === 'undefined' &&
      typeof timeLeft.Minutes === 'undefined' &&
      typeof timeLeft.Seconds === 'undefined'
    ) {
      axios
        .delete(`${server}/api/event/delete-event/${data?._id}`)
        .then(r => console.log('Event deleted'))
        .catch(err => console.log('errr in timer', err))
    }

    return () => clearInterval(intervalId)
  }, [])

  const setTimeComponentsLeft = () => {
    const endDate = data?.endDate
    const difference = +new Date(endDate) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / (1000 * 60)) % 60),
        Seconds: Math.floor((difference / 1000) % 60)
      }
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(setTimeComponentsLeft())

  const timeComponents = Object.keys(timeLeft).map(interval => {
    if (!timeLeft[interval]) return null

    return (
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    )
  })

  return (
    <div>
      {timeComponents.length > 0 ? timeComponents : <span>Time is up</span>}
    </div>
  )
}

export default Timer
