/** @format */

import {
  login,
  register,
  checkUserAuth,
  getUserInfo,
  getAllUsersInfo,
  updateUserInfo,
  setCartItem,
  updateItemQuantity,
  deleteCartItem
} from '../services/axiosApi'

const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  CHECK_USER_AUTH: 'CHECK_USER_AUTH',
  GET_USER_INFO: 'GET_USER_INFO',
  GET_ALL_USERS_INFO: 'GET_ALL_USERS_INFO',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  SET_CART_ITEM: 'SET_CART_ITEM',
  DELETE_CART_ITEM: 'DELETE_CART_ITEM'
}

const initialState = {
  user: {},
  users: []
}

// Reducer
export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, user: action.payload }

    case types.LOGOUT:
      return { ...state, user: {} }

    case types.REGISTER:
      return { ...state, user: action.payload }

    case types.CHECK_USER_AUTH:
      return { ...state, user: action.payload }

    case types.GET_USER_INFO:
      return { ...state, user: action.payload }

    case types.GET_ALL_USERS_INFO:
      return { ...state, users: action.payload }

    case types.UPDATE_USER_INFO:
      return { ...state, users: action.payload }


    case types.DELETE_CART_ITEM:
      return { ...state, user: action.payload }

    default:
      return state
  }
}

// Action Creators
export const userActions = {
  login: function (val) {
    return (dispatch) => {
      login(val)
        .then((res) => {
          localStorage.setItem('token', res.data.token)

          alert('Login Success!!')
          dispatch({ type: types.LOGIN, payload: res.data.user })
        })
        .catch((err) => {
          alert('Incorrect Password or Email')
          throw err
        })
    }
  },
  logout: function () {
    return (dispatch) => {
      localStorage.clear()
      dispatch({ type: types.LOGOUT })
      alert('Logout!!')
    }
  },
  register: function (val) {
    return (dispatch) => {
      register(val)
        .then((res) => {
          localStorage.setItem('token', res.data.token)
          alert('Register Success!!')
          dispatch({ type: types.REGISTER, payload: res.data.user })
        })
        .catch((err) => {
          alert('Username or Email already registered')
          console.log(err)
        })
    }
  },
  checkUserAuth: function () {
    return (dispatch) => {
      checkUserAuth()
        .then((res) => {
          dispatch({ type: types.CHECK_USER_AUTH, payload: res.data.result })
        })
        .catch((err) => {
          throw "checkUserAuth" + err
        })
    }
  },
  getUserInfo: function (userId) {
    return (dispatch) => {
      getUserInfo(userId)
        .then((res) => {
          dispatch({ type: types.GET_USER_INFO, payload: res.data.result })
        })
        .catch((err) => {
          throw "getUserInfo" + err
        })
    }
  },
  getAllUsersInfo: function () {
    return (dispatch) => {
      getAllUsersInfo()
        .then((res) => {
          dispatch({ type: types.GET_ALL_USERS_INFO, payload: res.data.result })
        })
        .catch((err) => {
          throw "getAllUsersInfo" + err
        })
    }
  },
  updateUserInfo: function (userInfo) {
    return (dispatch) => {
      updateUserInfo(userInfo).then((res) => {
        dispatch({ type: types.UPDATE_USER_INFO, payload: res.data.result })
        console.log(res.status)
      }).catch((err) => {
        throw "updateUserInfo" + err
      })
    }
  },
  setCartItem: function (cartItem) {
    return () => {
      setCartItem(cartItem)
        .then((res) => { console.log('shopping_cart:' + res.data) })
        .catch((err) => {
          throw "setCartItem" + err
        })
    }
  },
  updateItemQuantity: function (quantity) {
    return async (dispatch) => {
      await updateItemQuantity(quantity)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          throw "updateItemQuantity:" + err
        })
    }

  },
  deleteCartItem: function (userInfo) {
    return (dispatch) => {
      deleteCartItem(userInfo)
        .then((res) => {
          dispatch({ type: types.DELETE_CART_ITEM, payload: res.data.result })
        })
        .catch((err) => {
          throw "deleteCartItem:" + err
        })
    }
  },
}
