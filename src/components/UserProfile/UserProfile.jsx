import React, { useState, useEffect } from 'react'
import './UserProfile.css'
import { FaRegUser } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { BiShoppingBag } from 'react-icons/bi'
import { HiOutlineCash } from 'react-icons/hi'
import { AiOutlineArrowRight, AiOutlineHeart } from 'react-icons/ai'
import { BsCreditCard } from 'react-icons/bs'
import { DataGrid } from '@mui/x-data-grid'
import orderData from '../../order.js'
import { Button } from '@mui/material'
import ProductCard from '../ProductCard/ProductCard'
import axios from 'axios'
import server from '../../server'
import { toast } from 'react-toastify'
import {
  updatePasswords,
  updateAddresses,
  loadUser,
  deleteUser,
  logoutUser
} from '../../redux/actions/users.js'
import { useDispatch, useSelector } from 'react-redux'

const UserProfile = () => {
  const { user } = useSelector(state => state.user)

  const [activeCell, setActiveCell] = useState(1)
  return (
    <div className='main-bg-profile-container'>
      <div className='sidebar-headers-container'>
        <div className='user-in-profile-bg-container'>
          <div
            className='user-profile-container'
            style={{ padding: user?.avatar && '0' }}
          >
            {user?.avatar ? (
              <img
                className='img-avatar'
                src={`${server}/${user?.avatar}`}
                alt='avatar'
                loading='lazy'
              />
            ) : (
              <FaRegUser className='user-profile-icon' />
            )}
          </div>
          <h3>Hi {user?.firstName}</h3>
        </div>
        <hr className='user-profile-hr' />

        <div
          onClick={() => {
            setActiveCell(1)
          }}
          className={`user-profile-edit-profile-container ${
            activeCell === 1 && 'clicked'
          }`}
        >
          <div>
            <FiSettings className='profile-icon user-profile-settings-icon' />
          </div>
          <h3>Edit profile</h3>
          <h5>Edit profile</h5>
        </div>
        <div
          onClick={() => {
            setActiveCell(2)
          }}
          className={`user-profile-orders-container ${
            activeCell === 2 && 'clicked'
          }`}
        >
          <div>
            <BiShoppingBag className='profile-icon user-profile-orders-icon' />
          </div>
          <h3>Your orders</h3>
          <h5>Your orders</h5>
        </div>
        <div
          onClick={() => {
            setActiveCell(3)
          }}
          className={`user-profile-refunds-container ${
            activeCell === 3 && 'clicked'
          }`}
        >
          <div>
            <HiOutlineCash className='profile-icon user-profile-refunds-icon' />
          </div>
          <h3>Refunds</h3>
          <h5>Refunds</h5>
        </div>
        <div
          onClick={() => {
            setActiveCell(4)
          }}
          className={` user-profile-wishlist-container ${
            activeCell === 4 && 'clicked'
          }`}
        >
          <div>
            <AiOutlineHeart className='profile-icon user-profile-wishlist-icon' />
          </div>
          <h3>Your wishlist</h3>
          <h5>Your wishlist</h5>
        </div>
        <div
          onClick={() => {
            setActiveCell(5)
          }}
          className={`user-profile-payments-container ${
            activeCell === 5 && 'clicked'
          }`}
        >
          <div>
            <BsCreditCard className='profile-icon user-profile-payments-icon' />
          </div>
          <h3>Payment methods</h3>
          <h5>Payment methods</h5>
        </div>
      </div>
      <div className='sidebar-content-container-bg'>
        <div
          className={`sidebar-content-container ${
            activeCell === 2 && 'order-cell'
          }`}
        >
          {activeCell === 1 && <UserProfileSettings />}
          {activeCell === 2 && <UserProfileOrders />}
          {activeCell === 3 && <UserProfileRefunds />}
          {activeCell === 4 && <UserProfileWishlist />}
          {activeCell === 5 && <UserProfilePaymentMethods />}
        </div>
      </div>
    </div>
  )
}

export default UserProfile

