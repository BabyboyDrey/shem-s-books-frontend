import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { BsFillCheckCircleFill, BsTrashFill } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { AiFillEdit } from 'react-icons/ai'
import './DashboardContents.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  loadSeller,
  updateAccount,
  updateAddress,
  updatePassword,
  logoutSeller,
  deleteSeller
} from '../../../redux/actions/sellers.js'
import { createEvents } from '../../../redux/actions/event.js'
import { createProduct } from '../../../redux/actions/product.js'
import axios from 'axios'
import server from '../../../server'
import { toast } from 'react-toastify'
import Timer from '../Timer/Timer.jsx'
import Loading from '../../Loader/Loader'

const DashboardContents = ({ activeHeader }) => {
  return (
    <div className='dc-bg-container'>
      {activeHeader === 1 && <ProfileSettings />}
      {activeHeader === 2 && <CreateProduct />}
      {activeHeader === 3 && <CreateEvents />}
      {activeHeader === 4 && <RefundsRequests />}
      {activeHeader === 5 && <Withdrawals />}
      <Notifications />
      {activeHeader === 7 && <ProductSales />}
      {activeHeader === 8 && <AllProducts />}
      {activeHeader === 9 && <AllEvents />}
    </div>
  )
}

export default DashboardContents

const ProfileSettings = () => {
  const { seller } = useSelector(state => state.seller)
  const dispatch = useDispatch()

  const [shopEmail, setShopEmail] = useState(seller ? seller.shopEmail : '')
  const [shopName, setShopName] = useState(seller ? seller.shopName : '')
  const [shopNumber, setShopNumber] = useState(
    seller ? seller.shopNumber : null
  )
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [shopAddressName, setShopAddressName] = useState(
    seller ? seller.addresses?.shopAddressName : ''
  )
  const [shopCountry, setShopCountry] = useState(
    seller ? seller.addresses?.shopCountry : ''
  )
  const [shopState, setShopState] = useState(
    seller ? seller.addresses?.shopState : ''
  )
  const [shopZipCode, setShopZipCode] = useState(
    seller ? seller.addresses?.shopZipCode : ''
  )
  const [shopStreetAddress, setShopStreetAddress] = useState(
    seller ? seller.addresses?.shopStreetAddress : ''
  )
  const [avatar, setAvatar] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    if (
      (shopEmail !== '' && shopEmail !== seller.shopEmail) ||
      (shopName !== '' && shopName !== seller.shopName) ||
      (shopNumber !== null && shopNumber !== seller.shopNumber)
    ) {
      const items = {
        shopEmail: shopEmail === '' && seller?.shopEmail,
        shopName: shopName === '' && seller?.shopName,
        shopNumber: shopNumber === null && seller?.shopNumber
      }
      dispatch(updateAccount(items))
    }

    if (
      (shopAddressName !== '' &&
        shopAddressName !== seller?.addresses?.shopAddressName) ||
      (shopCountry !== '' && shopCountry !== seller?.addresses?.shopCountry) ||
      (shopState !== '' && shopState !== seller?.addresses?.shopState) ||
      (shopZipCode !== null &&
        shopZipCode !== seller?.addresses?.shopZipCode) ||
      (shopStreetAddress !== '' &&
        shopStreetAddress !== seller?.addresses?.shopStreetAddress)
    ) {
      dispatch(
        updateAddress(
          shopAddressName,
          shopCountry,
          shopState,
          shopZipCode,
          shopStreetAddress
        )
      )
    }

    if (oldPassword !== '' && newPassword !== '' && confirmNewPassword !== '') {
      dispatch(updatePassword(oldPassword, newPassword, confirmNewPassword))
    }

    if (avatar !== '') {
      try {
        const newForm = new FormData()

        newForm.append('avatar', avatar)

        const updateAvatar = async () => {
          await axios
            .post(`${server}/api/shop/update-avatar`, newForm, {
              withCredentials: true
            })
            .then(res => {
              toast.success('Avatar set')
            })
        }
        updateAvatar()
      } catch (err) {
        console.log(err)
        toast.error(err)
      }
    }
  }

  const handleDelete = e => {
    e.preventDefault()
    dispatch(deleteSeller())
  }

  const handleLogout = e => {
    e.preventDefault()
    dispatch(logoutSeller())
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className='dc-user-profile-form'>
          <div className='dc-flex-align-row'>
            <h3>Shop email address:</h3>{' '}
            <div>
              <input
                value={shopEmail}
                onChange={e => {
                  setShopEmail(e.target.value)
                }}
                type='text'
                placeholder='dare@gmail.com'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Shop name:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                value={shopName}
                onChange={e => {
                  setShopName(e.target.value)
                }}
                type='text'
                placeholder='dare@gmail.com'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Shop phone number:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                value={shopNumber}
                onChange={e => {
                  setShopNumber
                }}
                type='number'
                placeholder='090 XXXX XXXX'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Shop avatar:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                onChange={e => {
                  setAvatar(e.target.files[0])
                }}
                type='file'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3> Shop password:</h3>{' '}
            <div className='dc-user-profile-input-container'>
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
          <div className='dc-flex-align-row'>
            <h3>Shop address:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <div className='dc-user-profile-input-container'>
                <input
                  value={shopAddressName}
                  onChange={e => {
                    setShopAddressName(e.target.value)
                  }}
                  type='text'
                  placeholder='Address name'
                />
                <input
                  value={shopStreetAddress}
                  onChange={e => {
                    setShopStreetAddress(e.target.value)
                  }}
                  type='text'
                  placeholder='Street address'
                />
                <input
                  value={shopState}
                  onChange={e => {
                    setShopState(e.target.value)
                  }}
                  type='text'
                  placeholder='State name'
                />
                <input
                  value={shopCountry}
                  onChange={e => {
                    setShopCountry(e.target.value)
                  }}
                  type='text'
                  placeholder='Country'
                />
                <input
                  value={shopZipCode}
                  onChange={e => {
                    setShopZipCode(e.target.value)
                  }}
                  type='number'
                  placeholder='Zip code'
                />
              </div>
            </div>
          </div>
          <div className='dc-user-profile-form-button-container'>
            <button>Update</button>
          </div>
          <div className='dc-user-profile-form-delete-logout-button-container'>
            <button onClick={handleDelete}>Delete this account</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const CreateProduct = () => {
  const [bookTitle, setBookTitle] = useState('')
  const [bookDesc, setBookDesc] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorBio, setAuthorBio] = useState('')
  const [category, setCategory] = useState('')
  const [discountPrice, setDiscountPrice] = useState(null)
  const [currentPrice, setCurrentPrice] = useState(null)
  const [stock, setStock] = useState(null)
  const [images, setImages] = useState([])
  const dispatch = useDispatch()
  const { seller } = useSelector(state => state.seller)

  const handleSubmit = async e => {
    e.preventDefault()
    const newForm = new FormData()
    const shopId = seller.shopId
    images.forEach(image => {
      newForm.append('images', image)
    })
    newForm.append('bookTitle', bookTitle)
    newForm.append('bookDesc', bookDesc)
    newForm.append('authorName', authorName)
    newForm.append('authorBio', authorBio)
    newForm.append('category', category)
    newForm.append('discountPrice', discountPrice)
    newForm.append('currentPrice', currentPrice)
    newForm.append('stock', stock)
    newForm.append('shopId', shopId)

    dispatch(createProduct(newForm))
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className='dc-user-profile-form'>
          <div className='dc-flex-align-row'>
            <h3>Book title:</h3>{' '}
            <div>
              <input
                onChange={e => {
                  setBookTitle(e.target.value)
                }}
                value={bookTitle}
                type='text'
                placeholder='dare@gmail.com'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Book description:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <textarea
                onChange={e => setBookDesc(e.target.value)}
                rows='10'
                cols='20'
                type='text'
                value={bookDesc}
                placeholder='dare@gmail.com'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Book author:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                onChange={e => setAuthorName(e.target.value)}
                type='text'
                value={authorName}
                placeholder='Enter author name'
              />
              <textarea
                onChange={e => setAuthorBio(e.target.value)}
                rows='10'
                cols='20'
                type='text'
                value={authorBio}
                placeholder='Enter author biography'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Book current price:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                onChange={e => setCurrentPrice(e.target.value)}
                type='number'
                value={currentPrice}
                placeholder='Enter current book price'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Book discount price:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                onChange={e => setDiscountPrice(e.target.value)}
                type='number'
                value={discountPrice}
                placeholder='Enter former book price'
              />
            </div>
          </div>
          <div className='im-dc-flex-align-row'>
            <h3>Book images:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                onChange={e => {
                  let files = Array.from(e.target.files)
                  setImages(prevImages => [...prevImages, ...files])
                }}
                className='files-images'
                type='file'
                multiple
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Book stock:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                onChange={e => setStock(e.target.value)}
                type='number'
                value={stock}
                placeholder='Enter book stock'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Book category:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                onChange={e => setCategory(e.target.value)}
                type='text'
                value={category}
                placeholder='Enter book category'
              />
            </div>
          </div>
          <div className='dc-user-profile-form-button-container'>
            <button type='submit'>Create product</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const CreateEvents = () => {
  const [images, setImages] = useState([])
  const [eventName, setEventName] = useState('')
  const [eventDesc, setEventDesc] = useState('')
  const [category, setCategory] = useState('')
  const [currentPrice, setCurrentPrice] = useState(null)
  const [discountPrice, setDiscountPrice] = useState(null)
  const [stock, setStock] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const { seller } = useSelector(state => state.seller)

  const dispatch = useDispatch()

  const handleStartDateChange = e => {
    const startDate = new Date(e.target.value)
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
    setStartDate(startDate)
    setEndDate(null)
    document.getElementById('end-date').min = minEndDate
      .toISOString()
      .slice(0, 10)
  }

  const today = new Date().toISOString().slice(0, 10)

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : ''

  const handleEndDateChange = e => {
    const endDate = new Date(e.target.value)
    setEndDate(endDate)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const newForm = new FormData()

    images.forEach(image => {
      newForm.append('images', image)
    })

    newForm.append('eventName', eventName)
    newForm.append('eventDesc', eventDesc)
    newForm.append('sellerName', seller.shopName)
    newForm.append('sellerShopId', seller.shopId)
    newForm.append('stock', stock)
    newForm.append('currentPrice', currentPrice)
    newForm.append('discountPrice', discountPrice)
    newForm.append('startDate', startDate.toISOString())
    newForm.append('endDate', endDate.toISOString())

    dispatch(createEvents(newForm))
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className='dc-user-profile-form'>
          <div className='im-dc-flex-align-row'>
            <h3>Book images:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                onChange={e => {
                  let files = Array.from(e.target.files)
                  setImages(prevImages => [...prevImages, ...files])
                }}
                className='files-images'
                type='file'
                multiple
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Event name:</h3>{' '}
            <div>
              <input
                value={eventName}
                onChange={e => setEventName(e.target.value)}
                type='text'
                placeholder='Eg: Mr Pebbles'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Event description:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <textarea
                rows='10'
                cols='20'
                type='text'
                placeholder='dare@gmail.com'
                value={eventDesc}
                onChange={e => setEventDesc(e.target.value)}
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Book category:</h3>{' '}
            <div>
              <input
                value={category}
                onChange={e => setCategory(e.target.value)}
                type='text'
                placeholder='fiction'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Stock:</h3>{' '}
            <div>
              <input
                value={stock}
                onChange={e => setStock(e.target.value)}
                type='stock'
                placeholder='Enter event stock'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Event start date:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                id='start-date'
                min={today}
                value={startDate ? startDate.toISOString().slice(0, 10) : ''}
                placeholder='Enter your event start date'
                onChange={e => handleStartDateChange(e)}
                type='date'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Event end date:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                min={minEndDate}
                value={endDate ? endDate.toISOString().slice(0, 10) : ''}
                placeholder='Enter your event end date'
                onChange={e => handleEndDateChange(e)}
                id='end-date'
                type='date'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Book price:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                value={currentPrice}
                onChange={e => setCurrentPrice(e.target.value)}
                type='number'
                placeholder='Enter book price'
              />
            </div>
          </div>
          <div className='dc-flex-align-row'>
            <h3>Book discount price:</h3>{' '}
            <div className='dc-user-profile-input-container'>
              <input
                value={discountPrice}
                onChange={e => setDiscountPrice(e.target.value)}
                type='number'
                placeholder='Enter book discount price'
              />
            </div>
          </div>
          <div className='dc-user-profile-form-button-container'>
            <button type='submit'>Create event</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const RefundsRequests = () => {
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      minWidth: 70,
      flex: 0.8,
      type: 'text'
    },
    {
      field: 'buyerName',
      headerName: "Buyer's name",
      minWidth: 130,
      flex: 0.8,
      type: 'text'
    },
    {
      field: 'productBought',
      headerName: 'Product bought',
      minWidth: 130,
      flex: 0.8,
      type: 'text'
    },
    {
      field: 'productQtyBought',
      headerName: 'Product qty bought',
      minWidth: 130,
      flex: 0.8,
      type: 'number'
    },
    {
      field: 'complaint',
      headerName: 'Complaint',
      minWidth: 130,
      flex: 0.8,
      type: 'text'
    },
    {
      field: 'dateBought',
      headerName: 'Date bought',
      minWidth: 130,
      flex: 0.8,
      type: 'number'
    },
    {
      field: 'totalPrice',
      headerName: 'Total price',
      minWidth: 130,
      flex: 0.8,
      type: 'number'
    },
    {
      field: 'approve',
      headerName: 'Approve',
      minWidth: 130,
      flex: 2,
      sortable: false,
      renderCell: () => {
        return (
          <Button>
            {' '}
            <BsFillCheckCircleFill />
          </Button>
        )
      }
    },
    {
      field: 'decline',
      headerName: 'Decline',
      minWidth: 130,
      flex: 2,
      sortable: false,
      renderCell: () => {
        return (
          <Button>
            {' '}
            <IoMdClose />
          </Button>
        )
      }
    }
  ]

  const rows = [
    {
      id: '123',
      buyerName: 'dare',
      productBought: 'His landing',
      productQtyBought: 12,
      complaint: 'absolute rubbish, want money back now',
      dateBought: 12 - 23 - 12,
      totalPrice: 12000
    }
  ]

  return (
    <div className='data-grid-bg-of-container'>
      <div className='data-grid-container'>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  )
}

const Withdrawals = () => {
  return (
    <div className='withdrawals-bg-container'>
      <div className='amount-made-container'>
        <span>Amount made:</span>
        <div>
          <h3>N12,000</h3>
        </div>
      </div>
      <button>Withdraw</button>
    </div>
  )
}

const Notifications = () => {
  return
}

const ProductSales = () => {
  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 130, type: 'text' },
    {
      field: 'productName',
      headerName: 'Book name',
      minWidth: 130,
      type: 'text'
    },
    {
      field: 'productQty',
      headerName: 'Book quantity',
      minWidth: 130,
      type: 'number'
    },
    {
      field: 'amountMade',
      headerName: 'Amount made',
      minWidth: 130,
      type: 'number'
    },
    {
      field: 'totalMade',
      headerName: 'Total made',
      minWidth: 130,
      type: 'number'
    }
  ]

  const rows = [
    {
      id: '1wse3',
      productName: 'sheilings',
      productQty: 123,
      amountMade: 11000,
      totalMade: 23000
    }
  ]

  return (
    <div className='data-grid-bg-of-container'>
      <div className='data-grid-container'>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  )
}

