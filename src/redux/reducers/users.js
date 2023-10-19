import { createReducer } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  isLoading: true,
  error: null,
  user: null,
  isAuth: false,
  userLoaded: false,
  userCookie: false
}

const userReducer = createReducer(INITIAL_STATE, {
  userLoaded: state => {
    state.userLoaded = true
  },
  noUserCookie: (state, action) => {
    ;(state.userCookie = true), (state.user = action.payload)
  },
  loadUserRequest: state => {
    state.isLoading = true
  },
  loadUserSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.user = action.payload),
      (state.isAuth = true),
      (state.error = null)
  },
  loadUserFail: (state, action) => {
    ;(state.isLoading = false),
      (state.isAuth = false),
      (state.error = action.payload)
  },
  updateAddressRequest: state => {
    state.isLoading = true
  },
  updateAddressSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.user = action.payload),
      (state.isAuth = true)
  },
  updateAddressFail: (state, action) => {
    ;(state.isLoading = true),
      (state.error = action.payload),
      (state.isAuth = false)
  },
  updatePasswordsRequest: state => {
    state.isLoading = true
  },
  updatePasswordsSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.isAuth = true),
      (state.user = action.payload)
  },
  updatePasswordsFail: (state, action) => {
    ;(state.isLoading = false),
      (state.isAuth = false),
      (state.error = action.payload)
  },
  deleteUserRequest: state => {
    state.isLoading = true
  },
  deleteUserSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.isAuth = false),
      (state.user = action.payload)
  },
  deleteUserFail: (state, action) => {
    ;(state.isLoading = false),
      (state.error = action.payload),
      (state.isAuth = true)
  },
  logoutUserRequest: state => {
    state.isLoading = true
  },
  logoutUserSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.user = action.payload),
      (state.isAuth = false)
  },
  logoutUserFail: (state, action) => {
    ;(state.isLoading = false),
      (state.error = action.payload),
      (state.isAuth = true)
  }
})

export default userReducer
