import React, { useEffect } from 'react'
import CategoryItem from '../../CategoryItem/CategoryItem'
import '../../Home/Home.css'
import { useSelector, useDispatch } from 'react-redux'
import { getCommonCategoryProducts } from '../../../redux/actions/product'

const CategorisedProducts = () => {
  const dispatch = useDispatch()
  const { isLoading, categorisedProducts } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(getCommonCategoryProducts())
  }, [])

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : categorisedProducts?.length > 0 ? (
        <div className='categorised-container'>
          {categorisedProducts.map(singleP => (
            <div key={singleP._id}>
              <h1 className='category-header'>{singleP._id}</h1>
              <div className='cat-grid'>
                {singleP.books.map(book => (
                  <CategoryItem key={book._id} book={book} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No book created yet</div>
      )}
    </div>
  )
}

export default CategorisedProducts
