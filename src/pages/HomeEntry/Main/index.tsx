import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productTypes } from '../../../redux/productModule';
import SingleCarousel from '../../../components/common/SingleCarousel';
import ProductCarousel from '../../../components/product/ProductCarousel';
import { RootState } from 'redux/store';

export default function Main() {

    const dispatch = useDispatch();

    const { newItems, popularityItems, discountItems } = useSelector(
        (state: RootState) => state.product.carouselItems
    );

    useEffect(() => {
        dispatch({ type: productTypes.GET_CAROUSEL_PRODUCTS_REQUEST });
    }, []);

    return (
        <section className="pt-3 d-flex flex-column">
            <SingleCarousel />
            <h2 className="border-1 border-bottom border-light-gray mt-2 text-center font-title">New Sale</h2>
            <ProductCarousel products={newItems} />
            <h2 className="border-1 border-bottom border-light-gray mt-2 text-center font-title">Hot Sale</h2>
            <ProductCarousel products={popularityItems} />
            <h2 className="border-1 border-bottom border-light-gray mt-2 text-center font-title">Discount</h2>
            <ProductCarousel products={discountItems} />
        </section>
    );
};