import { Product } from "../types/Product";
import { User } from '../types/User';

export const manageTypes = {
  //REQUEST
  MANAGE_GET_PRODUCTS_REQUEST: 'MANAGE_GET_PRODUCTS_REQUEST',
  CREATE_PRODUCT_REQUEST: 'CREATE_PRODUCT_REQUEST',
  UPDATE_PRODUCT_REQUEST: 'UPDATE_PRODUCT_REQUEST',
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  DELETE_PRODUCT_IMG_REQUEST: 'DELETE_PRODUCT_IMG_REQUEST',
  //SUCCESS
  MANAGE_GET_PRODUCTS_SUCCESS: 'MANAGE_GET_PRODUCTS_SUCCESS',
  CREATE_PRODUCT_SUCCESS: 'CREATE_PRODUCT_SUCCESS',
  UPDATE_PRODUCT_SUCCESS: 'UPDATE_PRODUCT_SUCCESS',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  SET_LOADING_SUCCESS: 'SET_LOADING_SUCCESS',
  DELETE_PRODUCT_IMG_SUCCESS: 'DELETE_PRODUCT_IMG_SUCCESS',


  //Loading
  LOADING: 'LOADING',
  FINISH: 'FINISH',

  //Message
  SET_MESSAGE_SEND: 'SET_MESSAGE_SEND',
  SET_MESSAGE_RECEIVE: 'SET_MESSAGE_RECEIVE',
  CLEAN_MESSAGE: 'CLEAN_MESSAGE',
};

export type ManageSelectState = {
  products: Map<number, Product[]>;
  productDetail: Map<number, Product>;
  userDetail: Map<number, User>;
  users: User[];
  message: null | string;
  isLoading: boolean;
}

const initialState: ManageSelectState = {
  products: new Map(),
  productDetail: new Map(),
  userDetail: new Map(),
  users: [],
  message: null,
  isLoading: false
};

export default function manageReducers(state = initialState, action) {

  switch (action.type) {

    case manageTypes.MANAGE_GET_PRODUCTS_SUCCESS:

      return { ...state, products: new Map([...state.products, ...action.payload]) };

    case manageTypes.CREATE_PRODUCT_SUCCESS:

      return { ...state, isLoading: false, productDetail: new Map([...state.productDetail, ...action.payload]) };

    case manageTypes.UPDATE_PRODUCT_SUCCESS:

      return { ...state, isLoading: false, productDetail: new Map([...state.productDetail, ...action.payload]) };

    case manageTypes.UPDATE_USER_SUCCESS:
      return { ...state, ...action.payload };

    case manageTypes.GET_USERS_SUCCESS:
      return { ...state, users: action.payload };

    case manageTypes.DELETE_PRODUCT_IMG_SUCCESS:
      return { ...state };



    case manageTypes.LOADING:

      return { ...state, isLoading: true };

    case manageTypes.FINISH:

      return { ...state, isLoading: false };

    case manageTypes.SET_LOADING_SUCCESS:
      return { ...state, ...action.payload };

    case manageTypes.SET_MESSAGE_RECEIVE:
      return { ...state, message: action.payload };

    case manageTypes.CLEAN_MESSAGE:
      return { ...state, message: null };
    default:
      return state;
  }
}
