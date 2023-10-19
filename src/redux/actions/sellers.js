import axios from 'axios'
import server from '../../server'
import { toast } from 'react-toastify'

export const loadSeller = () => async dispatch => {
  try {
    dispatch({
      type: 'loadSellerRequest'
    })

    const data = await axios.get(`${server}/api/shop/getSeller`, {
      withCredentials: true
    })

    if (data.data) {
      const sellerData = {
        shopId: data.data._id,
        shopName: data.data.shopName,
        shopEmail: data.data.shopEmail,
        shopAvatar: data.data?.avatar,
        shopNumber: data.data.shopNumber,
        addresses: {
          shopAddressName: data.data.shopAddress?.shopAddressName,
          shopCountry: data.data.shopAddres?.shopCountry,
          shopState: data.data.shopAddress?.shopState,
          shopZipCode: data.data.shopAddress?.shopZipCode,
          shopStreetAddress: data.data.shopAddress?.shopStreetAddress
        }
      }
      dispatch({
        type: 'sellerLoaded'
      })
      console.log(`seller: ${sellerData}`)
      dispatch({
        type: 'loadSellerSuccess',
        payload: sellerData
      })
    }
  } catch (err) {
    dispatch({
      type: 'loadSellerFail',
      payload: 'Seller loading failed'
    })
    console.error({ error: err.message })
  }
}

export const updateAccount = items => async dispatch => {
  try {
    dispatch({
      type: 'updateAccountRequest'
    })

    const response = await axios
      .post(`${server}/api/shop/update`, items, {
        withCredentials: true
      })
      .then(res => {
        console.log(res)
        toast.success('Account updated successfully')
      })
      .catch(err => {
        toast.error(err.response)
        console.log(err)
      })
    console.log(response.data)
    dispatch({
      type: 'updateAccountSuccess',
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: 'updateAccountFail',
      payload: err.response
    })
    toast.error(err.response)
    console.log(err.response)
  }
}

export const updateAddress =
  (shopAddressName, shopCountry, shopState, shopZipCode, shopStreetAddress) =>
  async dispatch => {
    try {
      dispatch({
        type: 'updateAddressRequest'
      })

      const response = await axios
        .put(
          `${server}/api/shop/update-address`,
          {
            shopAddressName,
            shopCountry,
            shopState,
            shopZipCode,
            shopStreetAddress
          },
          { withCredentials: true }
        )
        .then(res => {
          console.log(`res: ${res}`)
          toast.success('Address updated')
          dispatch({
            type: 'updateAddressSuccess',
            payload: res.data.shop
          })
        })
        .catch(err => {
          console.log(err)
          toast.error(err.response)
        })
    } catch (err) {
      dispatch({
        type: 'updateAddressFail',
        payload: err
      })
      console.log(err)
      toast.error(err.response)
    }
  }

export const updatePassword =
  (oldPassword, newPassword, confirmNewPassword) => async dispatch => {
    try {
      dispatch({
        type: 'updatePasswordRequest'
      })

      const response = axios
        .put(
          `${server}/api/shop/update-passwords`,
          {
            oldPassword,
            newPassword,
            confirmNewPassword
          },
          { withCredentials: true }
        )
        .then(res => {
          toast.success('Password updated')
          dispatch({
            type: 'updatePasswordSuccess',
            payload: res.data
          })
        })
        .catch(err => {
          toast.error(err)
          console.log(err)
        })
    } catch (err) {
      dispatch({ type: 'updatePasswordFail', payload: err.response })
      console.log(err.response)
      toast.error(err.response)
    }
  }

export const logoutSeller = () => async dispatch => {
  try {
    dispatch({
      type: 'logoutSellerRequest'
    })

    await axios.get(`${server}/api/shop/logout`).then(res => {
      console.log('User logging out...')
    })
    toast.success('Seller logging out...')
    dispatch({
      type: 'logoutSellerSuccess',
      payload: 'User logging out'
    })
  } catch (err) {
    dispatch({
      type: 'logoutSellerFail',
      payload: err
    })
    toast.error(err)
  }
}

export const deleteSeller = () => async dispatch => {
  try {
    dispatch({
      type: 'deleteSellerRequest'
    })

    await axios
      .delete(`${server}/api/shop/delete`, { withCredentials: true })
      .then(res => {
        toast.success('Your account has been deleted successfully')
        dispatch({
          type: 'deleteSellerSuccess',
          payload: 'Account deleted'
        }).catch(err => {
          toast.error(err)
          console.log(err)
        })
      })
  } catch (err) {
    dispatch({
      type: 'deleteSellerFail',
      payload: 'failed to delete seller'
    })
  }
}
