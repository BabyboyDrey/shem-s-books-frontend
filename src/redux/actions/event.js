import axios from 'axios'
import server from '../../server.js'
import { toast } from 'react-toastify'

export const createEvents = newForm => async dispatch => {
  try {
    dispatch({
      type: 'createEventRequest'
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    }

    await axios
      .post(`${server}/api/event/create-event`, newForm, config)
      .then(res => {
        dispatch({
          type: 'createEventSuccess',
          payload: res.data
        })
        toast.success('Event successfully created')
      })
      .catch(err => {
        toast.error(err)
        console.log(err)
      })
  } catch (err) {
    dispatch({
      type: 'createEventFail',
      payload: err
    })
  }
}

export const deleteEvents = eventId => async dispatch => {
  try {
    dispatch({
      type: 'deleteEventRequest'
    })

    const res = await axios.delete(
      `${server}/api/event/delete-event/${eventId}`
    )

    if (res.data.status === 200) {
      dispatch({
        type: 'deleteEventSuccess',
        payload: 'Event deleted'
      })
      toast.success('Event deleted successfully')
    } else if (err) {
      toast.error(err)
    }
  } catch (err) {
    dispatch({
      type: 'deleteEventFail',
      payload: err
    })
  }
}

const getAllEvents = () => async dispatch => {
  try {
    dispatch({
      type: 'getAllEventsRequest'
    })

    const res = await axios.get(`${server}/api/event/all-events`)

    dispatch({
      type: 'getAllEventsSuccess',
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: 'getAllEventsFail',
      payload: err
    })
  }
}

export default getAllEvents
