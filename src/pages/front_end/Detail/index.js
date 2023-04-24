/** @format */

import React, { useEffect, useRef } from 'react'
import {
  Col, Row, Container, Card

} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { matchRoutes } from 'react-router-dom'
import BreadCrumb from '../../../components/BreadCrumb'
import ShoppingForm from '../../../containers/ShoppingForm'
import { userTypes } from '../../../redux/userModule'
import { routes } from '../../../routesList';
import uuid from 'react-uuid'
import { BACKEND_IMAGE_URL } from '../../../util/constants/url'
import { productTypes } from '../../../redux/productModule'

const Detail = () => {

  const dispatch = useDispatch()
  const pathName = location.pathname.split("/")
  const matches = matchRoutes(routes, location.pathname)
  const imgRef = useRef()
  const products = useSelector(state => state.product[pathName[2]]);
  const product = Array.isArray(products) ? products.find(item => item._id === pathName[3]) : undefined;
  const {
    _id: product_id,
    product_name,
    product_images,
    product_part,
    product_colors,
    product_sizes,
    product_price,
    product_discount,
    product_content
  } = product || {};

  const { user: { _id: user_id } } = useSelector((state) => state.user)
  useEffect(() => {
    if (product === undefined) {
      dispatch({ type: productTypes.GET_DETAIL_PRODUCT_REQUEST, payload: { category: pathName[2], product_id: pathName[3] } })
    }
  }, [product])

  const handleMainImg = (e) => {
    imgRef.current.src = e.target.src
    imgRef.current.title = e.target.title
  }

  const imageList =
    product_images?.map((image) => (
      <img
        onClick={(e) => handleMainImg(e)}
        key={uuid()}
        className="img-thumbnail border border-1 border-gray mb-1 mx-1"
        src={image}
      />
    ))

  const onFormSubmit = ({ colorRadio, sizeSelect, quantitySelect }) => {
    if (user_id === undefined) {
      alert("Please login to your account.")
      return
    }

    const productInfo = {
      product_id,
      product_mark: uuid(),
      product_name,
      product_image: product_images[0],
      product_part,
      product_color: colorRadio,
      product_size: sizeSelect,
      product_quantity: Number(quantitySelect),
      product_discount,
      product_price,
    }
    dispatch({ type: userTypes.SET_USER_CART_REQUEST, payload: { productInfo, user_id } })
  }

  return (
    <>
      <BreadCrumb matches={matches} productName={product_name} />
      <div className="bg-gray">
        <h1
          className="mt-2 border font-title  text-white d-flex justify-content-center"
        >
          Detail
        </h1>
      </div >
      <Row className="d-md-none border mx-1 mt-1">
        <Col xs={4} sm={3} className='d-flex mt-1'>
          {imageList}
        </Col>
      </Row>
      <Row className="mt-1">
        <Col md={2} className="mt-1border d-none d-md-block">
          {imageList}
        </Col>
        <Col xs={12} sm={6} md={4}>
          {<img ref={imgRef}
            className="img-thumbnail border border-1 border-gray"
            src={product_images && product_images[0]} />}
        </Col >
        <Col xs={12} sm={6} md={6}>
          <Card>
            <Card.Body className='font-content '>
              <Card.Title className="fw-bold fs-4 ">{product_name}</Card.Title>
              <Card.Text className="mt-5 fs-4 d-flex justify-content-end ">
                <h4 className='fw-bold'>{Math.floor(product_price * product_discount)}$</h4>
              </Card.Text>
              <hr />
              <ShoppingForm defaultValue={{
                colors: product_colors,
                sizes: product_sizes,
              }}
                onFormSubmit={onFormSubmit}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row >
      <Row className='my-2'>
        <Col >
          <Card>
            <Card.Body className=' d-flex flex-column align-items-center'>
              <Card.Title className="fw-bold fs-2 font-title">
                Detail Content
              </Card.Title>
              <Card.Text className="mt-5 d-flex px-1  fs-5  font-content">
                {product_content}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default Detail
