import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
    createProduct,
    getAllProducts,
    updateProduct,
    updateUserInfo,
    getAllUsers
} from '../services/axiosApi'
import { manageTypes } from '../redux/manageModule';


function* watchCreateProduct(action) {
    try {
        const productValue = action.payload;
        const res = yield call(createProduct, productValue);
        const products = yield select((state) => state.manage.products);
        const newProducts = [...products];
        newProducts.push(res.data)
        yield put({ type: manageTypes.CREATE_PRODUCT_SUCCESS, payload: newProducts })
        alert('create success!')
    } catch (err) {
        yield put({ type: manageTypes.MANAGE_FAILURE, error: err.response.data })
        alert(`${err.response.data}`)
    }
}

function* watchUpdateProduct(action) {
    try {
        const productValue = action.payload
        const res = yield call(updateProduct, productValue)
        const products = yield select(state => state.manage.products)
        const newState = [...products];
        const target = newState.findIndex((product) => product._id === res.data._id);
        newState[target] = res.data;
        yield put({ type: manageTypes.UPDATE_PRODUCT_SUCCESS, payload: newState })
        alert('Update success!')
    } catch (err) {
        alert('Update failed!')
        console.error(`${err.response.data}`)
    }
}
function* watchUpdateUserInfo(action) {
    try {
        const userValue = action.payload
        const res = yield call(updateUserInfo, userValue)
        const updatedUser = res.data
        const { users } = yield select((state) => state.manage)
        const userIndex = users.findIndex((user) => user._id === updatedUser._id)
        const updatedUsers = [...users]
        if (userIndex !== -1) {
            updatedUsers[userIndex] = updatedUser
        }
        yield put({ type: manageTypes.UPDATE_USER_INFO_SUCCESS, payload: updatedUsers })
        alert(`${updatedUser.user_name} Update success.`)
    } catch (err) {
        console.error(`${err.response.data}`)
    }
}
function* watchGetAllProducts() {
    try {
        const res = yield call(getAllProducts)
        yield put({ type: manageTypes.GET_ALL_PRODUCTS_SUCCESS, payload: res.data })
    } catch (err) {
        console.error(`${err.response.data}`)
    }
}

function* watchGetAllUsers() {
    try {
        const res = yield call(getAllUsers)
        yield put({ type: manageTypes.GET_ALL_USERS_SUCCESS, payload: res.data })
    } catch (err) {
        throw "getAllUsers" + err
    }
}

export default function* manageSaga() {
    yield takeLatest(manageTypes.CREATE_PRODUCT_REQUEST, watchCreateProduct)
    yield takeLatest(manageTypes.UPDATE_PRODUCT_REQUEST, watchUpdateProduct)
    yield takeLatest(manageTypes.UPDATE_USER_INFO_REQUEST, watchUpdateUserInfo)
    yield takeLatest(manageTypes.GET_ALL_PRODUCTS_REQUEST, watchGetAllProducts)
    yield takeLatest(manageTypes.GET_ALL_USERS_REQUEST, watchGetAllUsers)
}

