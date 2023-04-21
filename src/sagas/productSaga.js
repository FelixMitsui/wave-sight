import { put, takeLatest, takeEvery, all, delay, call, select } from 'redux-saga/effects';
import { getFilteredProducts, getCategoryProducts, getDetailProduct, searchProducts } from '../services/axiosApi';
import { productTypes } from '../redux/productModule';


function* watchGetFilteredProducts() {
    try {
        const res = yield call(getFilteredProducts);
        const products = {
            men: [],
            women: [],
            kid: [],
            other: [],
        };
        for (let i = 0; i < res.data.length; i++) {
            if (!products[res.data[i].product_category].includes(res.data[i])) {
                products[res.data[i].product_category].push(res.data[i]);
            }
        }
        yield put({
            type: productTypes.GET_FILTERED_PRODUCTS_SUCCESS,
            payload: products,
        });
    } catch (err) {
        yield put({
            type: productTypes.GET_FILTERED_PRODUCTS_FAILURE,
            payload: { error: err.message },
        });
    }
}

function* watchGetCategoryProducts(action) {
    try {
        const category = action.payload;
        const res = yield call(getCategoryProducts, category);
        yield put({ type: productTypes.GET_CATEGORY_PRODUCTS_SUCCESS, payload: { [category]: res.data } });
    } catch (err) {
        yield put({
            type: productTypes.GET_CATEGORY_PRODUCTS_FAILURE,
            payload: { error: err.message },
        });
    }
}

function* watchGetDetailProduct(action) {
    const { category, product_id } = action.payload;
    try {
        const res = yield call(getDetailProduct, product_id)
        yield put({ type: productTypes.GET_DETAIL_PRODUCT_SUCCESS, payload: { [category]: res.data } })
    } catch (err) {
        yield put({
            type: productTypes.GET_DETAIL_PRODUCT_FAILURE,
            payload: { error: err.message },
        });
    }
}

function* watchSearchProducts(action) {
    const query = action.payload;
    try {
        const res = yield call(searchProducts, query)
        yield put({ type: productTypes.SEARCH_PRODUCTS_SUCCESS, payload: res.data })
    } catch (err) {
        yield put({
            type: productTypes.SEARCH_PRODUCTS_FAILURE,
            payload: { error: err.message },
        });
    }
}

export default function* productSaga() {
    yield takeLatest(productTypes.GET_FILTERED_PRODUCTS_REQUEST, watchGetFilteredProducts);
    yield takeLatest(productTypes.GET_CATEGORY_PRODUCTS_REQUEST, watchGetCategoryProducts);
    yield takeLatest(productTypes.GET_DETAIL_PRODUCT_REQUEST, watchGetDetailProduct);
    yield takeLatest(productTypes.SEARCH_PRODUCTS_REQUEST, watchSearchProducts);
    //Process every error reqeust.
    yield takeEvery([
        productTypes.GET_FILTERED_PRODUCTS_FAILURE,
        productTypes.GET_CATEGORY_PRODUCTS_FAILURE,
        productTypes.GET_DETAIL_PRODUCT_FAILURE,
        productTypes.SEARCH_PRODUCTS_FAILURE
    ],
        function* watchEveryFailure(action) {
            yield put({ type: productTypes.PRODUCT_ERROR, payload: { error: action.payload.error } });
            console.error(action.payload.error);
        });
}