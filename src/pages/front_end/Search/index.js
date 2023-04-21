/** @format */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchRoutes } from 'react-router-dom'
import { routes } from '../../../routesList'
import { Row, Col, Container } from 'react-bootstrap'
import BreadCrumb from '../../../components/BreadCrumb'
import Filter from '../../../components/Filter'
import ProductList from '../../../components/ProductList'
import { productTypes } from '../../../redux/productModule'

const Search = () => {
  const [isShow, setShow] = useState(false)
  const dispatch = useDispatch()
  const matches = matchRoutes(routes, location.pathname)
  const query = location.search
  const products = useSelector((state) => state.product.search)

  useEffect(() => {
    dispatch({ type: productTypes.SEARCH_PRODUCTS_REQUEST, payload: query })
  }, [])
  const handleClose = () => {
    setShow({ isShow: false })
  }
  return (
    <>
      <Container fluid="md border">
        <Row>
          <Col
            md={2}
            className="d-none d-md-block border border-secondary m-1 "
          >
            <Filter />
          </Col>
          <Col className="mt-2">
            <BreadCrumb matches={matches} />
            <ProductList productSort={products} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Search
