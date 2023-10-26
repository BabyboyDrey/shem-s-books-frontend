import React, { useState, useEffect } from 'react'
import CategoryItem from '../CategoryItem/CategoryItem'
import { useSelector } from 'react-redux'
import './Categories.css'

const Categories = () => {
  const { isLoading, categorisedProducts } = useSelector(state => state.product)
  const [productData, setProductData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    if (categorisedProducts) {
      setProductData(categorisedProducts)
      setSelectedCategory(productData[0]?._id || '')
    }
  }, [categorisedProducts])

  useEffect(() => {
    console.log('TMPZ:', productData)
    console.log('TMU:', selectedCategory)
  }, [productData])

  return (
    <div className='categories-all-container'>
      <div className='filter-cat-container'>
        <select
          className='categories-select'
          onChange={e => {
            setSelectedCategory(e.target.value)
          }}
          value={selectedCategory}
        >
          <option className='categories-option' value=''>
            Filter category
          </option>

          {productData &&
            productData.map((product, index) => (
              <option
                key={index}
                className='categories-option'
                value={`${product._id}`}
              >
                {product._id}
              </option>
            ))}
        </select>
      </div>
      <div>
        <CategorySelectedItems
          selectedCategory={selectedCategory}
          productData={productData}
        />
      </div>
    </div>
  )
}

const CategorySelectedItems = ({ selectedCategory, productData }) => {
  const [booksData, setBooksData] = useState([])
  useEffect(() => {
    if (productData) {
      const products = productData.filter(product => {
        return product._id === selectedCategory
      })
      setBooksData(products)
    }
  }, [selectedCategory])

  return (
    <div>
      <div className='selected-category-container'>
        <h1>Selected Category</h1>
        <div className='cat-item-outer-bg-container'>
          <div className='cat-item-inner-bg-container'>
            {booksData.length > 0 ? (
              booksData[0].books.map((book, index) => (
                <CategoryItem key={index} book={book} />
              ))
            ) : (
              <div>No products yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
