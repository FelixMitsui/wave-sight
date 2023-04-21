/** @format */
import React, { useRef, memo } from 'react'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BACKEND_IMAGE_URL } from '../../util/constants/url'

const ProductCard = ({ productItem }) => {

  const {
    _id,
    product_category,
    product_name,
    product_price,
    product_images,
    product_discount,
  } = productItem

  return (
    <Col className=" my-1 p-1 d-flex">
      <Card border="secondary" className="p-1">
        <Link to={`/products/${product_category}/${_id}`}>
          <Card.Img
            className="mt-2"
            variant="top"
            src={product_images && product_images[0]}
          />
        </Link>
        <Card.Body className='d-flex border p-1 border-1 justify-content-between   flex-column'  >
          <Card.Title as="p" className='fs-5 font-content fw-bold text-gray align-self-center'>{product_name}</Card.Title>
          {
            product_discount < 1 ? (
              <div className='d-flex justify-content-end'>
                <Card.Text className='mx-1 mb-0 fs-6 font-content text-decoration-line-through'>
                  {product_price}NT$
                </Card.Text>
                <Card.Text className='fs-5 text-red font-content'>
                  {Math.floor(product_price * product_discount)}NT$
                </Card.Text>
              </div>
            ) : (
              <Card.Text className='fs-5 font-content d-flex justify-content-end'>{product_price}NT$</Card.Text>
            )
          }
        </Card.Body>
      </Card>
    </Col >
  )
}

export default memo(ProductCard)
