import React, { useState, useEffect } from 'react'
import './BestSelling.css'
import ProductCard from '../ProductCard/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../redux/actions/product.js'
import Loading from '../Loader/Loader.js'

const BestSelling = () => {
  const dispatch = useDispatch()
  const [sellingProductData, setSellingProductData] = useState([])
  const { isLoading, allProduct } = useSelector(state => state.product)

  useEffect(() => {
    const data = Array.isArray(allProduct) ? [...allProduct] : []
    const sortedData = data?.sort((a, b) => b.sold_out - a.sold_out)
    setSellingProductData(sortedData)
  }, [allProduct])

  return (
    <div className='best-selling-container'>
      <h1>Best selling</h1>
      <div className='productcard-container-best-selling'>
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

export default BestSelling
