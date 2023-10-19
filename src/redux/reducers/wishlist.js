import { createReducer } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  wishlist: localStorage.getItem('wishlistItems')
    ? JSON.parse(localStorage.getItem('wishlistItems'))
    : []
}

const wishlistReducer = createReducer(INITIAL_STATE, {
  addToWishlist: (state, action) => {
    const item = action.payload
    console.log(`1 item in wishlist reducer`, item)
    const isItemExists = state?.wishlist?.find(i => {
      return i._id === item._id
    })
    if (isItemExists) {
      return {
        ...state,
        wishlist: state.wishlist.map(i =>
          i._id === isItemExists._id ? item : i
        )
      }
    } else {
      return {
        ...state,
        wishlist: [...state.wishlist, item]
      }
    }
  },
  removeFromWishlist: (state, action) => {
    const item = action.payload
    console.log(`2 item in wishlist reducer`, item)

    return {
      ...state,
      wishlist: state.wishlist.filter(i => {
        return i._id !== item._id
      })
    }
  }
})

export default wishlistReducer
