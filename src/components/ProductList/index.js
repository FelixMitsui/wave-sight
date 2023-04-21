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
      <Row xs={2} md={3} lg={4} xl={5} className='w-100 m-0 p-1 d-flex align-items-between' >
        {productItems}
      </Row>
    </>
  )
}
export default ProductList
