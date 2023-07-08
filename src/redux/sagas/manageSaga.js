import { put, takeLatest, call, cancel, fork, select, delay } from 'redux-saga/effects';
import {
    createProduct,
    getAllProducts,
    updateProduct,
    updateUser,
    getAllUsers,
} from '../../services/axiosApi';
import { manageTypes } from '../manageModule';
import { userTypes } from '../userModule';
import { number } from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';

function* watchCreateProduct(action) {
    try {

        yield put({
            type: manageTypes.SET_LOADING_REQUEST,
        });
        const productValue = action.payload;
        const res = yield call(createProduct, productValue);
        const { data, status } = res;

        yield put({
            type: manageTypes.CREATE_PRODUCT_SUCCESS,
            payload: { message: `${data}.(${status})`, isLoading: false }

        });
        location.href = '/wave-sight/manage';
        yield call(watchCleanMessage);

    } catch (err) {
        const { data, status } = err.response;

        yield put({
            type: manageTypes.MANAGE_ANY_FAILURE,
            payload: `${data}.(${status})`
        });
        yield Promise.reject();
        yield call(watchCleanMessage);
    }
}


function* watchUpdateProduct(action) {
    try {
        const productValue = action.payload;
        const { product_id, productInfo } = productValue;
        const res = yield call(updateProduct, productValue);
        const { data, status } = res;

        const transProductInfo = {};
        for (const [key, value] of productInfo.entries()) {
            const allValues = productInfo.getAll(key);
            if (key === 'product_images') {
                transProductInfo[key] = data;
                continue;
            }
            if (allValues.length > 1) {
                transProductInfo[key] = allValues;
            } else {
                transProductInfo[key] = value === 'true' ? true : value === 'false' ? false : value;
            }
        }

        const { products: { items,
            totalPages } } = yield select(state => state.manage);

        const cloneItems = cloneDeep(items);

        const target = cloneItems.findIndex(product => product && product._id === product_id);

        cloneItems[target] = { ...transProductInfo, _id: product_id };
        yield put({
            type: manageTypes.UPDATE_PRODUCT_SUCCESS,
            payload: { products: { totalPages, items: cloneItems }, message: `Update success.(${status})` },
        });
        yield call(watchCleanMessage);
    } catch (err) {

        const { data, status } = err.response;
        yield put({
            type: manageTypes.MANAGE_ANY_FAILURE,
            payload: `${data}.(${status})`,
        });
        yield call(watchCleanMessage);
    }
}
function* watchUpdateUser(action) {
    try {
        const userInfo = action.payload;
        const { user_id } = userInfo;
        const res = yield call(updateUser, userInfo);
        const { data, status } = res;

        const { users } = yield select(state => state.manage);
        const cloneUsers = cloneDeep(users);
        const userIndex = cloneUsers.findIndex(user => user._id === user_id);
        if (userIndex !== -1) {
            cloneUsers[userIndex] = { ...cloneUsers[userIndex], ...userInfo };
        }

        yield put({
            type: manageTypes.UPDATE_USER_SUCCESS,
            payload: { users: cloneUsers, message: `${data}.(${status})` },
        });
        yield call(watchCleanMessage);
    } catch (err) {
        const { data, status } = err.response;
        yield put({
            type: manageTypes.MANAGE_ANY_FAILURE,
            payload: `${data}.(${status})`
        })
        yield call(watchCleanMessage);
    }
};

function* watchGetAllProducts(action) {
    const { pageQuery, currentIndex, limit } = action.payload;
    const startIndex = currentIndex * limit;
    try {
        const { items, totalPages } = yield select(state => state.manage.products);
        const newProducts = items
            ? [...items]
            : Array.from({ length: currentIndex }, () => null);
        if (!newProducts[startIndex]) {
            const res = yield call(getAllProducts, pageQuery);
            const result = res.data.result;
            const pageGap = Array.from(
                { length: startIndex - newProducts.length },
                () => null
            );
            newProducts.splice(startIndex, limit, ...pageGap, ...result);
            yield put({
                type: manageTypes.GET_ALL_PRODUCTS_SUCCESS,
                payload: {
                    items: newProducts,
                    totalPages: Number(res.data.totalPages),
                },
            });
        }
    } catch (err) {
        const { data, status } = err.response;
        yield put({
            type: manageTypes.MANAGE_ANY_FAILURE,
            payload: `${data}.(${status})`,
        });
    }
}

function* watchGetAllUsers() {
    try {
        const res = yield call(getAllUsers);
        yield put({ type: manageTypes.GET_ALL_USERS_SUCCESS, payload: res.data });
    } catch (err) {
        const { data, status } = err.response;
        yield put({
            type: manageTypes.MANAGE_ANY_FAILURE,
            payload: `${data}.(${status})`,
        });
    }
}

let cleanMessageTask;

function* watchCleanMessageWrapper() {
    if (cleanMessageTask) {
        yield cancel(cleanMessageTask);
    }
    cleanMessageTask = yield fork(watchCleanMessage);
}

function* watchCleanMessage() {
    yield delay(5000);
    yield put({ type: manageTypes.CLEAN_MESSAGE_SUCCESS });
}

export default function* manageSaga() {
    yield takeLatest(manageTypes.CREATE_PRODUCT_REQUEST, watchCreateProduct);
    yield takeLatest(manageTypes.UPDATE_PRODUCT_REQUEST, watchUpdateProduct);
    yield takeLatest(manageTypes.UPDATE_USER_REQUEST, watchUpdateUser);
    yield takeLatest(manageTypes.GET_ALL_PRODUCTS_REQUEST, watchGetAllProducts);
    yield takeLatest(manageTypes.GET_ALL_USERS_REQUEST, watchGetAllUsers);
    yield takeLatest(manageTypes.CLEAN_MESSAGE_REQUEST, watchCleanMessageWrapper);
}
