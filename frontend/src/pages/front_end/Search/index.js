/** @format */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../../redux/productModule'
import { Row, Col, Container } from 'react-bootstrap'
import BreadCrumb from '../../../components/BreadCrumb'
import Filter from '../../../components/Filter'
import ProductList from '../../../components/ProductList'

const Search = () => {

  const [isShow, setShow] = useState(false)
  const dispatch = useDispatch()
  const query = location.search
  const products = useSelector((state) => state.product.search)

  useEffect(() => {
    dispatch(productActions.search(query))
  }, [])

  const handleClose = () => {
    setShow({ isShow: false })
  }

  return (
    <>
      <OffcanvasArea show={isShow} close={handleClose} />
      <Container fluid="md border">
        <Row>
          <Col
            md={2}
            className="d-none d-md-block border border-secondary m-1 "
          >
            <Filter />
          </Col>
          <Col className="mt-2">
            <BreadCrumb />
            <ProductList products={products} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Search
