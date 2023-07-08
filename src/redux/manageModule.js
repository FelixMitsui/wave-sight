/** @format */

export const manageTypes = {
  //REQUEST
  GET_ALL_PRODUCTS_REQUEST: 'GET_ALL_PRODUCTS_REQUEST',
  CREATE_PRODUCT_REQUEST: 'CREATE_PRODUCT_REQUEST',
  UPDATE_PRODUCT_REQUEST: 'UPDATE_PRODUCT_REQUEST',
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  GET_ALL_USERS_REQUEST: 'GET_ALL_USERS_REQUEST',
  CLEAN_MESSAGE_REQUEST: 'CLEAN_MESSAGE_REQUEST',
  SET_LOADING_REQUEST: 'SET_LOADING_REQUEST',
  //SUCCESS
  GET_ALL_PRODUCTS_SUCCESS: 'GET_ALL_PRODUCTS_SUCCESS',
  CREATE_PRODUCT_SUCCESS: 'CREATE_PRODUCT_SUCCESS',
  UPDATE_PRODUCT_SUCCESS: 'UPDATE_PRODUCT_SUCCESS',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  GET_ALL_USERS_SUCCESS: 'GET_ALL_USERS_SUCCESS',
  CLEAN_MESSAGE_SUCCESS: 'CLEAN_MESSAGE_SUCCESS',
  //FAILED
  MANAGE_ANY_FAILURE: ' MANAGE_ANY_FAILURE',


};

const initialState = {
  products: {
    items: [],
    totalPages: 1,
  },
  users: [],
  message: null,
  isLoading: false
};

export default function manageReducers(state = initialState, action) {
  switch (action.type) {
    case manageTypes.GET_ALL_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case manageTypes.CREATE_PRODUCT_SUCCESS:
      return { ...state, ...action.payload };
    case manageTypes.UPDATE_PRODUCT_SUCCESS:
      return { ...state, ...action.payload };
    case manageTypes.UPDATE_USER_SUCCESS:
      return { ...state, ...action.payload };
    case manageTypes.GET_ALL_USERS_SUCCESS:
      return { ...state, users: action.payload };
    case manageTypes.SET_LOADING_REQUEST:
      return { ...state, isLoading: true };
    case manageTypes.CLEAN_MESSAGE_SUCCESS:
      return { ...state, message: null };
    case manageTypes.MANAGE_ANY_FAILURE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
