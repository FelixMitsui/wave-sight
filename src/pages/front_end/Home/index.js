/** @format */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productTypes } from '../../../redux/productModule'
import { Row, Container } from 'react-bootstrap'
import SingleCarousel from '../../../components/SingleCarousel'
import ProductCarousel from '../../../containers/ProductCarousel'
import Loading from '../../../components/Loading'
import { propTypes } from 'react-bootstrap/esm/Image'

const Home = () => {

  const dispatch = useDispatch()
  const products = useSelector((state) => state.product)
  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    if (Object.keys(products)
      .filter((key) => key !== 'search')
      .every((key) => products[key].length > 0)) return;
    dispatch({ type: productTypes.GET_FILTERED_PRODUCTS_REQUEST })
  }, [])

  return (
    <div className="mt-1 min-vh-100">
      {isLoading ? <Loading /> : null}
      < SingleCarousel />
      <Container className="p-0 mt-2 min-vh-100">
        <div className="mt-2 text-center border border-light-gray border-1 ">
          <h1 className="font-title">
            New Sale
          </h1>
        </div>
        <ProductCarousel filterValue="product_new" products={products} />
        <div className="mt-2 text-center border border-light-gray border-1 ">
          <h1 className=" font-title">
            Hot Sale
          </h1>
        </div>
        <ProductCarousel filterValue="product_popularity" products={products} />
        <div className="mt-2 text-center border border-light-gray border-1 ">
          <h1 className=" font-title">
            Discount
          </h1>
        </div>
        <ProductCarousel filterValue="product_discount" products={products} />
      </Container>
    </div>
  )
}

export default Home
