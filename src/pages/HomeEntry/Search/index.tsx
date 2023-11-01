
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '../../../components/common/BreadCrumb';
import { productTypes } from '../../../redux/productModule';
import ProductList from '../../../components/product/ProductList';
import PageBar from '../../../components/common/PageBar';
import { RootState } from 'redux/store';
import { Product } from 'types/Product';

const Search = () => {

    const dispatch = useDispatch();

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    const page = queryParams.get('page') || 1;

    const products = useSelector((state: RootState) => state.product?.search?.get(Number(page))) as { items: Product[], totalPage: number };

    useEffect(() => {


        dispatch({ type: productTypes.SEARCH_PRODUCTS_REQUEST, payload: { queryParams } });


    }, [location]);

    return (
        <section className="pt-3">
            <BreadCrumb />
            {products ? <ProductList products={products?.items} /> :
                <p >There are currently no products.</p>}
            <PageBar currentIndex={Number(page)} totalPage={products?.totalPage} queryText={`q=${query}&`} />
        </section>
    );
};
export default Search;
