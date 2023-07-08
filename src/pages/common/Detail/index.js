import React, { useEffect, useRef } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { json, matchRoutes } from 'react-router-dom';
import BreadCrumb from '../../../components/BreadCrumb';
import ShoppingForm from '../../../containers/ShoppingForm';
import { userTypes } from '../../../redux/userModule';
import { routes } from '../../../router/routesList';
import uuid from 'react-uuid';
import { productTypes } from '../../../redux/productModule';

const Detail = () => {
  const dispatch = useDispatch();
  const pathName = location.pathname.split('/');
  const categoryName = pathName[pathName.length - 2];
  const productId = pathName[pathName.length - 1];

  const matchName = location.pathname.startsWith('/wave-sight')
    ? location.pathname.substring('/wave-sight'.length)
    : location.pathname;
  const matches = matchRoutes(routes, matchName);
  const imgRef = useRef();
  const products = useSelector(state => state.product[categoryName]);
  const product = products.find(item => item._id === productId);
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
  } = product || {};

  const {
    info: { _id: user_id },
  } = useSelector(state => state.user);

  useEffect(() => {

    if (!product) {
      dispatch({
        type: productTypes.GET_DETAIL_PRODUCT_REQUEST,
        payload: {
          category: categoryName,
          product_id: productId,
        },
      });
    };

  }, []);

  const handleToggleImg = event => {
    imgRef.current.src = event.target.src;
    imgRef.current.title = event.target.title;
  };

  const imageList = product_images?.map(image => (
    <img
      onClick={handleToggleImg}
      key={uuid()}
      className="border border border-light-gray img-thumbnail mb-1 mx-1"
      src={image}
    />
  ));

  const handleFormSubmit = ({ color, size, quantity }) => {

    if (!user_id) {
      dispatch({ type: userTypes.WARNING_MESSAGE_REQUEST, payload: 'Please login your account.' });
      return;
    }

    const productInfo = {
      product_id,
      product_mark: uuid(),
      product_name,
      product_image: product_images[0],
      product_part,
      product_color: color,
      product_size: size,
      product_quantity: Number(quantity),
      product_discount,
      product_price,
    };
    dispatch({
      type: userTypes.ADD_ITEM_TO_CART_REQUEST,
      payload: { productInfo, user_id },
    });
  };

  return (
    <>
      <BreadCrumb matches={matches} name={product_name} />
      <div className="bg-gray">
        <h1 className="border font-title mt-2 text-center text-white">Detail</h1>
      </div>
      <Row className="border m-2 min-vh-100 p-2">
        <Col xs={4} sm={4} md={2} className="mt-1">
          {imageList}
        </Col>
        <Col xs={8} sm={8} md={4} className="mb-2">
          <img
            ref={imgRef}
            className="border border-light-gray img-thumbnail my-1"
            src={product_images && product_images[0]}
          />
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Card.Body className="font-content">
              <Card.Title className="fs-4 fw-bold">{product_name}</Card.Title>
              <Card.Text className="d-flex fs-4 justify-content-end mt-5">
                <h4 className="fw-bold">{Math.floor(product_price * product_discount)}$</h4>
              </Card.Text>
              <hr />
              <ShoppingForm
                initialValue={{
                  product_colors: product_colors,
                  product_sizes: product_sizes,
                }}
                onFormSubmit={handleFormSubmit}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col className="my-2">
          <div className="font-title fs-2 fw-bold text-center">Detail Content</div>
          <div className="font-content fs-5 mt-2 px-2">{product_content}</div>
        </Col>
      </Row>
    </>
  );
};
export default Detail;
