/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, matchRoutes, useMatch } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import BreadCrumb from '../../../components/BreadCrumb';
import Filter from '../../../components/Filter';
import { routes } from '../../../router/routesList';
import { productTypes } from '../../../redux/productModule';
import ProductCard from '../../../components/ProductCard';

const Product = () => {
  const category = location.pathname.split('/');
  const matchName = location.pathname.startsWith('/wave-sight')
    ? location.pathname.substring('/wave-sight'.length)
    : location.pathname;
  const matches = matchRoutes(routes, matchName);
  const matched = useMatch(`products/${category[category.length - 1]}`);
  const dispatch = useDispatch();
  const products = useSelector(state => state.product[category[category.length - 1]]);
  const [productSort, setProductSort] = useState();

  useEffect(() => {
    if (matched) {
      dispatch({
        type: productTypes.GET_CATEGORY_PRODUCTS_REQUEST,
        payload: category[category.length - 1],
      });
    }
  }, [matched]);

  useEffect(() => {
    setProductSort(products);
  }, [products]);

  const handlePriceSort = sort => {
    let sorted = [...products];
    switch (sort) {
      case 'Low':
        sorted.sort((a, b) => {
          return (
            a.product_price * a.product_discount - b.product_price * b.product_discount
          );
        });
        setProductSort(sorted);
        break;
      case 'High':
        sorted.sort((a, b) => {
          return (
            b.product_price * b.product_discount - a.product_price * a.product_discount
          );
        });
        setProductSort(sorted);
        break;
    }
  };
  return (
    <>
      {matched != null ? (
        <>
          <BreadCrumb matches={matches} />
          <Row className="border m-2 min-vh-100 p-2 ">
            <Col md={2} className="border border-secondary d-md-block d-none min-vh-100">
              <Filter onPriceSort={handlePriceSort} />
            </Col>
            <div className="d-md-none">
              <Filter onPriceSort={handlePriceSort} />
            </div>
            <Col sm={12} md={10} className="py-2 d-flex">
              <Row xs={2} md={3} lg={4} xl={5} className="p-1">
                {productSort?.map(product => (
                  <ProductCard key={product._id} item={product} />
                ))}
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <Container className="min-vh-100 pb-1">
          <Outlet />
        </Container>
      )}
    </>
  );
};
export default Product;
