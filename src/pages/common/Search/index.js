/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchRoutes } from 'react-router-dom';
import { routes } from '../../../router/routesList';
import { Row, Col } from 'react-bootstrap';
import BreadCrumb from '../../../components/BreadCrumb';
import Filter from '../../../components/Filter';
import { productTypes } from '../../../redux/productModule';
import ProductCard from '../../../components/ProductCard';

const Search = () => {
    const dispatch = useDispatch();
    const matchName = location.pathname.startsWith('/wave-sight')
        ? location.pathname.substring('/wave-sight'.length)
        : location.pathname;
    const matches = matchRoutes(routes, matchName);
    const query = location.search;
    const products = useSelector(state => state.product.search);

    useEffect(() => {
        dispatch({ type: productTypes.SEARCH_PRODUCTS_REQUEST, payload: query });
    }, []);

    return (
        <>
            <BreadCrumb matches={matches} />
            <Row className="border m-2 min-vh-100 p-2">
                <Col md={2} className="border border-secondary d-md-block d-none ">
                    <Filter />
                </Col>
                <Col md={10}>
                    <Row xs={2} md={3} lg={4} xl={5} className="p-1 d-flex">
                        {products?.map(product => (
                            <ProductCard key={product._id} item={product} />
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    );
};
export default Search;
