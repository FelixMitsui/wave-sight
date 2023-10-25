import {
  put,
  takeLatest,
  takeEvery,
  debounce,
  takeLeading,
  all,
  delay,
  fork,
  cancel,
  race,
  call,
  select,
} from 'redux-saga/effects';
import {
  login,
  logout,
  register,
  checkUserAuth,
  addItemToCart,
  createOrder,
  updateItemQuantity,
  updateUser,
  updatePassWord,
  deleteCartItem,
  deleteCartItems
} from '../../services/axiosApi';
import { userTypes } from '../userModule';
import cloneDeep from 'lodash/cloneDeep';

function* watchLogin(action) {

  try {

    const userInfo = action.payload;
    console.log("watchLogin")
    const res = yield call(login, userInfo);

    const { data, status } = res;

    yield put({ type: userTypes.LOGIN_SUCCESS, payload: data });

    localStorage.setItem('loginToken', 'true');

    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `Login success.(${status})` });

  } catch (err) {

    const { data, status } = err.response;
    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });

  }
}

function* watchLogout() {

  try {

    localStorage.clear();

    const res = yield call(logout);

    yield put({ type: userTypes.LOGOUT_SUCCESS });

    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: 'Logged out.' })
  } catch (err) {
    console.error(err);
  }
}

function* watchRegister(action) {

  try {

    const userInfo = action.payload;

    const res = yield call(register, userInfo);
    const { data, status } = res;

    yield put({ type: userTypes.REGISTER_SUCCESS, payload: data });

    localStorage.setItem('loginToken', 'true');

    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `Register Success.(${status})` });

  } catch (err) {
    const { status } = err.response;
    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `Username or Email already registered.(${status})` });
  }
}

function* watchUpdatePassWord(action) {

  try {

    const userInfo = action.payload;

    const res = yield call(updatePassWord, userInfo);

    const { data, status } = res;

    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });

  } catch (err) {

    const { data, status } = err.response;

    if (status === 401) {
      localStorage.clear();
    }
    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data} please login again.(${status})` });

  }
}

function* watchCheckUserAuth() {

  try {

    const res = yield call(checkUserAuth);
    const { data, status } = res;

    yield put({ type: userTypes.CHECK_USER_AUTH_SUCCESS, payload: data });

  } catch (err) {

    const { data, status } = err.response;

    if (status === 401) {

      localStorage.clear();

      yield put({
        type: userTypes.CHECK_USER_AUTH_FAILURE,
        payload: { info: {}, isLogin: false },
      });
    }

    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` })
  }
}

function* watchCreateOrder(action) {

  try {

    const orderItem = action.payload;

    const { user_id, ...rest } = orderItem;
    const cloneOrderItem = { ...rest };

    const res = yield call(createOrder, orderItem);
    const { data, status } = res;

    const { info } = yield select(state => state.user);
    const cloneInfo = { ...info };
    cloneInfo['user_order'].push(cloneOrderItem);

    yield put({
      type: userTypes.CREATE_ORDER_SUCCESS,
      payload: cloneInfo
    });

    yield put({
      type: userTypes.DELETE_CART_ITEMS_REQUEST,
      payload: user_id,
    });

    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });
  } catch (err) {
    const { data, status } = err.response;
    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });
  }
}

function* watchAddItemToCart(action) {

  try {

    const { productInfo } = action.payload;

    const res = yield call(addItemToCart, action.payload);
    const { status } = res;

    const { info } = yield select(state => state.user);

    const cloneInfo = { ...info };

    const existingItemIndex = cloneInfo.shopping_cart.findIndex(
      item =>
        item.product_name === productInfo.product_name &&
        item.product_color === productInfo.product_color &&
        item.product_size === productInfo.product_size
    );

    if (existingItemIndex !== -1) {
      cloneInfo.shopping_cart[existingItemIndex].product_quantity +=
        productInfo.product_quantity;
    } else {
      cloneInfo.shopping_cart.push(productInfo);
    }


    yield put({
      type: userTypes.ADD_ITEM_TO_CART_SUCCESS,
      payload: cloneInfo
    });


    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `Added ${productInfo.product_quantity} items.(${status})` });

  } catch (err) {

    const { data, status } = err.response;
    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });
  }
}

