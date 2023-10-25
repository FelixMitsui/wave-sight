import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { productTypes } from '../redux/productModule';

const useSort = ({ products }) => {

    const [sortedProducts, setSortedProducts] = useState();



    useEffect(() => {

        let filteredProducts = products;

        if (products.length !== 0) {

            if (part) {
                filteredProducts = products.filter((product => product.product_part === categories.part))
            }

            setSortedProducts(filteredProducts);
        }

    }, [products]);

    return [sortedProducts, setSortedProducts];
};

export default useSort;
