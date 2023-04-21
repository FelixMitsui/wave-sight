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
    <>
      {isLoading ? <Loading /> : null}
      < SingleCarousel />
      <Container >
        <h1 style={{ fontFamily: "fantasy" }}
          className="mt-2 border fw-bold d-flex justify-content-center">
          New Sale
        </h1>
        <Row className="d-flex justify-content-center ">
          <ProductCarousel filterValue="product_new" products={products} />
        </Row>
        <h1 style={{ fontFamily: "fantasy" }}
          className="mt-2 border fw-bold d-flex justify-content-center">
          Hot Sale
        </h1>
        <Row className="d-flex justify-content-center  ">
          <ProductCarousel filterValue="product_popularity" products={products} />
        </Row>
        <h1 style={{ fontFamily: "fantasy" }}
          className="mt-2 border fw-bold d-flex justify-content-center">
          Discount
        </h1>
        <Row className="d-flex justify-content-center ">
          <ProductCarousel filterValue="product_discount" products={products} />
        </Row>
      </Container>
    </>
  )
}

export default Home
