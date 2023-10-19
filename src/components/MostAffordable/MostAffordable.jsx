import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './MostAffordable.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../redux/actions/product.js'
import Loading from '../Loader/Loader.js'

const MostAffordable = () => {
  const dispatch = useDispatch()
  const [sellingProductData, setSellingProductData] = useState([])
  const { isLoading, allProduct } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    if (allProduct && allProduct.length > 0) {
      const data = Array.isArray(allProduct) && [...allProduct]
      const sortedData = data?.sort((a, b) => a.sold_out - b.sold_out)
      setSellingProductData(sortedData)
    }
  }, [allProduct])

  return (
    <div className='most-affordable-container'>
      <h1>Most affordable</h1>
      <div className='productcard-container-most-affordable'>
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : sellingProductData.length > 0 ? (
          sellingProductData.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div>No products yet</div>
        )}
      </div>
    </div>
  )
}

export default MostAffordable
