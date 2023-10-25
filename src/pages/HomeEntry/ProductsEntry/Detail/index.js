import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import { Row } from 'react-bootstrap';
import { productTypes } from '../../../../redux/productModule';
import ProductDetail from '../../../../components/product/ProductDetail';
import BreadCrumb from "../../../../components/common/BreadCrumb";

export default function Detail() {

  const location = useLocation();

  const product_id = location.pathname.split('/')[2];

  const dispatch = useDispatch();

  const imgRef = useRef();

  const {
    info: { _id: user_id },
  } = useSelector(state => state.user);


  const product = useSelector(state => state.product.detail?.get(product_id));


  useEffect(() => {

    if (!product) {

      dispatch({
        type: productTypes.GET_DETAIL_PRODUCT_REQUEST,
        payload: product_id
      });

    };

  }, []);

  return (
    <>
      {product && <BreadCrumb name={product?.product_name} cid={product?.cid} />}
      <h1 className="border font-title m-2 text-center text-white bg-gray">Detail</h1>
      <ProductDetail product={product} user_id={user_id} />
    </>
  );
};
