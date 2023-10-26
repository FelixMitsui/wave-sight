import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import { productTypes } from '../../../../redux/productModule';
import ProductDetail from '../../../../components/product/ProductDetail';
import BreadCrumb from '../../../../components/common/BreadCrumb';
import { Product } from "types/Product";
import { RootState } from "redux/store";

export default function Detail() {

  const location = useLocation();

  const product_id = location.pathname.split('/')[2];

  const dispatch = useDispatch();

  const {
    info: { _id: user_id },
  } = useSelector((state: RootState) => state.user);


  const product = useSelector((state: RootState) => state.product.detail?.get(product_id)) as Product;

  useEffect(() => {

    if (!product) {

      dispatch({
        type: productTypes.GET_DETAIL_PRODUCT_REQUEST,
        payload: product_id
      });

    };

  }, [location]);

  return (
    <>
      {product && <BreadCrumb name={product?.product_name} cid={product?.cid} />}
      <h1 className="border font-title m-2 text-center text-white bg-gray">Detail</h1>
      <ProductDetail product={product} user_id={user_id} />
    </>
  );
};
