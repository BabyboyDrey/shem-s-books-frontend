import { createReducer } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  error: null,
  seller: null,
  isLoading: true,
  isAuth: false,
  sellerCookie: false
}

const sellerReducer = createReducer(INITIAL_STATE, {
  loadSellerRequest: state => {
    state.isLoading = true
  },
  loadSellerSuccess: (state, action) => {
    state.isLoading = false
    state.seller = action.payload
    state.isAuth = true
  },
  loadSellerFail: (state, action) => {
    state.isLoading = false
    state.error = action.payload
    state.isAuth = false
  },
  updateAccountRequest: state => {
    state.isLoading = true
  },
  updateAccountSuccess: (state, action) => {
    state.isLoading = false
    state.seller = action.payload
    state.isAuth = true
  },
  updateAccountFail: (state, action) => {
    state.isLoading = false
    state.isAuth = false
    state.error = action.payload
  },
  updateAddressRequest: (state, action) => {
    state.isLoading = true
  },
  updateAddressSuccess: (state, action) => {
    state.isLoading = false
    state.isAuth = true
    state.seller = action.payload
  },
  updateAddressFail: (state, action) => {
    state.isLoading = false
    state.error = action.payload
    state.isAuth = false
  },
  updatePasswordRequest: (state, action) => {
    state.isLoading = true
  },
  updatePasswordSuccess: (state, action) => {
    state.isLoading = false
    state.seller = action.payload
    state.isAuth = true
  },
  updatePasswordFail: (state, action) => {
    state.isLoading = false
    state.error = action.payload
    state.isAuth = false
  },
  updateAvatarRequest: (state, action) => {
    state.isLoading = true
  },
  updateAvatarSuccess: (state, action) => {
    state.isLoading = false
    state.seller = action.payload
    state.isAuth = true
  },
  updateAvatarFail: (state, action) => {
    state.isLoading = false
    state.error = action.payload
    state.isAuth = false
  },
  sellerLoaded: state => {
    state.sellerCookie = true
  },
  deleteSellerRequest: state => {
    state.isLoading = true
  },
  deleteSellerSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.isAuth = false),
      (state.seller = action.payload)
  },
  deleteSellerFail: (state, action) => {
    ;(state.isLoading = false),
      (state.error = action.payload),
      (state.isAuth = true)
  },
  logoutSellerRequest: state => {
    state.isLoading = true
  },
  logoutSellerSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.seller = action.payload),
      (state.isAuth = false)
  },
  logoutSellerFail: (state, action) => {
    ;(state.isLoading = false),
      (state.error = action.payload),
      (state.isAuth = true)
  }
})

export default sellerReducer
