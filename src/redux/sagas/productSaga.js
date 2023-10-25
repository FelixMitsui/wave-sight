import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
    getProducts,
    getCarouselProducts,
    getDetailProduct,
} from '../../services/axiosApi';
import { productTypes } from '../productModule';
import { cloneDeep } from 'lodash';

function* watchGetCarouselProducts() {

    try {

        const res = yield call(getCarouselProducts);

        const { data } = res;

        yield put({
            type: productTypes.GET_CAROUSEL_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (err) {
        const { data, status } = err.response;
        yield put({
            type: productTypes.PRODUCT_ANY_FAILURE,
            payload: `${data}.(${status})`,
        })
    }
}

function* watchGetProducts(action) {

    try {

        const { queryParams } = action.payload;
        const query = `?${queryParams.toString()}`;

        const res = yield call(getProducts, query);

        const { data } = res;

        const cid = queryParams.get('cid');
        const page = queryParams.get('page') || 1;

        const products = yield select(state => state.product.items);

        const outMap = new Map();

        if (products.has(cid)) {
            const nestedMap = cloneDeep(products.get(cid));

            nestedMap.set(page, data);

            outMap.set(cid, nestedMap);

        } else {
            const nestedMap = new Map();

            nestedMap.set(page, data);
            outMap.set(cid, nestedMap);
        }

        yield put({
            type: productTypes.GET_PRODUCTS_SUCCESS,
            payload: outMap,
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

    const productId = action.payload;
    try {
        const res = yield call(getDetailProduct, productId);

        const { data } = res;

        const itemMap = new Map();

        itemMap.set(productId, data);

        yield put({
            type: productTypes.GET_DETAIL_PRODUCT_SUCCESS,
            payload: itemMap,
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

    try {

        const { queryParams } = action.payload;

        const query = `?${queryParams.toString()}`;

        const res = yield call(getProducts, query);

        const { data, status } = res;

        const productsMap = new Map();

        const page = queryParams.get('page') || 1;

        productsMap.set(page, data);

        yield put({
            type: productTypes.SEARCH_PRODUCTS_SUCCESS,
            payload: productsMap,
        });

    } catch (err) {
        const { data, status } = err.response;
        yield put({
            type: productTypes.PRODUCT_ANY_FAILURE,
            payload: `${data}.(${status})`,
        });
    }
}

function* watchCleanProductItems(action) {

    try {

        const products = yield select(state => state.product.items);

        const productsClone = cloneDeep(products);
        console.log(productsClone)
        if (productsClone.has(action.payload)) {

            productsClone.delete(action.payload);

            yield put({
                type: productTypes.CLEAN_PRODUCT_ITEMS_RECEIVE,
                payload: productsClone,
            });

        } else {
            throw new Error("Product not found.");
        }

    } catch (err) {

        console.log(err.message);
    }
}

export default function* productSaga() {
    yield takeLatest(productTypes.GET_CAROUSEL_PRODUCTS_REQUEST,
        watchGetCarouselProducts
    );
    yield takeLatest(
        productTypes.GET_PRODUCTS_REQUEST,
        watchGetProducts
    );
    yield takeLatest(productTypes.CLEAN_PRODUCT_ITEMS_SEND, watchCleanProductItems);
    yield takeLatest(productTypes.GET_DETAIL_PRODUCT_REQUEST, watchGetDetailProduct);
    yield takeLatest(productTypes.SEARCH_PRODUCTS_REQUEST, watchSearchProducts);
}
