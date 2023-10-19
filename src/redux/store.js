import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/users'
import sellerReducer from './reducers/sellers'
import productReducer from './reducers/product'
import eventReducer from './reducers/event'
import cartReducer from './reducers/cart'
import wishlistReducer from './reducers/wishlist'
import thunk from 'redux-thunk'

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    event: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
  },
  middleware: [thunk]
})

export default store