const UserProfileSettings = () => {
  const { user } = useSelector(state => state.user)

  const [addressType, setAddressType] = useState(
    user?.addresses[0]?.addressType
      ? user?.addresses[0]?.addressType
      : 'default'
  )
  const [country, setCountry] = useState(
    user?.addresses[0]?.country ? user?.addresses[0]?.country : ''
  )
  const [state, setState] = useState(
    user?.addresses[0]?.state ? user?.addresses[0]?.state : ''
  )
  const [streetName, setStreetName] = useState(
    user?.addresses[0]?.streetName ? user?.addresses[0]?.streetName : ''
  )
  const [houseNumber, setHouseNumber] = useState(
    user?.addresses[0]?.houseNumber ? user?.addresses[0]?.houseNumber : null
  )
  const [zipCode, setZipCode] = useState(
    user?.addresses[0]?.zipCode ? user?.addresses[0]?.zipCode : null
  )
  const [email, setEmail] = useState(user?.email)
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [avatar, setAvatar] = useState(user ? user?.avatar : '')
  const dispatch = useDispatch()

  // https://analytics.google.com/analytics/web/#/p403135582/reports/explorer?params=_r.explorerCard..selmet%3D%5B%22screenPageViews%22%5D%26_r.explorerCard..seldim%3D%5B%22unifiedScreenClass%22%5D&r=all-pages-and-screens

  const handleDelete = e => {
    e.preventDefault()

    dispatch(deleteUser())
  }
  const handleLogout = e => {
    e.preventDefault()
    dispatch(logoutUser())
  }
  const handleSubmit = async e => {
    e.preventDefault()

    const newForm = new FormData()

    newForm.append('avatar', avatar)

    if (firstName !== '' || lastName !== '' || email !== '') {
      try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }

        const updateData = {
          firstName,
          lastName,
          email
        }
        await axios
          .put(`${server}/api/user/update`, updateData, config)
          .then(res => {
            console.log(res.data)
            dispatch(loadUser())
            toast.success('Account successfully updated')
          })
      } catch (err) {
        console.log(err.response)
        toast.error(err.response)
      }
    }

    if (
      country !== '' ||
      state !== '' ||
      streetName !== '' ||
      houseNumber !== null ||
      zipCode !== null
    ) {
      try {
        dispatch(
          updateAddresses(
            addressType,
            country,
            state,
            streetName,
            houseNumber,
            zipCode
          )
        )
        console.log(
          addressType,
          country,
          state,
          streetName,
          houseNumber,
          zipCode
        )
      } catch (err) {
        console.log(err.response.data)
      }
    }

    if (oldPassword !== '' || newPassword !== '' || confirmNewPassword !== '') {
      try {
        dispatch(updatePasswords(oldPassword, newPassword, confirmNewPassword))
      } catch (err) {
        console.log(err)
        toast.error(err)
      }
    }

    if (avatar !== '') {
      try {
        const res = await axios.put(
          `${server}/api/user/update-avatar`,
          newForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
          }
        )

        toast.success('Avatar set')
      } catch (err) {
        toast.error(`Err in frontend: ${err.response.data}`)
        console.log(err)
      }
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className='user-profile-form'>
          <div className='flex-align-row'>
            <h3>Email address:</h3>{' '}
            <div>
              <input
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                }}
                type='text'
                placeholder='dare@gmail.com'
              />
            </div>
          </div>
          <div className='flex-align-row'>
            <h3>First name:</h3>{' '}
            <div className='user-profile-input-container'>
              <input
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value)
                }}
                type='text'
                placeholder='dare@gmail.com'
              />
            </div>
          </div>
          <div className='flex-align-row'>
            <h3>Last name:</h3>{' '}
            <div className='user-profile-input-container'>
              <input
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value)
                }}
                type='text'
                placeholder='dare@gmail.com'
              />
            </div>
          </div>
          <div className='flex-align-row'>
            <h3>Password:</h3>{' '}
            <div className='user-profile-input-container'>
              <input
                value={oldPassword}
                onChange={e => {
                  setOldPassword(e.target.value)
                }}
                type='password'
                placeholder='Old password'
              />
              <input
                value={newPassword}
                onChange={e => {
                  setNewPassword(e.target.value)
                }}
                type='password'
                placeholder='New password'
              />
              <input
                value={confirmNewPassword}
                onChange={e => {
                  setConfirmNewPassword(e.target.value)
                }}
                type='password'
                placeholder='Confirm new password'
              />
            </div>
          </div>
          <div className='flex-align-row'>
            <h3>Avatar:</h3>{' '}
            <div className='user-profile-input-container'>
              <input
                onChange={e => {
                  setAvatar(e.target.files[0])
                }}
                type='file'
              />
            </div>
          </div>
          <div className='flex-align-row'>
            <h3>Address:</h3>{' '}
            <div className='user-profile-input-container'>
              <select
                onChange={e => {
                  setAddressType(e.target.value)
                }}
                value={addressType}
              >
                <option value='default'>Default</option>
                <option value='home'>Home</option>
                <option value='office'>Office</option>
              </select>
              <div className='user-profile-input-container'>
                <input
                  onChange={e => {
                    setStreetName(e.target.value)
                  }}
                  value={streetName}
                  type='text'
                  placeholder='Street name'
                />
                <input
                  onChange={e => {
                    setHouseNumber(e.target.value)
                  }}
                  value={houseNumber}
                  type='number'
                  placeholder='House number'
                />
                <input
                  onChange={e => {
                    setState(e.target.value)
                  }}
                  value={state}
                  type='text'
                  placeholder='State'
                />
                <input
                  onChange={e => {
                    setCountry(e.target.value)
                  }}
                  value={country}
                  type='text'
                  placeholder='Country'
                />
                <input
                  onChange={e => {
                    setZipCode(e.target.value)
                  }}
                  value={zipCode}
                  type='number'
                  placeholder='Zip code'
                />
              </div>
            </div>
          </div>
          <div className='user-profile-form-button-container'>
            <button type='submit'>Update</button>
          </div>
          <div className='user-profile-form-delete-logout-button-container'>
            <button onClick={handleDelete}>Delete this account</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const UserProfileOrders = () => {
  const columns = [
    { filed: 'id', headerName: 'Order Id', minWidth: 130, flex: 0.8 },
    {
      field: 'productName',
      headerName: 'Product name',
      minWidth: 130,
      flex: 0.7
    },
    {
      field: 'productNumber',
      headerName: 'Product number',
      minwidth: 130,
      type: 'number',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,

      width: 200,

      flex: 0.7,
      cellClassName: params => {
        return params.row.status === 'Delivered' ? 'greenColor' : 'redColor'
      }
    },
    {
      field: 'assumedDateOfDelivery',
      headerName: 'Date of delivery',
      minWidth: 130,
      flex: 0.7
    },
    {
      field: 'total',
      headerName: 'Total',
      minWidth: 130,
      type: 'number',
      flex: 0.7
    },
    {
      field: '',
      flex: 1,
      minWidth: 130,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: params => {
        return (
          <>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </>
        )
      }
    }
  ]

  const rows = []

  if (orderData && orderData.cart && Array.isArray(orderData.cart)) {
    orderData.cart.forEach(item => {
      rows.push({
        id: orderData._id,
        productName: item.name, // Check if item is defined before accessing 'name'
        productNumber: item.quantity, // Check if item is defined before accessing 'quantity'
        status: orderData.status,
        total: orderData.total_price
      })
    })
  }

  return (
    <div className='data-grid-bg-of-container'>
      <div className='data-grid-container'>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  )
}
const UserProfileRefunds = () => {
  const columns = [
    { filed: 'id', headerName: 'Order Id', minWidth: 130, flex: 0.8 },
    {
      field: 'productName',
      headerName: 'Product name',
      minWidth: 130,
      flex: 0.7
    },
    {
      field: 'productNumber',
      headerName: 'Product number',
      minwidth: 130,
      type: 'number',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,

      width: 200,

      flex: 0.7,
      cellClassName: params => {
        return params.row.status === 'Delivered' ? 'greenColor' : 'redColor'
      }
    },
    {
      field: 'assumedDateOfDelivery',
      headerName: 'Date of delivery',
      minWidth: 130,
      flex: 0.7
    },
    {
      field: 'total',
      headerName: 'Total',
      minWidth: 130,
      type: 'number',
      flex: 0.7
    },
    {
      field: '',
      flex: 1,
      minWidth: 130,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: params => {
        return (
          <>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </>
        )
      }
    }
  ]

  const rows = []

  if (orderData && orderData.cart && Array.isArray(orderData.cart)) {
    orderData.cart.forEach(item => {
      rows.push({
        id: orderData._id,
        productName: item.name, // Check if item is defined before accessing 'name'
        productNumber: item.quantity, // Check if item is defined before accessing 'quantity'
        status: orderData.status,
        total: orderData.total_price
      })
    })
  }

  return (
    <div className='data-grid-bg-of-container'>
      <div className='data-grid-container'>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  )
}
const UserProfileWishlist = () => {
  const { wishlist } = useSelector(state => state.wishlist)
  const { user } = useSelector(state => state.user)
  const [wishlistData, setWishlistData] = useState([])

  useEffect(() => {
    if (user && wishlist) {
      const foundData = wishlist.find(w => {
        w.userEmail === user.email
      })

      if (foundData) {
        setWishlistData(foundData)
      }
    }
  }, [user, wishlist])
  return (
    <div>
      <div className='user-profile-product-card-container'>
        {wishlistData ? (
          wishlist.map(w => <ProductCard product={w} />)
        ) : (
          <div>No liked books</div>
        )}
      </div>
    </div>
  )
}

