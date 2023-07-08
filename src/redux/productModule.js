
export const productTypes = {
  //Request.
  GET_CAROUSEL_PRODUCTS_REQUEST: 'GET_CAROUSEL_PRODUCTS_REQUEST',
  GET_CATEGORY_PRODUCTS_REQUEST: 'GET_CATEGORY_PRODUCTS_REQUEST',
  GET_DETAIL_PRODUCT_REQUEST: 'GET_DETAIL_PRODUCT_REQUEST',
  SEARCH_PRODUCTS_REQUEST: 'SEARCH_PRODUCTS_REQUEST',
  //Success
  GET_CAROUSEL_PRODUCTS_SUCCESS: 'GET_CAROUSEL_PRODUCTS_SUCCESS',
  GET_CATEGORY_PRODUCTS_SUCCESS: 'GET_CATEGORY_PRODUCTS_SUCCESS',
  GET_DETAIL_PRODUCT_SUCCESS: 'GET_DETAIL_PRODUCT_SUCCESS',
  SEARCH_PRODUCTS_SUCCESS: 'SEARCH_PRODUCTS_SUCCESS',
  //Failure.
  PRODUCT_ANY_FAILURE: 'PRODUCT_ANY_FAILURE',
};

const initialState = {
  men: [],
  women: [],
  kid: [],
  other: [],
  search: [],
  newProducts: [],
  popularityProducts: [],
  discountProducts: [],
  message: '',
};

export default function productReducers(state = initialState, action) {
  switch (action.type) {
    case productTypes.GET_CAROUSEL_PRODUCTS_SUCCESS:
      return { ...state, ...action.payload };
    case productTypes.GET_CATEGORY_PRODUCTS_SUCCESS:
      return { ...state, ...action.payload };
    case productTypes.GET_DETAIL_PRODUCT_SUCCESS:
      return { ...state, ...action.payload };
    case productTypes.SEARCH_PRODUCTS_SUCCESS:
      return { ...state, search: action.payload };
    case productTypes.PRODUCT_ANY_FAILURE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
