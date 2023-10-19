import { createReducer } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  isLoading: true
}

const productReducer = createReducer(INITIAL_STATE, {
  createProductRequest: state => {
    state.isLoading = true
  },
  createProductSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.product = action.payload),
      (state.error = null)
  },
  createProductFail: (state, action) => {
    ;(state.isLoading = false), (state.error = action.payload)
  },
  getCommonCategoryProductsRequest: state => {
    state.isLoading = true
  },
  getCommonCategoryProductsSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.categorisedProducts = action.payload),
      (state.error = null)
  },
  getCommonCategoryProductsFail: (state, action) => {
    ;(state.isLoading = false), (state.error = action.payload)
  },
  getAllProductsRequest: state => {
    state.isLoading = true
  },
  getAllProductsSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.allProduct = action.payload),
      (state.error = null)
  },
  getAllProductsFail: (state, action) => {
    ;(state.isLoading = false), (state.error = action.payload)
  },
  getSpecificProductRequest: state => {
    state.isLoading = true
  },
  getSpecificProductsSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.product = action.payload),
      (state.error = null)
  },
  getSpecificProductsFail: (state, action) => {
    ;(state.isLoading = false), (state.error = action.payload)
  },
  updateStockRequest: state => {
    state.isLoading = true
  },
  updateStockSuccess: (state, action) => {
    ;(state.isLoading = false),
      (state.product = action.payload),
      (state.error = null)
  },
  updateStockFail: (state, action) => {
    ;(state.isLoading = false), (state.error = action.payload)
  }
})

export default productReducer
