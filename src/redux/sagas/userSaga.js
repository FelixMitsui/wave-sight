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
  deleteCartAllItems,
} from '../../services/axiosApi';
import { userTypes } from '../userModule';
import cloneDeep from 'lodash/cloneDeep';

function* watchLogin(action) {
  try {
    const userInfo = action.payload;
    const res = yield call(login, userInfo);
    const { data, status } = res;
    yield put({ type: userTypes.LOGIN_SUCCESS, payload: { info: data, message: `Login success.(${status})` } });
    localStorage.setItem('loginToken', 'true');
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  } catch (err) {
    const { data, status } = err.response;
    yield put({
      type: userTypes.USER_ANY_FAILURE,
      payload: `${data}.(${status})`,
    });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  }
}
function* watchLogout() {
  try {
    localStorage.clear();
    const res = yield call(logout);
    yield put({ type: userTypes.LOGOUT_SUCCESS, payload: 'Logged out.' });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  } catch (err) {
    console.error(err);
  }
}
function* watchRegister(action) {
  try {
    const userInfo = action.payload;
    const res = yield call(register, userInfo);
    const { data, status } = res;
    yield put({ type: userTypes.REGISTER_SUCCESS, payload: { info: data, message: `Register Success.(${status})` } });
    localStorage.setItem('loginToken', 'true');
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  } catch (err) {
    const { data, status } = err.response;
    yield put({
      type: userTypes.USER_ANY_FAILURE,
      payload: 'Username or Email already registered',
    });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  }
}

function* watchUpdatePassWord(action) {
  try {
    const userInfo = action.payload;
    const res = yield call(updatePassWord, userInfo);
    const { data, status } = res;
    yield put({ type: userTypes.UPDATE_PASSWORD_SUCCESS, payload: `${data}.(${status})` });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  } catch (err) {
    const { data, status } = err.response;
    if (status === 401) {
      localStorage.clear();
    }
    yield put({
      type: userTypes.USER_ANY_FAILURE,
      payload: `${data} please login again.(${status})`
    });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  }
}

function* watchCheckUserAuth() {
  try {
    const res = yield call(checkUserAuth);
    yield put({ type: userTypes.CHECK_USER_AUTH_SUCCESS, payload: res.data });
  } catch (err) {
    const { data, status } = err.response;
    if (status === 401) {
      localStorage.clear();
      yield put({
        type: userTypes.CHECK_USER_AUTH_FAILURE,
        payload: { info: {}, isLogin: false, message: `${data}.(${status})` },
      });
    } else {
      yield put({
        type: userTypes.USER_ANY_FAILURE,
        payload: `${data}.(${status})`
      });
    }
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
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
      payload: { info: cloneInfo, message: `${data}.(${status})` }
    });
    location.href = '/wave-sight/user/order';
    yield put({
      type: userTypes.DELETE_CART_All_ITEMS_REQUEST,
      payload: orderItem.user_id,
    });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  } catch (err) {
    const { data, status } = err.response;
    yield put({
      type: userTypes.USER_ANY_FAILURE,
      payload: `${data}.(${status})`
    });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  }
}

function* watchAddItemToCart(action) {
  try {
    const cartInfo = action.payload;
    const productInfo = { ...cartInfo.productInfo };

    const res = yield call(addItemToCart, cartInfo);
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
      payload: { info: cloneInfo, message: `Added ${cartInfo.productInfo.product_quantity} items.(${res.status})` }
    });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  } catch (err) {
    const { data, status } = err.response;
    yield put({
      type: userTypes.USER_ANY_FAILURE,
      payload: `${data}.(${status})`
    });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  }
}

function* watchUpdateItemQuantity(action) {
  try {
    const quantity = action.payload;
    const { product_mark, product_quantity } = quantity;

    const res = yield call(updateItemQuantity, quantity);
    const { data, status } = res;

    const { info } = yield select(state => state.user);
    const cloneInfo = { ...info, shopping_cart: cloneDeep(info.shopping_cart) };
    const targetIndex = cloneInfo.shopping_cart.findIndex(
      item => item.product_mark === product_mark
    );
    if (targetIndex !== -1) {
      cloneInfo.shopping_cart[targetIndex].product_quantity = product_quantity;
    }
    yield put({
      type: userTypes.UPDATE_ITEM_QUANTITY_SUCCESS,
      payload: { info: cloneInfo, message: `${data}.(${status})` }
    });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  } catch (err) {
    const { data, status } = err.response;
    yield put({
      type: userTypes.USER_ANY_FAILURE,
      payload: `${data}.(${status})`
    }
    );
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
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
      payload: { info: cloneInfo, message: `${data}.(${status})` }
    });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  } catch (err) {
    const { data, status } = err.response;
    yield put({
      type: userTypes.USER_ANY_FAILURE,
      payload: `${data}(${status})`,
    });
    yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST })
  }
}

function* watchDeleteCartItem(action) {
  try {
    const userInfo = action.payload;
    const res = yield call(deleteCartItem, userInfo);
    const { data, status } = res;
    console.log(`${data}.(${status})`);
    const { info } = yield select(state => state.user);
    const filterInfo = info.shopping_cart.filter(
      (item, index) => item.product_mark !== userInfo.product_mark
    );
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
function* watchDeleteCartAllItems(action) {
  try {
    const userId = action.payload;
    const res = yield call(deleteCartAllItems, userId);
    const { data, status } = res;
    console.log(`${data}.(${status})`);
    const { info } = yield select(state => state.user);
    const cloneInfo = { ...info, shopping_cart: [] };
    yield put({ type: userTypes.DELETE_CART_All_ITEMS_SUCCESS, payload: cloneInfo });
  } catch (err) {
    const { data, status } = err.response;
    console.error(`${data}.(${status})`);
  }
}

function* watchWarningMessage(action) {
  yield put({ type: userTypes.WARNING_MESSAGE_SUCCESS, payload: action.payload });
  yield put({ type: userTypes.CLEAN_MESSAGE_REQUEST });

}
let cleanMessageTask;

function* watchCleanMessageWrapper() {
  if (cleanMessageTask) {
    yield cancel(cleanMessageTask);
  }
  cleanMessageTask = yield fork(performCleanMessage);
}

function* performCleanMessage() {
  yield delay(5000);
  yield put({ type: userTypes.CLEAN_MESSAGE_SUCCESS });
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
  yield takeLatest(userTypes.DELETE_CART_All_ITEMS_REQUEST, watchDeleteCartAllItems);
  yield takeLeading(userTypes.WARNING_MESSAGE_REQUEST, watchWarningMessage);
  yield takeLatest(userTypes.CLEAN_MESSAGE_REQUEST, watchCleanMessageWrapper);
}
