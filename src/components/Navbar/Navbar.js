import React, { useState, useEffect, useRef } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './Navbar.css'
import { BiTrash } from 'react-icons/bi'
import server from '../../server'
import axios from 'axios'
import { addToCart, removeFromCart } from '../../redux/actions/cart'

const Navbar = ({ active, setActive }) => {
  const [hamburgerClicked, setHamburgerClicked] = useState(false)
  const [closing, setClosing] = useState(false)
  const [open, setOpen] = useState(false)
  const { user } = useSelector(state => state.user)
  const bgIcyRef = useRef(null)
  const icyTwoRef = useRef(null)
  const [cartData, setCartData] = useState([])
  const [itemQuantities, setItemQuantities] = useState([])
  const [totalPrice, setTotalPrice] = useState([])
  const [sellerNames, setSellerNames] = useState(
    cartData && Array.from(cartData)
  )
  const { cart } = useSelector(state => state.cart)
  const [checkOutTotalPrice, setCheckOutTotalPrice] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    if (cartData) {
      const initialQties = cartData.map(item => item.qty)

      setItemQuantities(initialQties)
    }
  }, [cartData])

  const updateQuantity = (itemId, newQuantity) => {
    const updatedItemQuantities = [...itemQuantities]

    const itemIndex = cartData.findIndex(item => item._id === itemId)

    if (itemIndex !== -1) {
      updatedItemQuantities[itemIndex] = newQuantity

      const updatedCart = [...cartData]

      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        qty: newQuantity,
        totalProductPrice: newQuantity * updatedCart[itemIndex].discountPrice
      }

      dispatch(addToCart(updatedCart[itemIndex]))
      setItemQuantities(updatedItemQuantities)
    }
  }

  const increaseQuantity = itemId => {
    const itemIndex = cartData.findIndex(item => item._id === itemId)

    if (
      itemIndex !== -1 &&
      itemQuantities[itemIndex] < cartData[itemIndex].stock
    ) {
      const newQuantity = itemQuantities[itemIndex] + 1

      updateQuantity(itemId, newQuantity)
    } else {
      toast.error('Stock limit reached')
    }
  }

  const decreaseQuantity = itemId => {
    const itemIndex = cartData.findIndex(item => item._id === itemId)
    if (itemIndex !== -1 && itemQuantities[itemIndex] > 1) {
      const newQuantity = itemQuantities[itemIndex] - 1
      updateQuantity(itemId, newQuantity)
    }
  }

  const toggleNav = () => {
    if (hamburgerClicked === false) {
      setHamburgerClicked(true)
      setClosing(false)
    } else {
      setClosing(true)
      setTimeout(() => {
        setHamburgerClicked(false)
        setClosing(false)
      }, 700)
    }
  }

  useEffect(() => {
    if (cartData) {
      cartData.forEach((c, index) => {
        if (c.shopId) {
          axios.get(`${server}/api/shop/getSellerNames/${c.shopId}`).then(r => {
            const updatedSellerNames = [...sellerNames]
            updatedSellerNames[index] = r
            setSellerNames(updatedSellerNames)
          })
        }
      })
    }
  }, [cartData])

  useEffect(() => {
    setCartData(cart)
  }, [user, cart])

  useEffect(() => {
    if (open === false) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [open])

  useEffect(() => {
    if (hamburgerClicked === false) {
      if (open === true) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    } else {
      document.body.style.overflow = 'hidden'
      bgIcyRef.current.addEventListener('click', () => {
        setHamburgerClicked(false)
        bgIcyRef.current.removeEventListener('click', () => {})
      })
    }
  }, [hamburgerClicked])

  useEffect(() => {
    if (itemQuantities.length > 0 && cartData) {
      const finalPrice = cartData.map((item, index) => {
        return item.discountPrice * itemQuantities[index]
      })

      setTotalPrice(finalPrice)
    }
  }, [cartData, itemQuantities])

  useEffect(() => {
    if (totalPrice) {
      const total = totalPrice.reduce((avg, i) => {
        return (avg += i)
      }, 0)
      setCheckOutTotalPrice(total)
    }
  }, [totalPrice])

  return (
    <>
      <div className='bg-container'>
        <div className='navbar-container'>
          <Link
            to='/profile'
            style={{
              textDecoration: 'none',
              zIndex: hamburgerClicked === true ? 1000 : 'auto'
            }}
          >
            <div
              onClick={() => setHamburgerClicked(false)}
              className='user-container'
              style={{ padding: user?.avatar && '6.5px' }}
            >
              {user?.avatar ? (
                <img className='img-avatar' src={`${server}/${user?.avatar}`} />
              ) : (
                <FaRegUser className='user-icon' />
              )}
            </div>
          </Link>
          <div className='nav-links'>
            <Link style={{ textDecoration: 'none' }} to='/'>
              <h3
                onClick={() => setActive(1)}
                className={`h3 ${active === 1 && 'cell-active'}`}
              >
                Home
              </h3>
            </Link>
            <Link style={{ textDecoration: 'none' }} to='/categories'>
              <h3
                onClick={() => setActive(2)}
                className={`h3 ${active === 2 && 'cell-active'}`}
              >
                Categories
              </h3>
            </Link>
            <Link style={{ textDecoration: 'none' }} to='/best-selling'>
              <h3
                onClick={() => setActive(3)}
                className={`h3 ${active === 3 && 'cell-active'}`}
              >
                Best Selling
              </h3>
            </Link>
            <Link style={{ textDecoration: 'none' }} to='/all-events'>
              <h3
                onClick={() => setActive(4)}
                className={`h3 ${active === 4 && 'cell-active'}`}
              >
                Events
              </h3>
            </Link>
            <Link style={{ textDecoration: 'none' }} to='/most-affordable'>
              <h3
                onClick={() => {
                  setActive(5)
                }}
                className={`h3 ${active === 5 && 'cell-active'}`}
              >
                Most affordable
              </h3>
            </Link>
            <div onClick={toggleNav} className='hamburger-container'>
              {hamburgerClicked === true ? (
                <IoMdClose className='hamburger hamburger-x-icon' />
              ) : (
                <RxHamburgerMenu className='hamburger' />
              )}
            </div>
          </div>
          <div
            onClick={() => {
              setHamburgerClicked(false)
              setOpen(true)
            }}
            className='cart-container'
          >
            <span>{cartData?.length}</span>
            <AiOutlineShoppingCart className='cart-icon' />
          </div>
        </div>
        <div
          style={{ display: open === false ? 'none' : 'block' }}
          className='icy-two-bg'
        >
          <div
            style={{ display: open === false ? 'none' : 'block' }}
            className='cart-checkout-container'
          >
            <div className='x-container'>
              <IoMdClose
                className='cart-x-icon'
                onClick={() => setOpen(false)}
              />{' '}
            </div>
            <div className='cart-items-container-bg'>
              {cartData.length > 0 ? (
                cartData.map((i, index) => (
                  <div key={i._id} className='cart-item-container'>
                    <div className='count-container'>
                      <span
                        onClick={() => increaseQuantity(i._id)}
                        className='quantity-button'
                      >
                        +
                      </span>
                      <span>{itemQuantities[index]}</span>
                      <span
                        onClick={() => decreaseQuantity(i._id)}
                        className='quantity-button'
                      >
                        -
                      </span>
                    </div>
                    <div className='cart-img-container'>
                      {i && (
                        <img
                          src={`${server}/${i.bookImages && i?.bookImages[0]}`}
                          alt='Image'
                        />
                      )}
                    </div>
                    <div className='cart-product-details-container'>
                      <div className='cart-product-title-container'>
                        <h3>{i?.bookTitle}</h3>
                      </div>
                      <div className='cart-seller-name-plus-stock-container'>
                        <h3>{sellerNames[index]?.data}</h3>
                        <h3>In Stock: {i.stock}</h3>
                      </div>
                      <div className='price-X-count-container'>
                        <span>N{i?.discountPrice}</span>
                        <span>X {itemQuantities[index]}</span>
                      </div>
                      <div className='cart-total-price-container'>
                        <h3>N{totalPrice[index]}</h3>
                      </div>
                      <div
                        onClick={() => dispatch(removeFromCart(i))}
                        className='cart-delete-button-container'
                      >
                        <h3>
                          <BiTrash />
                          Remove Item
                        </h3>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No items in cart</div>
              )}
            </div>
            <Link
              style={{
                textDecoration: 'none'
              }}
              to='/checkout'
            >
              <div className='checkout-button-container'>
                <h3 className='checkout-button'>
                  Checkout N{`(${checkOutTotalPrice})`}
                </h3>
              </div>
            </Link>
          </div>
        </div>
        <span
          style={{ display: open === false ? 'none' : 'block' }}
          onClick={() => {
            setOpen(false)
          }}
          ref={icyTwoRef}
          className='icyTwo'
        ></span>
      </div>

      {hamburgerClicked === true && (
        <div style={{ position: 'relative' }} className='bg-icy-bg'>
          <div
            className={`navbar-links-popup-bg ${
              closing === true && 'closingtab'
            }`}
          >
            <div
              className={`navbar-links-popup ${closing === true && 'closing'}`}
            >
              {' '}
              <Link style={{ textDecoration: 'none' }} to='/'>
                <h2
                  onClick={() => setActive(1)}
                  className={` ${active === 1 && 'cell-active'} h2`}
                >
                  Home
                </h2>
              </Link>
              <Link style={{ textDecoration: 'none' }} to='/categories'>
                <h2
                  onClick={() => setActive(2)}
                  className={` ${active === 2 && 'cell-active'} h2`}
                >
                  Categories
                </h2>
              </Link>
              <Link style={{ textDecoration: 'none' }} to='/best-selling'>
                <h2
                  onClick={() => setActive(3)}
                  className={` ${active === 3 && 'cell-active'} h2`}
                >
                  Best Selling
                </h2>
              </Link>
              <Link style={{ textDecoration: 'none' }} to='/all-events'>
                <h2
                  onClick={() => setActive(4)}
                  className={` ${active === 4 && 'cell-active'} h2`}
                >
                  Events
                </h2>
              </Link>
              <Link style={{ textDecoration: 'none' }} to='/most-affordable'>
                <h2
                  onClick={() => setActive(5)}
                  className={` ${active === 5 && 'cell-active'} h2`}
                >
                  Most affordable
                </h2>
              </Link>
            </div>
            <Link to='/seller/sign-up' style={{ textDecoration: 'none' }}>
              <button className='become-seller-button1'>Become Seller</button>
            </Link>
          </div>
          <span ref={bgIcyRef} className='bg-icy'></span>
        </div>
      )}
    </>
  )
}

export default Navbar
