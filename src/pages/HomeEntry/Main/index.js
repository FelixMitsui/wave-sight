import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { productTypes } from '../../../redux/productModule';
import SingleCarousel from '../../../components/common/SingleCarousel';
import ProductCarousel from '../../../components/product/ProductCarousel';

export default function Main() {


    const dispatch = useDispatch();

    const { newItems, popularityItems, discountItems } = useSelector(
        state => state.product.carouselItems
    );

    useEffect(() => {

        if (!newItems) {
            dispatch({ type: productTypes.GET_CAROUSEL_PRODUCTS_REQUEST });
        }

    }, []);

    return (
        <section className="pt-3 d-flex flex-column">
            <SingleCarousel />
            <h2 className="border-1 border-bottom border-light-gray mt-2 text-center font-title">New Sale</h2>
            <ProductCarousel items={newItems} />
            <h2 className="border-1 border-bottom border-light-gray mt-2 text-center font-title">Hot Sale</h2>
            <ProductCarousel items={popularityItems} />
            <h2 className="border-1 border-bottom border-light-gray mt-2 text-center font-title">Discount</h2>
            <ProductCarousel items={discountItems} />
        </section>
    );
};