import axios from 'axios'
import server from '../../server'
import { toast } from 'react-toastify'

export const loadUser = () => async dispatch => {
  try {
    dispatch({
      type: 'loadUserRequest'
    })

    const data = await axios.get(`${server}/api/user/getUser`, {
      withCredentials: true
    })

    if (data.data) {
      const userData = {
        email: data.data.email,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        avatar: data.data.avatar,
        addresses: data.data.addresses.map((address, index) => ({
          index: index,
          addressType: address.addressType,
          country: address.country,
          state: address.state,
          streetName: address.streetName,
          houseNumber: address.houseNumber,
          zipcode: address.zipcode
        }))
      }

      dispatch({
        type: 'loadUserSuccess',
        payload: userData
      })
      dispatch({
        type: 'userLoaded'
      })
    } else if (data.status === 401) {
      dispatch({
        type: 'noUserCookie',
        payload: 'unauthorized access'
      })
    }
  } catch (err) {
    dispatch({ type: 'loadUserFail', payload: 'An err occured' })
  }
}

export const updateAddresses =
  (addressType, country, state, streetName, zipCode, houseNumber) =>
  async dispatch => {
    try {
      dispatch({
        type: 'updateAddressRequest'
      })
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }

      const addresses = {
        addressType,
        country,
        state,
        streetName,
        zipCode,
        houseNumber
      }
      const data = await axios.put(
        `${server}/api/user/update-addresses`,
        addresses,
        config
      )
      console.log(addresses)

      dispatch({
        type: 'updateAddressSuccess',
        payload: data.user
      })
      console.log(`data: ${data}`)
      toast.success('Address updated successfully')
    } catch (err) {
      dispatch({
        type: 'updateAddressFail',
        payload: err.response.data
      })
      toast.error(err.response.data)
    }
  }

export const deleteUser = () => async dispatch => {
  try {
    dispatch({
      type: 'deleteUserRequest'
    })

    const data = await axios.delete(`${server}/api/user/delete`)

    dispatch({
      type: 'deleteUserSuccess',
      payload: data.user
    })
    toast.success('Account deleted successfully')
    window.location.href = '/'
  } catch (err) {
    dispatch({
      type: 'deleteUserFail',
      payload: err.response.data
    })
    toast.error(err.response.data)
  }
}

export const updatePasswords =
  (oldPassword, newPassword, confirmNewPassword) => async dispatch => {
    try {
      console.log(
        `Passwords in action redux: ${oldPassword} ${newPassword} ${confirmNewPassword}`
      )
      dispatch({
        type: 'updatePasswordsRequest'
      })
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
      const data = await axios.put(
        `${server}/api/user/update-password`,
        {
          oldPassword,
          newPassword,
          confirmNewPassword
        },
        config
      )

      dispatch({
        type: 'updatePasswordsSuccess',
        payload: data.user
      })
      console.log(`data: ${data.user}`)
      toast.success('Password updated successfully')
    } catch (err) {
      dispatch({
        type: 'updatePasswordsFail',
        payload: err.response.data
      })
      console.log(err.response)
      toast.error(err.response.data)
    }
  }

export const logoutUser = () => async dispatch => {
  try {
    dispatch({
      type: 'logoutUserRequest'
    })

    const data = await axios.get(`${server}/api/user/logout`, {
      withCredentials: true
    })

    console.log(`data: ${data}`)
    dispatch({
      type: 'logoutUserSuccess',
      payload: data
    })
    window.location.href = '/'
    console.log('User logging out...')
    toast.success('Logging out...')
  } catch (err) {
    dispatch({ type: 'logoutUserFail', payload: err.response })
    toast.error(err.response)
  }
}
