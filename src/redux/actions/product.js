import axios from 'axios'
import server from '../../server'
import { toast } from 'react-toastify'

export const createProduct = newForm => async dispatch => {
  try {
    dispatch({ type: 'createProductRequest' })
    console.log(`newForm in actions`, newForm)
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    await axios
      .post(`${server}/api/book/create-book`, newForm, config)
      .then(res => {
        toast.success('Book created')
        dispatch({
          type: 'createProductSuccess',
          payload: res.data
        })
      })
      .catch(err => {
        toast.error(err)
      })
  } catch (err) {
    dispatch({ type: 'createProductFail', payload: err })
  }
}

export const getCommonCategoryProducts = () => async dispatch => {
  try {
    dispatch({
      type: 'getCommonCategoryProductsRequest'
    })

    const res = await axios
      .get(`${server}/api/book/category-linked-books`)
      .then(null)
      .catch(err => console.error(err))

    dispatch({
      type: 'getCommonCategoryProductsSuccess',
      payload: res.data
    })
    console.log(`categorised data in redux actions:`, res.data)
  } catch (err) {
    dispatch({
      type: 'getCommonCategoryProductsFail',
      payload: err
    })
  }
}
export const getAllProducts = () => async dispatch => {
  try {
    dispatch({
      type: 'getAllProductsRequest'
    })

    const res = await axios
      .get(`${server}/api/book/get-all-books`)
      .then(null)
      .catch(err => console.error(err))

    dispatch({
      type: 'getAllProductsSuccess',
      payload: res.data.books
    })
    console.log(`all products in redux actions:`, res.data.books)
  } catch (err) {
    dispatch({
      type: 'getAllProductsFail',
      payload: err
    })
  }
}
