export const addToWishlist = data => async (dispatch, getState) => {
  dispatch({
    type: 'addToWishlist',
    payload: data
  })
  console.log(`1 data in wishlist actions`, data)
  localStorage.setItem(
    'wishlistItems',
    JSON.stringify(getState().wishlist.wishlist)
  )
  return data
}

export const removeFromWishlist = data => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'removeFromWishlist',
      payload: data
    })
    console.log(`2 data in wishlist actions`, data)
    localStorage.setItem(
      'wishlistItems',
      JSON.stringify(getState().wishlist.wishlist)
    )
    return data
  } catch (err) {
    console.log(`Err removing from wishlist`, err)
  }
}
