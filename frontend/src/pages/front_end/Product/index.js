/** @format */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchRoutes } from 'react-router-dom'
import { productActions } from '../../../redux/productModule'
import { Row, Col, Container } from 'react-bootstrap'
import BreadCrumb from '../../../components/BreadCrumb'
import Filter from '../../../components/Filter'
import ProductList from '../../../components/ProductList'
import { routes } from '../../../routesList';
import '../../../../src/index'

const Product = () => {

  const category = location.pathname
  const matches = matchRoutes(routes, location.pathname)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.categories)
  const [productSort, setProductSort] = useState()

  useEffect(() => {
    dispatch(productActions.getCategoryProducts(category))
  }, [category])

  useEffect(() => {
    setProductSort(products)
  }, [products])

  const handlePriceSort = (sort) => {
    let sorted = [...products]
    switch (sort) {
      case 'Low':
        sorted.sort((a, b) => {
          return a.product_price * a.product_discount - b.product_price * b.product_discount
        })
        setProductSort(sorted)
        break;
      case 'High':
        sorted.sort((a, b) => {
          return b.product_price * b.product_discount - a.product_price * a.product_discount
        })
        setProductSort(sorted)
        break;
    }
  }

  return (
    <>
      <Container fluid="md border ">
        <Row>
          <Col
            sm={2}
            className="d-none d-md-block border border-secondary m-1 "
          >
            <Filter handlePriceSort={handlePriceSort} />
          </Col>
          <Col className="mt-2">
            <BreadCrumb matches={matches} />
            <div className='d-md-none mb-2 '>
              <Filter handlePriceSort={handlePriceSort} />
            </div>
            <ProductList productSort={productSort} />
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Product
