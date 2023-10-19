import React, { useState, useRef, useEffect } from 'react'
import './SingleProductCard.css'
import { useParams } from 'react-router-dom'
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar
} from 'react-icons/ai'
import ProductCard, { Ratings } from '../ProductCard/ProductCard'
import GoBack from '../../components/GoBack/GoBack.jsx'
import axios from 'axios'
import server from '../../server'
import { toast } from 'react-toastify'
import { getCommonCategoryProducts } from '../../redux/actions/product'
import { addToCart, removeFromCart } from '../../redux/actions/cart.js'
import { useSelector, useDispatch } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../../redux/actions/wishlist'
import Loading from '../Loader/Loader.js'

const SingleProductCard = () => {
  const [activeHeader, setActiveHeader] = useState(1)
  const [clicked, setClicked] = useState(false)
  const [cartButton, setCartButton] = useState(false)
  const [data, setData] = useState({})
  const [imgIndex, setImgIndex] = useState(0)
  const { id } = useParams()
  const wrapperRef = useRef(null)
  const [catData, setCatData] = useState([])
  const dispatch = useDispatch()
  const { isLoading, categorisedProducts } = useSelector(state => state.product)
  const { cart } = useSelector(state => state.cart)
  const { wishlist } = useSelector(state => state.wishlist)
  const { user } = useSelector(state => state.user)
  const [cartData, setCartData] = useState(cart ? cart : {})
  const cartButtonRef = useRef(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getCommonCategoryProducts())
  }, [])
  useEffect(() => {
    if (categorisedProducts) {
      setCatData(categorisedProducts)
    }
  }, [isLoading])

  useEffect(() => {
    setCartData(cart)
  }, [cart])

  useEffect(() => {
    if (data) {
      const CIP = cart.find(cartItem => {
        return cartItem._id === data._id
      })

      if (CIP) {
        cartButtonRef.current = true
        if (cartButtonRef.current === true) {
          setCartButton(true)
        }
      } else {
        cartButtonRef.current = false
      }
    }
  }, [cart, data])
  useEffect(() => {
    if (data) {
      const CIP = wishlist.find(wishlistItem => wishlistItem._id === data._id)

      if (CIP) {
        setClicked(true)
      }
    }
  }, [wishlist, data])

  const handleAddToWishlist = wishlistData => {
    dispatch(addToWishlist(wishlistData))
  }

  const handleRemoveFromWishlist = data => {
    dispatch(removeFromWishlist(data))
  }

  const filteredData = catData.filter(newData => {
    return newData._id !== data._id
  })

  useEffect(() => {
    const wrapperElement = wrapperRef.current

    if (!wrapperElement) {
      return
    }

    let pressed = false
    let startX = 0

    const handleMouseDown = e => {
      pressed = true
      startX = e.clientX
      wrapperElement.style.cursor = 'grabbing'
    }

    const handleMouseUp = () => {
      pressed = false
      wrapperElement.style.cursor = 'grab'
    }

    const handleMouseMove = e => {
      if (!pressed) {
        return
      }

      wrapperElement.scrollLeft += startX - e.clientX
      startX = e.clientX
    }

    wrapperElement.addEventListener('mousedown', handleMouseDown)
    wrapperElement.addEventListener('mouseup', handleMouseUp)
    wrapperElement.addEventListener('mousemove', handleMouseMove)

    return () => {
      wrapperElement.removeEventListener('mousedown', handleMouseDown)
      wrapperElement.removeEventListener('mouseup', handleMouseUp)
      wrapperElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const fetchData = async () => {
    await axios
      .get(`${server}/api/book/get-specific-book/${id}`)
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <>
      <GoBack />
      {data ? (
        <div className='single-product-card-container'>
          {data?.bookImages ? (
            <div className='main-image-container'>
              <img
                src={`${server}/${data?.bookImages[imgIndex]}`}
                alt='image'
              />
            </div>
          ) : (
            <div>No images</div>
          )}
          <div className='imges-plus-prices-container'>
            <div className='extra-images-container'>
              {data?.bookImages &&
                data?.bookImages.map((image, index) => (
                  <img
                    src={`${server}/${data?.bookImages[index]}`}
                    alt='image'
                    key={index}
                    onClick={() => setImgIndex(index)}
                  />
                ))}
            </div>
            <div className='single-product-card-prices-container'>
              <h3>{data?.currentPrice}</h3>
              <h3>{data?.discountPrice}</h3>
            </div>
          </div>
          <div className='book-title-single-product-card'>
            <h3>{data?.bookTitle}</h3>
          </div>
          <div className='book-desc-single-product-card'>
            <h3>{data?.category}</h3>
          </div>
          <div className='author--plus-accolades-plus-number-of-sold'>
            <div>
              <h3>Author: {data?.bookAuthor?.authorName}</h3>
            </div>
            <div>
              <h3>Best Selling</h3>
            </div>
            <div>
              <h3>{data?.sold_out} Copies sold</h3>
            </div>
          </div>
          <div className='more-content-about-book-headers '>
            <h3
              className={`${activeHeader === 1 && 'activeHeader'}`}
              onClick={() => {
                setActiveHeader(1)
              }}
            >
              Book Description
            </h3>
            <h3
              className={`${activeHeader === 2 && 'activeHeader'}`}
              onClick={() => {
                setActiveHeader(2)
              }}
            >
              About Author
            </h3>
            <h3
              className={`${activeHeader === 3 && 'activeHeader'}`}
              onClick={() => {
                setActiveHeader(3)
              }}
            >
              Reviews
            </h3>
          </div>
          <div className='more-content-about-book-content-outer-bg'>
            <div className='more-content-about-book-content'>
              {activeHeader === 1 && (
                <div className='book-desc-container'>
                  <p className='book-desc-content'>{data?.bookDesc}</p>
                </div>
              )}

              {activeHeader === 2 && (
                <div className='about-author-container'>
                  <h3>{data?.bookAuthor.authorName}</h3>
                  <h3>Books published</h3>
                  <div className='about-author-desc'>
                    <p>{data?.bookAuthor.authorBio}</p>
                  </div>
                </div>
              )}
              {activeHeader === 3 && (
                <div ref={wrapperRef} className='reviews-wrapper'>
                  {data.reviews > 0 ? (
                    data.reviews.map(review => (
                      <div className='reviews-container'>
                        <div className='reviewer-img-username-container'>
                          <div className='reviewer-image-container'>
                            <img src={`${server}/${review.user.avatar}`} />
                          </div>
                          <h3>{review.user.firstName}</h3>
                        </div>
                        <div className='product-reviews-total-container'>
                          <Ratings ratings={review.rating} />
                        </div>
                        <div className='product-review-container-outer-bg'>
                          <div className='product-review-container'>
                            <p>{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No reviews yet</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className='wishlist-plus-cart-ctas-container'>
            <div
              onClick={() => {
                setClicked(!clicked)
                const h3 = document.getElementById('wishlist-H3')
                if (h3.textContent.includes('Add to wishlist')) {
                  const isItemExists =
                    wishlist && wishlist.find(w => w._id === id)
                  if (isItemExists) {
                    toast.error('Item already in wishlist!')
                  } else {
                    if (data.stock < 1) {
                      toast.error('Product stock limited!')
                    } else {
                      const wishlistData = {
                        ...data,
                        qty: 1,
                        userEmail: user?.email
                      }
                      handleAddToWishlist(wishlistData)

                      toast.success('Item added to wishlist successfully!')
                    }
                  }
                } else {
                  handleRemoveFromWishlist(data)
                  toast.success('Item removed from wishlist')
                }
              }}
              className='single-product-card-wishlist-container'
            >
              <h3 id='wishlist-H3'>
                {clicked ? (
                  <AiFillHeart className='AiFillHeart' />
                ) : (
                  <AiOutlineHeart className='AiOutlineHeart' />
                )}
                {clicked ? 'Remove from wishlist' : 'Add to wishlist'}
              </h3>
            </div>
            <div
              onClick={() => {
                setCartButton(!cartButton)

                const h3 = document.getElementById('cart-H3')
                if (h3.textContent.includes('Add to Cart')) {
                  const isItemExists = cart && cart.find(i => i._id === id)
                  if (isItemExists) {
                    toast.error('Item already in cart!')
                  } else {
                    if (data.stock < 1) {
                      toast.error('Product stock limited!')
                    } else {
                      const cartData = { ...data, qty: 1 }
                      dispatch(addToCart(cartData))
                      toast.success('Item added to cart successfully!')
                    }
                  }
                } else {
                  cartButtonRef.current = false
                  dispatch(removeFromCart(data))
                }
              }}
              className='single-product-card-shopping-cart-container'
            >
              <h3 id='cart-H3'>
                <AiOutlineShoppingCart className='AiOutlineShoppingCart' />
                {!cartButton ? 'Add to Cart' : 'Remove from Cart '}
              </h3>
            </div>
          </div>
          <div className='related-books'>
            <h3>Related Books</h3>
            <div className='product-card-outer-bg-container'>
              <div className='product-card-inner-bg-container'>
                {catData > 0 && filteredData.length > 0 ? (
                  filteredData.map(data => (
                    <ProductCard key={data._id} product={data} />
                  ))
                ) : (
                  <div>No related products</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default SingleProductCard
