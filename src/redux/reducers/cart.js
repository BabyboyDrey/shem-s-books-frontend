import { createReducer } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  cart: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []
}

const cartReducer = createReducer(INITIAL_STATE, {
  addToCart: (state, action) => {
    const item = action.payload
    const isItemExist = state.cart.find(i => i._id === item._id)
    if (isItemExist) {
      return {
        ...state,
        cart: state.cart.map(i => (i._id === isItemExist._id ? item : i))
      }
    } else {
      return {
        ...state,
        cart: [...state.cart, item]
      }
    }
  },

  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter(i => i._id !== action.payload)
    }
  }
})

export default cartReducer
