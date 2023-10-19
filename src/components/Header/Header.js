import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Header.css'
import axios from 'axios'
import server from '../../server'

const Header = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchActive, setSearchActive] = useState(false)
  const { user } = useSelector(state => state.user)
  const { allProduct } = useSelector(state => state.product)
  const [data, setData] = useState([])
  const [allProductData, setAllProductData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (allProduct) {
      setAllProductData(allProduct)
    }
  }, [allProduct])

  const debounce = (func, delay) => {
    let timer
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }

  const handleSearchDebounced = debounce(() => {
    if (searchKeyword.length >= 2) {
      handleSearch()
    }
  }, 500)

  const handleSearch = () => {
    const keyword = searchKeyword.toLowerCase()
    const foundData = allProductData.filter(product => {
      return (
        product.bookTitle.toLowerCase().includes(keyword) ||
        product.bookAuthor.authorName.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
      )
    })
    setData(foundData)
  }

  return (
    <div className='header-container'>
      <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
        <div className='brand-name'>
          <span className='shem'>Shem's</span>
          <span className='books'>Books</span>
        </div>
      </Link>
      <div className='search-container'>
        <div className='search-vector-container'>
          <BiSearch className='search-vector' />
        </div>
        <input
          onFocus={() => {
            setSearchActive(true)
          }}
          onBlur={e => {
            setTimeout(() => {
              setSearchActive(false)
            }, 250)
          }}
          onChange={e => {
            setSearchKeyword(e.target.value)
            handleSearchDebounced()
          }}
          placeholder='Search for a book'
          className='search-input'
          type='text'
        ></input>
      </div>
      <div className='button-container'>
        {user ? (
          <h3
            onClick={() => {
              axios.get(`${server}/api/user/logout`)
            }}
            className='sign-up-button'
          >
            Log out
          </h3>
        ) : (
          <Link to='/sign-up'>
            <button className='sign-up-button'>Sign up</button>
          </Link>
        )}
        <Link
          style={{
            textDecoration: 'none'
          }}
          to='/seller/dashboard'
        >
          <button className='become-seller-button'>Become Seller</button>
        </Link>
      </div>

      {searchKeyword.length >= 2 && searchActive && (
        <div className='search-results-container'>
          {data?.length > 0 ? (
            data.map(p => (
              <div
                onClick={() => {
                  navigate(`/book/${p._id}`)
                }}
                className='search-result-item-container'
              >
                <img loading='lazy' src={`${server}/${p?.bookImages[0]}`} />
                <h3 className='search-result-item-product-name'>
                  {p.bookTitle}
                </h3>
                <h3 className='search-result-item-product-price'>
                  N{p.discountPrice}
                </h3>
              </div>
            ))
          ) : (
            <div>
              <h3>No such books</h3>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Header
