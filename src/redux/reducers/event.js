import { createReducer } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  isLoading: true
}

const eventReducer = createReducer(INITIAL_STATE, {
  createEventRequest: state => {
    state.isLoading = true
  },
  createEventSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.event = action.payload),
      (state.error = null)
  },
  createEventFail: (state, action) => {
    ;(state.isLoading = false), (state.error = action.payload)
  },
  getAllEventsRequest: state => {
    state.isLoading = true
  },
  getAllEventsSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.event = action.payload),
      (state.error = null)
  },
  getAllEventsFail: (state, action) => {
    ;(state.isLoading = false), (state.error = action.payload)
  },
  deleteEventRequest: state => {
    state.isLoading = true
  },
  deleteEventSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.event = action.payload),
      (state.error = null)
  },
  deleteEventFail: (state, action) => {
    ;(state.isLoading = false), (state.error = action.payload)
  }
})

export default eventReducer
