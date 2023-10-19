import React, { useState, useEffect } from 'react'
import '../../Home/Home.css'
import ProductCard from '../../ProductCard/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../../redux/actions/product.js'

const MostAffordable = () => {
  const dispatch = useDispatch()
  const [sellingProductData, setSellingProductData] = useState([])
  const { isLoading, allProduct } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    const data = Array.isArray(allProduct) ? [...allProduct] : []
    const sortedData = data?.sort((a, b) => a.sold_out - b.sold_out)
    setSellingProductData(sortedData)
  }, [allProduct])

  return (
    <>
      <div className='header-div-container'>
        <h6 className='best-selling-header'>Most Affordable</h6>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : sellingProductData.length > 0 ? (
        <div className='outer-bg-product-card-container'>
          <div className='bg-product-card-container'>
            {sellingProductData.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div>No products yet</div>
      )}
    </>
  )
}

export default MostAffordable
