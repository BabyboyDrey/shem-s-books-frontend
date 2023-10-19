import React, { useState, useEffect } from 'react'
import './ProductCard.css'
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
  AiFillHeart
} from 'react-icons/ai'
import { BsStarHalf } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import server from '../../server'
import { useSelector } from 'react-redux'

const ProductCard = ({ foreignLiked, product }) => {
  const [liked, setLiked] = useState(foreignLiked ? foreignLiked : false)
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const { wishlist } = useSelector(state => state.wishlist)
  const { user } = useSelector(state => state.user)

  const handleNavigate = () => {
    navigate(`/book/${product._id}`)
  }

  useEffect(() => {
    if (product) {
      setData(product)
    }
  }, [product])

  useEffect(() => {
    if (user && wishlist) {
      const likedProducts = wishlist.find(w => {
        return w.userEmail === user.email
      })

      if (likedProducts) {
        setLiked(true)
      }
    }
  }, [user, wishlist])

  function truncateSentence (sentence, numWords) {
    const words = sentence?.split(' ')
    if (words?.length <= numWords) {
      return sentence
    }
    const truncatedWords = words?.slice(0, numWords)
    return truncatedWords?.join(' ') + '...'
  }

  const truncatedSentence = truncateSentence(product?.bookDesc, 7)

  return (
    <div onClick={handleNavigate} className='product-card-container'>
      <div className='product-card-header-container'>
        <h4>{product?.bookTitle}</h4>
        <h4>Author: {product?.bookAuthor?.authorName}</h4>
      </div>
      <div className='product-card-image-container'>
        <img src={`${server}/${product?.bookImages[0]}`} alt='' />
      </div>
      <div className='product-card-desc'>
        <p>{truncatedSentence}</p>
      </div>
      <div className='product-card-ratings-no-of-sold'>
        <div>{<Ratings ratings={product?.ratings} />}</div>
        <h4>{product?.sold_out} sold</h4>
      </div>
      <div className='heart-cart-container'>
        {liked === true ? (
          <AiFillHeart
            onClick={() => {
              setLiked(!liked)
            }}
            className='red-color heart-icon'
          />
        ) : (
          <AiOutlineHeart
            onClick={() => {
              setLiked(!liked)
            }}
            className='heart-icon'
          />
        )}
        <AiOutlineShoppingCart className='product-card-cart-icon' />
      </div>
      <div className='product-card-prices'>
        <h4>{product?.discountPrice}</h4>
        <h4>{Number(data?.currentPrice)}</h4>
      </div>
    </div>
  )
}

const Ratings = ({ ratings }) => {
  const stars = []

  for (let i = 0; i <= 5; i++) {
    if (i <= ratings) {
      stars.push(<AiFillStar key={i} size={20} color='#f6b100' />)
    } else if (i === Math.ceil(ratings) && !Number.isInteger(ratings)) {
      stars.push(<BsStarHalf key={i} color='#f6b100' size={20} />)
    } else {
      stars.push(<AiOutlineStar key={i} size={20} color='#f6b100' />)
    }
  }

  return (
    <>
      <div>{stars}</div>
    </>
  )
}

export default ProductCard
export { Ratings }