function* watchUpdateItemQuantity(action) {

  try {

    const quantity = action.payload;
    const { sid, product_quantity } = quantity;

    const res = yield call(updateItemQuantity, quantity);
    const { data, status } = res;

    const { info } = yield select(state => state.user);

    const cloneInfo = { ...info, shopping_cart: cloneDeep(info.shopping_cart) };
    const targetIndex = cloneInfo.shopping_cart.findIndex(
      item => item.sid === sid
    );

    if (targetIndex !== -1) {
      cloneInfo.shopping_cart[targetIndex].product_quantity = product_quantity;
    }

    yield put({
      type: userTypes.UPDATE_ITEM_QUANTITY_SUCCESS,
      payload: cloneInfo
    });

    yield delay(1000);
    yield put({ type: userTypes.STOP_LOADING });

    console.log(`${data}.(${status})`);

  } catch (err) {

    const { data, status } = err.response;
    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });
  }
}

function* watchUpdateUser(action) {
  try {
    const userInfo = action.payload;
    const { formValue: { userPhone, userAddress } } = userInfo;
    const res = yield call(updateUser, userInfo);
    const { data, status } = res;
    const { info } = yield select(state => state.user);
    const cloneInfo = {
      ...info,
      user_phone: userPhone,
      user_address: userAddress,
    };

    yield put({
      type: userTypes.UPDATE_USER_SUCCESS,
      payload: cloneInfo
    });
    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });

  } catch (err) {

    const { data, status } = err.response;
    yield put({ type: userTypes.SET_MESSAGE_SEND, payload: `${data}.(${status})` });
  }
}

function* watchDeleteCartItem(action) {

  try {

    const userInfo = action.payload;

    const res = yield call(deleteCartItem, userInfo);
    const { data, status } = res;

    const { info } = yield select(state => state.user);

    const filterInfo = info.shopping_cart.filter(
      (item, index) => item.sid !== userInfo.sid);

    const cloneInfo = { ...info, shopping_cart: [...filterInfo] };

    yield put({
      type: userTypes.DELETE_CART_ITEM_SUCCESS,
      payload: cloneInfo
    }
    );
  } catch (err) {
    const { data, status } = err.response;
    console.error(`${data}.(${status})`);
  }
}

function* watchDeleteCartItems(action) {

  try {

    const userId = action.payload;

    const res = yield call(deleteCartItems, userId);
    const { data, status } = res;

    const { info } = yield select(state => state.user);
    const cloneInfo = { ...info, shopping_cart: [] };

    yield put({ type: userTypes.DELETE_CART_ITEMS_SUCCESS, payload: cloneInfo });

  } catch (err) {
    const { data, status } = err.response;
    console.error(`${data}.(${status})`);
  }
}

function* watchSetMessage(action) {

  yield put({ type: userTypes.SET_MESSAGE_RECEIVE, payload: action.payload });
  yield delay(3000);
  yield put({ type: userTypes.CLEAN_MESSAGE });
}

export default function* userSaga() {
  yield takeLatest(userTypes.LOGIN_REQUEST, watchLogin);
  yield takeLatest(userTypes.LOGOUT_REQUEST, watchLogout);
  yield takeLatest(userTypes.REGISTER_REQUEST, watchRegister);
  yield takeLatest(userTypes.CHECK_USER_AUTH_REQUEST, watchCheckUserAuth);
  yield takeLatest(userTypes.ADD_ITEM_TO_CART_REQUEST, watchAddItemToCart);
  yield takeLatest(userTypes.CREATE_ORDER_REQUEST, watchCreateOrder);
  yield takeLatest(userTypes.UPDATE_PASSWORD_REQUEST, watchUpdatePassWord);
  yield takeLatest(userTypes.UPDATE_USER_REQUEST, watchUpdateUser);
  yield takeLatest(userTypes.UPDATE_ITEM_QUANTITY_REQUEST, watchUpdateItemQuantity);
  yield takeLatest(userTypes.DELETE_CART_ITEM_REQUEST, watchDeleteCartItem);
  yield takeLatest(userTypes.DELETE_CART_ITEMS_REQUEST, watchDeleteCartItems);
  yield takeLeading(userTypes.SET_MESSAGE_SEND, watchSetMessage);
}
