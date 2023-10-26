
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useMatch } from 'react-router-dom';
import { manageTypes } from '../../../redux/manageModule';
import PageBar from '../../../components/common/PageBar';
import ProductTable from '../../../components/product/ProductTable';
import { Outlet } from 'react-router-dom';
import { RootState } from 'redux/store';

const EditProduct = () => {

    const matched = useMatch('/manage/products');

    const dispatch = useDispatch();

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const page = queryParams.get('page') || 1;

    const products = useSelector((state: RootState) => state.manage?.products?.get(page));


    useEffect(() => {

        if (!products) {
            dispatch({
                type: manageTypes.MANAGE_GET_PRODUCTS_REQUEST,
                payload: { queryParams },
            });
        }


    }, [location]);

    return (
        <>
            {matched ? <section className="pt-3">
                <h1 className="border font-title mt-2 text-center text-white bg-gray">Product Manage</h1>
                <ProductTable products={products?.items} page={page} />
                <PageBar currentIndex={Number(page)} totalPage={products?.totalPage} />
            </section> : <Outlet />}
        </>
    );
};
export default EditProduct;
