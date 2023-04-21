/** @format */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, matchRoutes, useMatch } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import BreadCrumb from '../../../components/BreadCrumb'
import Filter from '../../../components/Filter'
import ProductList from '../../../components/ProductList'
import { routes } from '../../../routesList';
import { productTypes } from '../../../redux/productModule'

const Product = () => {

  const pathUrl = location.pathname
  const matches = matchRoutes(routes, location.pathname)
  const category = pathUrl.split('/')[2]
  const matched = useMatch(`products/${category}`)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product[category])
  const [productSort, setProductSort] = useState()
  useEffect(() => {
    if (products != "") return
    dispatch({ type: productTypes.GET_CATEGORY_PRODUCTS_REQUEST, payload: category })
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
      <Container fluid="md border min-vh-100">
        <Row>
          {matched != null ? (
            <>
              <Col
                sm={2}
                className="min-vh-100 d-none d-md-block border border-secondary m-1 "
              >
                <Filter handlePriceSort={handlePriceSort} />
              </Col>

              <Col className="mt-2">
                <BreadCrumb matches={matches} />
                <div className='d-md-none mb-2'>
                  <Filter handlePriceSort={handlePriceSort} />
                </div>
                <ProductList productSort={productSort} />
              </Col>
            </>
          ) : (
            <Col className="mt-2">
              <Outlet />
            </Col>
          )}

        </Row>
      </Container>
    </>
  )
}
export default Product
