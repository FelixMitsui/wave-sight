import { put, takeLatest, call } from 'redux-saga/effects';
import {
    getCarouselProducts,
    getCategoryProducts,
    getDetailProduct,
    searchProducts,
} from '../../services/axiosApi';
import { productTypes } from '../productModule';

function* watchGetCarouselProducts(action) {
    const category = action.payload;
    try {
        const res = yield call(getCarouselProducts, category);
        const products = {
            newProducts: [],
            popularityProducts: [],
            discountProducts: [],
        };
        for (let i = 0; i < res.data.length; i++) {
            const product = res.data[i];

            if (product.product_new) {
                products.newProducts.push(product);
            }

            if (product.product_popularity) {
                products.popularityProducts.push(product);
            }

            if (product.product_discount < 1) {
                products.discountProducts.push(product);
            }
        }
        yield put({
            type: productTypes.GET_CAROUSEL_PRODUCTS_SUCCESS,
            payload: products,
        });
    } catch (err) {
        const { data, status } = err.response;
        yield put({
            type: productTypes.PRODUCT_ANY_FAILURE,
            payload: `${data}.(${status})`,
        })
    }
}

function* watchGetCategoryProducts(action) {
    try {
        const category = action.payload;
        const res = yield call(getCategoryProducts, category);
        yield put({
            type: productTypes.GET_CATEGORY_PRODUCTS_SUCCESS,
            payload: { [category]: res.data },
        });
    } catch (err) {
        const { data, status } = err.response;
        yield put({
            type: productTypes.PRODUCT_ANY_FAILURE,
            payload: `${data}.(${status})`,
        });
    }
}

function* watchGetDetailProduct(action) {
    const { category, product_id } = action.payload;
    console.log(product_id)
    try {
        const res = yield call(getDetailProduct, product_id);
        yield put({
            type: productTypes.GET_DETAIL_PRODUCT_SUCCESS,
            payload: { [category]: [res.data] },
        });
    } catch (err) {
        const { data, status } = err.response;
        yield put({
            type: productTypes.PRODUCT_ANY_FAILURE,
            payload: `${data}.(${status})`,
        });
    }
}

function* watchSearchProducts(action) {
    const query = action.payload;
    try {
        const res = yield call(searchProducts, query);
        yield put({
            type: productTypes.SEARCH_PRODUCTS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        yield put({
            type: productTypes.PRODUCT_ANY_FAILURE,
            payload: { error: err.message },
        });
    }
}

export default function* productSaga() {
    yield takeLatest(
        productTypes.GET_CAROUSEL_PRODUCTS_REQUEST,
        watchGetCarouselProducts
    );
    yield takeLatest(
        productTypes.GET_CATEGORY_PRODUCTS_REQUEST,
        watchGetCategoryProducts
    );
    yield takeLatest(productTypes.GET_DETAIL_PRODUCT_REQUEST, watchGetDetailProduct);
    yield takeLatest(productTypes.SEARCH_PRODUCTS_REQUEST, watchSearchProducts);
}
