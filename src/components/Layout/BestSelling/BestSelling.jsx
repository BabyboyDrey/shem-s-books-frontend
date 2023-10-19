import React, { useState, useEffect } from 'react'
// import '../../Home/Home.css'
import './BestSelling.css'
import ProductCard from '../../ProductCard/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../../redux/actions/product.js'

const BestSelling = () => {
  const dispatch = useDispatch()
  const [sellingProductData, setSellingProductData] = useState([])
  const { isLoading, allProduct } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    console.log(`isLoad, allProduct:`, isLoading, allProduct)
  }, [isLoading, allProduct])

  useEffect(() => {
    const data = Array.isArray(allProduct) ? [...allProduct] : []
    const sortedData = data?.sort((a, b) => b.sold_out - a.sold_out)
    setSellingProductData(sortedData)
    console.log(`SellingProductData: ${sellingProductData}`)
  }, [allProduct])

  return (
    <>
      <div className='header-div-container'>
        <h6 className='best-selling-header'>Best Selling</h6>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : sellingProductData.length > 0 ? (
        <div className='outer-bg1-product-card-container'>
          <div className='bg1-product-card-container'>
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

export default BestSelling
