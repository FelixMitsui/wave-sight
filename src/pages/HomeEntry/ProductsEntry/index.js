
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from '../../../components/common/BreadCrumb';
import ProductList from '../../../components/product/ProductList';
import useSort from '../../../hooks/useSort';
import { productTypes } from '../../../redux/productModule';
import FilterSelectList from '../../../components/product/FilterSelectList';
import PageBar from '../../../components/common/PageBar';

export default function ProductsEntry() {

    const dispatch = useDispatch();
    const location = useLocation();
    const matched = useMatch('/products');
    const queryParams = new URLSearchParams(location.search);
    const cid = queryParams.get('cid');
    const page = queryParams.get('page') || 1;
    const create_at = queryParams.get('create_at')
    const product_price = queryParams.get('product_price')
    const sort = create_at ? `&create_at=${create_at}` : null || product_price ? `&product_price=${product_price}` : null || "";

    const products = useSelector(state => state.product?.items?.get(cid)?.get(page));

    const itemsLength = products?.items.length;


    useEffect(() => {


        dispatch({
            type: productTypes.GET_PRODUCTS_REQUEST,
            payload: { queryParams },
        });

    }, [location]);

    return (
        <section className="pt-3">
            {matched ?
                <>
                    {cid && <BreadCrumb cid={cid} />}
                    <FilterSelectList cid={cid} />
                    {itemsLength !== 0 ? <ProductList products={products?.items} /> : <p className="fw-bold fs-4 text-center">There are currently no products.</p>}
                    <PageBar currentIndex={page} totalPage={products?.totalPage} queryText={`cid=${cid}&`} sortText={sort} />
                </>
                : <Outlet />}
        </section>
    );
};
