/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productTypes } from '../../../redux/productModule';
import { Row, Col } from 'react-bootstrap';
import SingleCarousel from '../../../components/SingleCarousel';
import ProductCarousel from '../../../containers/ProductCarousel';
import Loading from '../../../components/Loading';

const Home = () => {
 const dispatch = useDispatch();
 const { newProducts, popularityProducts, discountProducts } = useSelector(
  state => state.product
 );
 const [isLoading, setIsloading] = useState(false);

 useEffect(() => {
  if (newProducts.length > 0) return;
  dispatch({
   type: productTypes.GET_CAROUSEL_PRODUCTS_REQUEST,
   payload: {
    product_new: true,
    product_popularity: true,
    product_discount: 1,
   },
  });
 }, []);

 return (
  <Row className="border m-2 min-vh-100 p-2">
   {isLoading ? <Loading /> : null}
   <SingleCarousel />
   <div className="border-1 border-bottom border-light-gray mt-2 text-center">
    <h2 className="font-title">New Sale</h2>
   </div>
   <ProductCarousel items={newProducts} />
   <div className="border-1 border-bottom border-light-gray mt-2 text-center">
    <h2 className="font-title">Hot Sale</h2>
   </div>
   <ProductCarousel items={popularityProducts} />
   <div className="border-1 border-bottom border-light-gray mt-2 text-center">
    <h2 className="font-title">Discount</h2>
   </div>
   <ProductCarousel items={discountProducts} />
  </Row>
 );
};

export default Home;
