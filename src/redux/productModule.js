/** @format */

export const productTypes = {
  //Request.
  GET_FILTERED_PRODUCTS_REQUEST: 'GET_FILTERED_PRODUCTS_REQUEST',
  GET_CATEGORY_PRODUCTS_REQUEST: 'GET_CATEGORY_PRODUCTS_REQUEST',
  GET_DETAIL_PRODUCT_REQUEST: 'GET_DETAIL_PRODUCT_REQUEST',
  SEARCH_PRODUCTS_REQUEST: 'SEARCH_PRODUCTS_REQUEST',
  //Success
  GET_FILTERED_PRODUCTS_SUCCESS: 'GET_FILTERED_PRODUCTS_SUCCESS',
  GET_CATEGORY_PRODUCTS_SUCCESS: 'GET_CATEGORY_PRODUCTS_SUCCESS',
  GET_DETAIL_PRODUCT_SUCCESS: 'GET_DETAIL_PRODUCT_SUCCESS',
  SEARCH_PRODUCTS_SUCCESS: 'SEARCH_PRODUCTS_SUCCESS',
  //Failure.
  GET_FILTERED_PRODUCTS_FAILURE: 'GET_FILTERED_PRODUCTS_FAILURE',
  GET_CATEGORY_PRODUCTS_FAILURE: 'GET_CATEGORY_PRODUCTS_FAILURE',
  GET_DETAIL_PRODUCT_FAILURE: 'GET_DETAIL_PRODUCT_FAILURE',
  SEARCH_PRODUCTS_FAILURE: 'SEARCH_PRODUCTS_FAILURE',
  //Error message.
  PRODUCT_ERROR: 'PRODUCT_ERROR'
}

const initialState = {
  men: [],
  women: [],
  kid: [],
  other: [],
  search: [],
  error: ''
}

export function productReducers(state = initialState, action) {
  switch (action.type) {
    case productTypes.GET_FILTERED_PRODUCTS_SUCCESS:
      return { ...state, ...action.payload }
    case productTypes.GET_CATEGORY_PRODUCTS_SUCCESS:
      return { ...state, ...action.payload }
    case productTypes.GET_DETAIL_PRODUCT_SUCCESS:
      return { ...state, ...action.payload }
    case productTypes.SEARCH_PRODUCTS_SUCCESS:
      return { ...state, search: action.payload }
    case productTypes.PRODUCT_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}

