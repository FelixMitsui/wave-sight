/** @format */

import React, { useEffect, useRef } from 'react'
import {
  Col, Row, Container, Card

} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { matchRoutes } from 'react-router-dom'
import BreadCrumb from '../../../components/BreadCrumb'
import ShoppingForm from '../../../containers/ShoppingForm'
import { productActions } from '../../../redux/productModule'
import { userActions } from '../../../redux/userModule'
import { routes } from '../../../routesList';
import uuid from 'react-uuid'
import { BACKEND_IMAGE_URL } from '../../../util/constants/url'
import '../../../../src/index'


const Detail = () => {

  const dispatch = useDispatch()
  const detailId = location.pathname
  const matches = matchRoutes(routes, location.pathname)
  const imgRef = useRef()

  const {
    _id: product_id,
    product_name,
    product_images,
    product_part,
    product_colors,
    product_sizes,
    product_price,
    product_discount,
    product_content,
  } = useSelector((state) => state.product.detail)

  const { user: { user_id } } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(productActions.getDetailProduct(detailId))
  }, [detailId])

  const handleMainImg = (e) => {
    imgRef.current.src = e.target.src
    imgRef.current.title = e.target.title
  }

  const imageList =
    product_images?.map((image) => (
      <img
        onClick={(e) => handleMainImg(e)}
        key={uuid()}
        className="img-thumbnail border border-black mb-1"
        title={image.originalname}
        src={`${BACKEND_IMAGE_URL}/${image.originalname}`}
      />
    ))

  const onFormSubmit = ({ colorRadio, sizeSelect, quantitySelect }) => {

    const productValue = {
      product_id,
      product_mark: uuid(),
      product_name,
      product_image: product_images[0],
      product_part,
      product_color: colorRadio,
      product_size: sizeSelect,
      product_quantity: quantitySelect,
      product_discount,
      product_price,
    }

    dispatch(userActions.setCartItem({ productValue, user_id }))
  }

  return (
    <>
      <BreadCrumb matches={matches} />
      <div className="bg-gray">
        <h1
          style={{ fontFamily: "fantasy" }}
          className="mt-2 border  text-white d-flex justify-content-center"
        >
          Detail
        </h1>
      </div >
      <Row className="mt-1">
        <Col md={2} className="border d-none d-md-block flex-nowrap">
          {imageList}
        </Col>
        <Col xs={12} sm={4} md={4}>
          {
            product_images ?
              <img ref={imgRef}
                className="img-thumbnail"
                src={`${BACKEND_IMAGE_URL}/${product_images[0].originalname}`
                }
                title={product_images[0].originalname} />
              : <></>
          }
        </Col >
        <Col xs={12} sm={6} md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-olive">{product_name}</Card.Title>
              <Card.Text className="mt-5 d-flex justify-content-end">
                <h4>{product_price * product_discount}$</h4>
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
      <Container fluid>
        <Row>
          <Col className="d-flex">
            <Card>
              <Card.Body>
                <Card.Title className="text-olive d-flex justify-content-center">
                  Detail Content
                </Card.Title>
                <Card.Text className="mt-5 d-flex justify-content-end">
                  <h5>{product_content}</h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Detail
