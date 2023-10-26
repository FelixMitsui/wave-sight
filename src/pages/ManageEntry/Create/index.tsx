import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from '../../../components/common/BreadCrumb';
import ProductForm from '../../../components/product/ProductForm';
import { productTypes } from '../../../redux/productModule';
import { RootState } from 'redux/store';

const Create = () => {

    const location = useLocation();

    const product_id = location.pathname.split('/')[3];

    const dispatch = useDispatch();

    const product = useSelector((state: RootState) => state.product.detail?.get(product_id));

    useEffect(() => {

        if (!product) {

            dispatch({
                type: productTypes.GET_DETAIL_PRODUCT_REQUEST,
                payload: product_id
            });
        };

    }, [location]);


    return (
        <section className="pt-3">
            {product && <BreadCrumb />}
            <h1 className="border font-title mt-2 text-center text-white bg-gray">Create Product</h1>
            <ProductForm product={product} />
        </section>
    );
};

export default Create;
