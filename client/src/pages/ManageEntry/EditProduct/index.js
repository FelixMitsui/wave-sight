
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useMatch } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import ProductTableRow from '../../../components/product/ProductTableRow';
import { manageTypes } from '../../../redux/manageModule';
import { useEditInterface } from '../../../hooks/useEditInterface';
import PageBar from '../../../components/common/PageBar';
import ProductTable from '../../../components/product/ProductTable';
import ProductForm from '../../../components/product/ProductForm';
import { Outlet } from 'react-router-dom';

const EditProduct = () => {

    const matched = useMatch('/manage/products');

    const dispatch = useDispatch();

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const page = queryParams.get('page') || 1;

    const products = useSelector(state => state.manage?.products?.get(page));



    const {
        isDisplay,
        value: productValue,
        setValue: setProductValue,
        handleOpenInterface,
        handleCloseInterface,
    } = useEditInterface();


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
                <ProductTable items={products?.items} page={page} onOpenInterface={handleOpenInterface} />
                <PageBar currentIndex={page} totalPage={products?.totalPage} />

            </section> : <Outlet />}
        </>
    );
};
export default EditProduct;
