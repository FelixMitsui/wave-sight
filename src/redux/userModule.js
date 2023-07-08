export const userTypes = {
  //Request
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  CHECK_USER_AUTH_REQUEST: 'CHECK_USER_AUTH_REQUEST',
  GET_USER_INFO_REQUEST: 'GET_USER_INFO_REQUEST',
  CREATE_ORDER_REQUEST: ' CREATE_ORDER_REQUEST',
  UPDATE_USER_REQUEST: 'UPDATE_USER_INFO_REQUEST',
  UPDATE_ITEM_QUANTITY_REQUEST: 'UPDATE_ITEM_QUANTITY_REQUEST',
  UPDATE_PASSWORD_REQUEST: ' UPDATE_PASSWORD_REQUEST',
  ADD_ITEM_TO_CART_REQUEST: 'ADD_ITEM_TO_CART_REQUEST',
  DELETE_CART_ITEM_REQUEST: 'DELETE_CART_ITEM_REQUEST',
  DELETE_CART_All_ITEMS_REQUEST: 'DELETE_CART_All_ITEMS_REQUEST',
  WARNING_MESSAGE_REQUEST: 'WARNING_MESSAGE_REQUEST',
  CLEAN_MESSAGE_REQUEST: 'CLEAN_MESSAGE_REQUEST',
  //Success
  LOGIN_SUCCESS: 'LOGIN_REQUEST_SUCCESS',
  LOGOUT_SUCCESS: 'LOGOUT_REQUEST_SUCCESS',
  REGISTER_SUCCESS: 'REGISTER_REQUEST_SUCCESS',
  CHECK_USER_AUTH_SUCCESS: 'CHECK_USER_AUTH_REQUEST_SUCCESS',
  CREATE_ORDER_SUCCESS: ' CREATE_ORDER_SUCCESS',
  UPDATE_ITEM_QUANTITY_SUCCESS: 'UPDATE_ITEM_QUANTITY_REQUEST_SUCCESS',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_INFO_SUCCESS',
  UPDATE_PASSWORD_SUCCESS: 'UPDATE_PASSWORD_SUCCESS',
  ADD_ITEM_TO_CART_SUCCESS: 'ADD_ITEM_TO_CART_SUCCESS',
  DELETE_CART_ITEM_SUCCESS: 'DELETE_CART_ITEM_REQUEST_SUCCESS',
  DELETE_CART_All_ITEMS_SUCCESS: 'DELETE_CART_All_ITEMS_SUCCESS',
  WARNING_MESSAGE_SUCCESS: 'WARNING_MESSAGE_SUCCESS',
  CLEAN_MESSAGE_SUCCESS: 'CLEAN_MESSAGE_SUCCESS',
  //Failed
  USER_ANY_FAILURE: ' USER_ANY_FAILURE',
  CHECK_USER_AUTH_FAILURE: 'CHECK_USER_AUTH_FAILURE',



};

const initialState = {
  info: {},
  isLogin: undefined,
  message: null,
};
// Reducer
export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case userTypes.LOGIN_SUCCESS:
      return { ...action.payload, isLogin: true };
    case userTypes.LOGOUT_SUCCESS:
      return { info: {}, isLogin: false, message: action.payload };
    case userTypes.REGISTER_SUCCESS:
      return { ...action.payload, isLogin: true };
    case userTypes.CHECK_USER_AUTH_SUCCESS:
      return { ...state, info: action.payload, isLogin: true };
    case userTypes.CREATE_ORDER_SUCCESS:
      return { ...state, ...action.payload };
    case userTypes.UPDATE_ITEM_QUANTITY_SUCCESS:
      return { ...state, ...action.payload };
    case userTypes.UPDATE_USER_SUCCESS:
      return { ...state, ...action.payload };
    case userTypes.UPDATE_PASSWORD_SUCCESS:
      return { ...state, message: action.payload };
    case userTypes.ADD_ITEM_TO_CART_SUCCESS:
      return { ...state, ...action.payload };
    case userTypes.DELETE_CART_ITEM_SUCCESS:
      return { ...state, info: action.payload };
    case userTypes.DELETE_CART_All_ITEMS_SUCCESS:
      return { ...state, info: action.payload };
    case userTypes.WARNING_MESSAGE_SUCCESS:
      return { ...state, message: action.payload };
    case userTypes.CLEAN_MESSAGE_SUCCESS:
      return { ...state, message: null };
    case userTypes.USER_ANY_FAILURE:
      return { ...state, message: action.payload };
    case userTypes.CHECK_USER_AUTH_FAILURE:
      return { ...action.payload };
    default:
      return state;
  }
}
