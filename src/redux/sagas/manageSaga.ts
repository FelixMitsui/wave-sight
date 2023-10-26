import { put, takeLatest, takeLeading, call, select, delay } from 'redux-saga/effects';
import {
    createProduct,
    getProducts,
    updateProduct,
    updateUser,
    getUsers,
    deleteProductImg
} from '../../services/axiosApi';
import { manageTypes } from '../manageModule';
import { userTypes } from '../userModule';
import cloneDeep from 'lodash/cloneDeep';

function* watchCreateProduct(action) {

    try {
        yield put({ type: manageTypes.LOADING });

        const productValue = action.payload;
        const res = yield call(createProduct, productValue);
        const { data, status } = res;

        const createDetailMap = new Map();

        createDetailMap.set(data.product_id, data);

        yield put({ type: manageTypes.CREATE_PRODUCT_SUCCESS, payload: createDetailMap });

        yield put({ type: manageTypes.FINISH });

        yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `Create successfully.(${status})` });


        location.href = `/manage`;

    } catch (err) {
        const { data, status } = err.response;
        yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });
    }
};

function* watchUpdateProduct(action) {

    try {

        yield put({ type: manageTypes.LOADING });

        yield put({
            type: manageTypes.SET_LOADING_SUCCESS,
            payload: { isLoading: true }
        });

        const productValue = action.payload;
        const { product_id } = productValue;

        const res = yield call(updateProduct, productValue);
        const { data, status } = res;

        const updateDetailMap = new Map();

        updateDetailMap.set(product_id, data);

        yield put({
            type: manageTypes.UPDATE_PRODUCT_SUCCESS,
            payload: updateDetailMap,
        });

        yield put({ type: manageTypes.FINISH });

        yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `Update successfully.(${status})` });

    } catch (err) {

        const { data, status } = err.response;
        yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });

    }
};

function* watchUpdateUser(action) {

    try {

        yield put({ type: manageTypes.LOADING });

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

        yield put({ type: manageTypes.UPDATE_USER_SUCCESS, payload: cloneUsers });

        yield put({ type: manageTypes.FINISH });

        yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });
    } catch (err) {
        const { data, status } = err.response;
        yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });
    }
};

function* watchManageGetProducts(action) {

    try {

        yield put({ type: manageTypes.LOADING });

        const { queryParams } = action.payload;

        const query = `?${queryParams.toString()}`;

        const res = yield call(getProducts, query);

        const { data } = res;

        const page = queryParams.get('page') || 1;

        const productsMap = new Map();

        productsMap.set(page, data);

        yield put({
            type: manageTypes.MANAGE_GET_PRODUCTS_SUCCESS,
            payload: productsMap
        });

        yield put({ type: manageTypes.FINISH });

    } catch (err) {
        const { data, status } = err.response;
        console.log(`${data}.(${status})`);
    }
};


function* watchGetUsers() {

    try {

        yield put({ type: manageTypes.LOADING });

        const res = yield call(getUsers);

        const { data, status } = res;

        yield put({ type: manageTypes.GET_USERS_SUCCESS, payload: data });

        yield put({ type: manageTypes.FINISH });

    } catch (err) {
        const { data, status } = err.response;
        console.log(`${data}.(${status})`);
    }
};

function* watchDeleteProductImg(action) {

    try {

        yield put({ type: manageTypes.LOADING });

        const res = yield call(deleteProductImg, action.payload);

        console.log(res)

        yield put({ type: manageTypes.DELETE_PRODUCT_IMG_SUCCESS });

        console.log(`already deleted img.(${status})`)

        yield put({ type: manageTypes.FINISH });

    } catch (err) {
        const { status } = err.response;
        console.log(`(${status})`);
    }
};

function* watchSetMessage(action) {
    yield put({ type: manageTypes.SET_MESSAGE_RECEIVE, payload: action.payload });
    yield delay(3000);
    yield put({ type: manageTypes.CLEAN_MESSAGE });
};

export default function* manageSaga() {
    yield takeLatest(manageTypes.CREATE_PRODUCT_REQUEST, watchCreateProduct);
    yield takeLatest(manageTypes.UPDATE_PRODUCT_REQUEST, watchUpdateProduct);
    yield takeLatest(manageTypes.UPDATE_USER_REQUEST, watchUpdateUser);
    yield takeLatest(manageTypes.MANAGE_GET_PRODUCTS_REQUEST, watchManageGetProducts);
    yield takeLatest(manageTypes.GET_USERS_REQUEST, watchGetUsers);
    yield takeLatest(manageTypes.DELETE_PRODUCT_IMG_REQUEST, watchDeleteProductImg);
    yield takeLeading(manageTypes.SET_MESSAGE_SEND, watchSetMessage);
};