const UserProfilePaymentMethods = () => {
  const columns = [
    { filed: 'id', headerName: 'Order Id', minWidth: 130, flex: 0.8 },
    {
      field: 'productName',
      headerName: 'Product name',
      minWidth: 130,
      flex: 0.7
    },
    {
      field: 'productNumber',
      headerName: 'Product number',
      minwidth: 130,
      type: 'number',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,

      width: 200,

      flex: 0.7,
      cellClassName: params => {
        return params.row.status === 'Delivered' ? 'greenColor' : 'redColor'
      }
    },
    {
      field: 'assumedDateOfDelivery',
      headerName: 'Date of delivery',
      minWidth: 130,
      flex: 0.7
    },
    {
      field: 'total',
      headerName: 'Total',
      minWidth: 130,
      type: 'number',
      flex: 0.7
    },
    {
      field: '',
      flex: 1,
      minWidth: 130,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: params => {
        return (
          <>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </>
        )
      }
    }
  ]

  const rows = []

  if (orderData && orderData.cart && Array.isArray(orderData.cart)) {
    orderData.cart.forEach(item => {
      rows.push({
        id: orderData._id,
        productName: item.name, // Check if item is defined before accessing 'name'
        productNumber: item.quantity, // Check if item is defined before accessing 'quantity'
        status: orderData.status,
        total: orderData.total_price
      })
    })
  }

  return (
    <div className='data-grid-bg-of-container'>
      <div className='data-grid-container'>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  )
}
