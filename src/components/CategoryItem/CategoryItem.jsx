import React from 'react'
import './CategoryItem.css'
import { Link } from 'react-router-dom'
import server from '../../server'

const CategoryItem = ({ book }) => {
  return (
    <Link
      style={{ textDecoration: 'none', color: 'black' }}
      to={`/book/${book?._id}`}
    >
      <div className='cat-container'>
        <div className='image-container'>
          <img
            className='img'
            src={`${server}/${book?.bookImages[0]}`}
            loading='lazy'
          />
        </div>
        <h3 className='cat-header'>{book?.bookTitle}</h3>
      </div>
    </Link>
  )
}

export default CategoryItem
