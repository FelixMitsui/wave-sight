
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import BreadCrumb from '../../../components/common/BreadCrumb';
import { productTypes } from '../../../redux/productModule';
import ProductList from '../../../components/product/ProductList';
import PageBar from '../../../components/common/PageBar';

const Search = () => {

    const dispatch = useDispatch();

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    const page = queryParams.get('page') || 1;

    const products = useSelector(state => state.product?.search?.get(page));

    useEffect(() => {
        dispatch({ type: productTypes.SEARCH_PRODUCTS_REQUEST, payload: { queryParams } });
    }, []);

    return (
        <section className="pt-3">
            <BreadCrumb />
            {products ? <ProductList products={products?.items} /> : <p >There are currently no products.</p>}
            <PageBar currentIndex={page} totalPage={products?.totalPage} queryText={`q=${query}&`} />
        </section>
    );
};
export default Search;
