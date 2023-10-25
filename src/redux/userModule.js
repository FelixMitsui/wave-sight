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
  DELETE_CART_ITEMS_REQUEST: 'DELETE_CART_ITEMS_REQUEST',
  //Success
  LOGIN_SUCCESS: 'LOGIN_REQUEST_SUCCESS',
  LOGOUT_SUCCESS: 'LOGOUT_REQUEST_SUCCESS',
  REGISTER_SUCCESS: 'REGISTER_REQUEST_SUCCESS',
  CHECK_USER_AUTH_SUCCESS: 'CHECK_USER_AUTH_REQUEST_SUCCESS',
  CREATE_ORDER_SUCCESS: ' CREATE_ORDER_SUCCESS',
  UPDATE_ITEM_QUANTITY_SUCCESS: 'UPDATE_ITEM_QUANTITY_REQUEST_SUCCESS',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_INFO_SUCCESS',
  ADD_ITEM_TO_CART_SUCCESS: 'ADD_ITEM_TO_CART_SUCCESS',
  DELETE_CART_ITEM_SUCCESS: 'DELETE_CART_ITEM_REQUEST_SUCCESS',
  DELETE_CART_ITEMS_SUCCESS: 'DELETE_CART_ITEMS_SUCCESS',
  //Message
  SET_MESSAGE_SEND: 'SET_MESSAGE_SEND',
  SET_MESSAGE_RECEIVE: 'SET_MESSAGE_RECEIVE',
  CLEAN_MESSAGE: 'CLEAN_MESSAGE',

  //Loading
  LOADING: 'LOADING',
  FINISH: 'FINISH',
  //Failure
  CHECK_USER_AUTH_FAILURE: 'CHECK_USER_AUTH_FAILURE'
};

const initialState = {
  info: {},
  isLogin: undefined,
  isLoading: false,
  message: null,
};

// Reducer
export default function userReducers(state = initialState, action) {

  switch (action.type) {

    case userTypes.LOGIN_SUCCESS:

      return { ...state, info: { ...action.payload }, isLogin: true };

    case userTypes.LOGOUT_SUCCESS:
      return { ...state, info: {}, isLogin: false };

    case userTypes.REGISTER_SUCCESS:

      return { ...state, info: { ...action.payload }, isLogin: true };

    case userTypes.CHECK_USER_AUTH_SUCCESS:

      return { ...state, info: { ...action.payload }, isLogin: true };

    case userTypes.CREATE_ORDER_SUCCESS:
      return { ...state, info: { ...action.payload } };

    case userTypes.UPDATE_ITEM_QUANTITY_SUCCESS:
      return { ...state, info: { ...action.payload } };

    case userTypes.UPDATE_USER_SUCCESS:
      return { ...state, info: { ...action.payload } };

    case userTypes.ADD_ITEM_TO_CART_SUCCESS:
      return { ...state, info: { ...action.payload } };

    case userTypes.DELETE_CART_ITEM_SUCCESS:
      return { ...state, info: { ...action.payload } };

    case userTypes.DELETE_CART_ITEMS_SUCCESS:
      return { ...state, info: { ...action.payload } };

    case userTypes.SET_MESSAGE_RECEIVE:
      return { ...state, message: action.payload };

    case userTypes.CLEAN_MESSAGE:
      return { ...state, message: null };

    case userTypes.LOADING:
      return { ...state, isLoading: true };

    case userTypes.FINISH:
      return { ...state, isLoading: false };

    case userTypes.CHECK_USER_AUTH_FAILURE:
      return { ...state, info: { ...action.payload } };

    default:
      return state;
  }
}
