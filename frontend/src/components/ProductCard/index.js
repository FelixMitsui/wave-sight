/** @format */
import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BACKEND_IMAGE_URL } from '../../util/constants/url'

import "../../index"

const ProductCard = ({ productItem }) => {
  const {
    _id,
    product_name,
    product_price,
    product_images,
    product_discount,
  } = productItem

  return (
    <Col className=" my-1  ">
      <Card border="secondary">
        <Link to={`/detail/${_id}`}>
          <Card.Img
            className="mt-2 border "
            variant="top"
            src={`${BACKEND_IMAGE_URL}/${product_images[0].originalname}`}
          />
        </Link>
        <Card.Body className=' d-flex align-items-end flex-column'  >
          <Card.Title as="h6">{product_name}</Card.Title>
          {
            product_discount < 1 ? (
              <Card.Text className='mt-auto p-2 '>
                <span className='me-2 text-decoration-line-through'>{product_price}NT$</span>
                <span className=' text-red'>{Math.floor(product_price * product_discount)}NT$</span>
              </Card.Text>
            ) : (
              <Card.Text className='mt-auto p-2 '><span>{product_price}NT$</span></Card.Text>
            )
          }
        </Card.Body>
      </Card>
    </Col >
  )
}

export default ProductCard