const AllProducts = () => {
  const [books, setBooks] = useState([])
  const [booksLoaded, setBooksLoaded] = useState(false)
  const [stock, setStock] = useState(new Array(books.length).fill(null))
  const [editPopups, setEditPopups] = useState([])

  const fetchData = async () => {
    try {
      setBooksLoaded(false)
      const res = await axios.get(`${server}/api/shop/all-shop-products`, {
        withCredentials: true
      })
      setBooks(res.data)
      setEditPopups(new Array(res.data.length).fill(false))
      setBooksLoaded(true)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const toggleEditPopup = index => {
    const updatedEditPopups = [...editPopups]
    updatedEditPopups[index] = !updatedEditPopups[index]
    setEditPopups(updatedEditPopups)
  }

  const handleSubmit = async (e, bookId, index) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${server}/api/book/edit-stock/${bookId}`,
        {
          stock: stock[index]
        },
        { withCredentials: true }
      )

      if (response.data.success) {
        const updatedBooks = [...books]
        updatedBooks[index].stock = stock[index]
        setBooks(updatedBooks)
        toast.success('Book stock updated')
      } else {
        toast.error('Failed to update stocks')
      }

      const bookIndex = books.findIndex(book => book._id === bookId)
      if (bookIndex !== -1) {
        toggleEditPopup(bookIndex)
      }
    } catch (err) {
      toast.error(err)
      console.log(err)
    }
  }

  const handleStockChange = (e, index) => {
    e.preventDefault()
    const updateStock = [...stock]
    updateStock[index] = e.target.value
    setStock(updateStock)
  }

  const handleDeleteBook = async (e, bookId, index) => {
    try {
      const response = await axios.delete(
        `${server}/api/book/delete-product/${bookId}`,
        {
          withCredentials: true
        }
      )

      if (response.data.success) {
        const updatedBooks = [...books]
        updatedBooks = updatedBooks.filter(book => {
          return book._id !== bookId
        })
        setBooks(updatedBooks)
        toast.success('Book deleted')
      } else {
        toast.error('Failed to update deleted book')
      }
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className='all-products-container'>
      {booksLoaded === false ? (
        <div>
          <Loading />
        </div>
      ) : books.length >= 1 ? (
        books.map((book, index) => (
          <div key={index} className='single-product-container'>
            <div className='product-image-container'>
              <img src={`${server}/${book.bookImages[0]}`} alt='' />
            </div>
            <div className='product-book-container'>
              <h3>{book.bookTitle}</h3>
            </div>
            <div className='product-stock-edit-container'>
              <h3>Stock: {book.stock}</h3>
              <AiFillEdit
                onClick={() => {
                  toggleEditPopup(index)
                }}
                className='product-edit-icon'
              />
              {editPopups[index] && (
                <div className='edit-popup-container'>
                  <div className='product-edit-x-container'>
                    <IoMdClose
                      className='product-edit-x-icon'
                      onClick={() => {
                        toggleEditPopup(index)
                      }}
                    />
                  </div>
                  <div className='product-stock-container'>
                    <h3>Stock:</h3>
                    <input
                      type='number'
                      placeholder={book.stock}
                      // value={stock}
                      onChange={e => {
                        handleStockChange(e, index)
                      }}
                    />
                  </div>
                  <button
                    type='submit'
                    onClick={e => handleSubmit(e, book._id, index)}
                  >
                    Update stock
                  </button>
                </div>
              )}
            </div>
            <div className='product-delete-container'>
              <BsTrashFill
                onClick={e => handleDeleteBook(e, book._id, index)}
                className='product-delete-icon'
              />
            </div>
          </div>
        ))
      ) : (
        <div>Shop hasn't created any products</div>
      )}
    </div>
  )
}

const AllEvents = () => {
  const [editPopup, setEditPopUp] = useState(false)
  const [eventsLoaded, setEventsLoaded] = useState(false)
  const [shopEvents, setShopEvents] = useState([])

  useEffect(() => {
    fecthEventsData()
  }, [])

  const fecthEventsData = async () => {
    await axios
      .get(`${server}/api/event/get-shop-events`, { withCredentials: true })
      .then(res => {
        setShopEvents(res.data)
        setEventsLoaded(true)
      })
      .catch(err => {
        console.log(err)
        toast.error(err)
      })
  }

  const handleDelete = async (e, eventId) => {
    setEventsLoaded(false)
    await axios
      .delete(`${server}/api/event/delete-event/${eventId}`)
      .then(res => {
        const newShopEvents = [...shopEvents]
        const data = newShopEvents.filter(event => {
          return event._id !== eventId
        })
        setShopEvents(data)
        setEventsLoaded(true)
        toast.success('Events Deleted')
      })
      .catch(err => {
        toast.error(err)
      })
  }

  return (
    <div className='all-products-container'>
      {eventsLoaded === false ? (
        <div>
          <Loading />
        </div>
      ) : shopEvents.length > 0 ? (
        shopEvents.map(event => (
          <div className='single-product-container' key={event._id}>
            <div className='product-image-container'>
              {event.eventImages?.[0] && (
                <img src={`${server}/${event.eventImages[0]}`} alt='image' />
              )}
            </div>
            <div className='product-book-container'>
              <h3>{event.eventName}</h3>
            </div>
            <div className='product-stock-edit-container'>
              {event.endDate && (
                <h3>
                  <Timer data={event} />
                </h3>
              )}
            </div>
            <div className='product-delete-container'>
              <BsTrashFill
                onClick={e => handleDelete(e, event._id)}
                className='product-delete-icon'
              />
            </div>
          </div>
        ))
      ) : (
        <div>Shop has not created an event yet</div>
      )}
    </div>
  )
}
