import { put, takeLatest, takeEvery, all, delay, call, select } from 'redux-saga/effects';
import {
    login, logout, register, checkUserAuth, getUserInfo,
    setUserCart, updateItemQuantity, updatePassWord, deleteCartItem
} from '../services/axiosApi'
import { userTypes } from '../redux/userModule';

function* watchLogin(action) {
    try {
        const userInfo = action.payload
        const res = yield call(login, userInfo)
        yield put({ type: userTypes.LOGIN_SUCCESS, payload: res.data })
        alert(`Login success. (${res.status})`)
    } catch (err) {
        alert(`${err.response.data} (${err.response.status})`)
        console.error(`Login status: (${err.response.status})`)
    }
}
function* watchLogout() {
    try {
        const res = yield call(logout)
        yield put({ type: userTypes.LOGOUT_SUCCESS })
        alert(res.data)
    } catch (err) {
        console.error(err)
    }
}
function* watchRegister(action) {
    try {
        const userInfo = action.payload
        const res = yield call(register, userInfo)
        yield put({ type: userTypes.REGISTER_SUCCESS, payload: res.data })
        alert('Register Success!!')
    } catch (err) {
        alert('Username or Email already registered')
        console.error(err)
    }
}

function* watchUpdatePassWord(action) {
    try {
        const userInfo = action.payload
        const res = yield call(updatePassWord, userInfo)
        yield put({ type: userTypes.UPDATE_PASSWORD_SUCCESS })
        alert(`${res.data}`)
    } catch (err) {
        yield put({ type: userTypes.USER_FAILURE, payload: err.response.data })

        if (err.response.status === 401) {
            const res = yield call(logout)
            yield put({ type: userTypes.LOGOUT_SUCCESS })
            location.href = '/'
            alert('You have been logged out due to inactivity.')
        } else {
            alert(`${err.response.data}`)
        }
        console.error(err)
    }
}

function* watchCheckUserAuth() {
    try {
        const res = yield call(checkUserAuth)
        yield put({ type: userTypes.CHECK_USER_AUTH_SUCCESS, payload: res.data })
    } catch (err) {
        yield put({ type: userTypes.CHECK_USER_AUTH_FAILED })
        console.error(err)
    }
}

function* watchGetUserInfo(action) {
    try {
        const userId = action.payload
        const res = yield call(getUserInfo, userId)
        yield put({ type: userTypes.GET_USER_INFO_SUCCESS, payload: res.data })
    } catch (err) {

        console.error(err)
    }
}

function* watchSetUserCart(action) {
    try {
        const cartItem = action.payload
        const res = yield call(setUserCart, cartItem)
        yield put({ type: userTypes.SET_USER_CART_SUCCESS, payload: res.data })
        alert(`Added ${cartItem.productInfo.product_quantity} items.`)
    } catch (err) {
        alert(`Add failed.`)
        console.error(err)
    }
}
function* watchUpdateItemQuantity(action) {
    try {
        const quantity = action.payload
        const res = yield call(updateItemQuantity, quantity)
        yield put({ type: userTypes.UPDATE_ITEM_QUANTITY_SUCCESS, payload: res.data })
    } catch (err) {
        console.error(err)
    }
}

function* watchDeleteCartItem(action) {
    try {
        const userInfo = action.payload
        const res = yield call(deleteCartItem, userInfo)
        yield put({ type: userTypes.DELETE_CART_ITEM_SUCCESS, payload: res.data })
    } catch (err) {
        console.error(err)
    }
}

export default function* userSaga() {
    yield takeLatest(userTypes.LOGIN_REQUEST, watchLogin)
    yield takeLatest(userTypes.LOGOUT_REQUEST, watchLogout)
    yield takeLatest(userTypes.REGISTER_REQUEST, watchRegister)
    yield takeLatest(userTypes.CHECK_USER_AUTH_REQUEST, watchCheckUserAuth)
    yield takeLatest(userTypes.GET_USER_INFO_REQUEST, watchGetUserInfo)
    yield takeLatest(userTypes.SET_USER_CART_REQUEST, watchSetUserCart)
    yield takeLatest(userTypes.UPDATE_PASSWORD_REQUEST, watchUpdatePassWord)
    yield takeLatest(userTypes.UPDATE_ITEM_QUANTITY_REQUEST, watchUpdateItemQuantity)
    yield takeLatest(userTypes.DELETE_CART_ITEM_REQUEST, watchDeleteCartItem)
}
