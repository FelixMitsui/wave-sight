/** @format */

import React from 'react'
import { Row } from 'react-bootstrap'
import ProductCard from '../ProductCard'

const ProductList = ({ productSort = [] }) => {

  const productItems = productSort.map((product) => (
    <ProductCard key={product._id} productItem={product} />
  ))
  return (
    <>
      <Row xs={2} md={3} >
        {productItems}
      </Row>
    </>
  )
}
export default ProductList
