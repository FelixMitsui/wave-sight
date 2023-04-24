/** @format */

export const userTypes = {
  //Request
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  CHECK_USER_AUTH_REQUEST: 'CHECK_USER_AUTH_REQUEST',
  GET_USER_INFO_REQUEST: 'GET_USER_INFO_REQUEST',
  UPDATE_ITEM_QUANTITY_REQUEST: 'UPDATE_ITEM_QUANTITY_REQUEST',
  UPDATE_PASSWORD_REQUEST: ' UPDATE_PASSWORD_REQUEST',
  SET_USER_CART_REQUEST: 'SET_USER_CART_REQUEST',
  DELETE_CART_ITEM_REQUEST: 'DELETE_CART_ITEM_REQUEST',

  //Success
  LOGIN_SUCCESS: 'LOGIN_REQUEST_SUCCESS',
  LOGOUT_SUCCESS: 'LOGOUT_REQUEST_SUCCESS',
  REGISTER_SUCCESS: 'REGISTER_REQUEST_SUCCESS',
  CHECK_USER_AUTH_SUCCESS: 'CHECK_USER_AUTH_REQUEST_SUCCESS',
  GET_USER_INFO_SUCCESS: 'GET_USER_INFO_REQUEST_SUCCESS',
  UPDATE_ITEM_QUANTITY_SUCCESS: 'UPDATE_ITEM_QUANTITY_REQUEST_SUCCESS',
  UPDATE_PASSWORD_SUCCESS: ' UPDATE_PASSWORD_SUCCESS',
  SET_USER_CART_SUCCESS: 'SET_USER_CART_SUCCESS',
  DELETE_CART_ITEM_SUCCESS: 'DELETE_CART_ITEM_REQUEST_SUCCESS',
  //Failed
  CHECK_USER_AUTH_FAILED: 'CHECK_USER_AUTH_FAILED',
  USER_FAILURE: 'USER_FAILED',
}

const initialState = {
  user: {},
  error: ''
}
// Reducer
export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case userTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload, error: '' }
    case userTypes.LOGOUT_SUCCESS:
      return { ...state, user: {}, error: '' }
    case userTypes.REGISTER_SUCCESS:
      return { ...state, user: action.payload }
    case userTypes.CHECK_USER_AUTH_SUCCESS:
      return { ...state, user: action.payload }
    case userTypes.GET_USER_INFO_SUCCESS:
      return { ...state, user: action.payload }
    case userTypes.UPDATE_ITEM_QUANTITY_SUCCESS:
      return { ...state, user: action.payload }
    case userTypes.UPDATE_PASSWORD_SUCCESS:
      return { ...state }
    case userTypes.SET_USER_CART_SUCCESS:
      return { ...state, user: action.payload }
    case userTypes.DELETE_CART_ITEM_SUCCESS:
      return { ...state, user: action.payload }
    case userTypes.CHECK_USER_AUTH_FAILED:
      return state
    case userTypes.USER_FAILURE:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
