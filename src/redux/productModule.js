
export const productTypes = {
  //Request.
  GET_CAROUSEL_PRODUCTS_REQUEST: 'GET_CAROUSEL_PRODUCTS_REQUEST',
  GET_PRODUCTS_REQUEST: 'GET_PRODUCTS_REQUEST',
  GET_DETAIL_PRODUCT_REQUEST: 'GET_DETAIL_PRODUCT_REQUEST',
  SEARCH_PRODUCTS_REQUEST: 'SEARCH_PRODUCTS_REQUEST',
  //Success
  GET_CAROUSEL_PRODUCTS_SUCCESS: 'GET_CAROUSEL_PRODUCTS_SUCCESS',
  GET_PRODUCTS_SUCCESS: 'GET_PRODUCTS_SUCCESS',
  GET_DETAIL_PRODUCT_SUCCESS: 'GET_DETAIL_PRODUCT_SUCCESS',
  SEARCH_PRODUCTS_SUCCESS: 'SEARCH_PRODUCTS_SUCCESS',

  //Clean items
  CLEAN_PRODUCT_ITEMS_SEND: "CLEAN_PRODUCT_ITEMS_SEND",
  CLEAN_PRODUCT_ITEMS_RECEIVE: "CLEAN_PRODUCT_ITEMS_RECEIVE",

  //Failure.
  PRODUCT_ANY_FAILURE: 'PRODUCT_ANY_FAILURE',
};

const initialState = {
  items: new Map(),
  detail: new Map(),
  search: new Map(),
  carouselItems: {},
  message: null,
  isLoading: false
};

export default function productReducers(state = initialState, action) {

  switch (action.type) {

    case productTypes.GET_CAROUSEL_PRODUCTS_SUCCESS:

      return { ...state, carouselItems: action.payload };

    case productTypes.GET_PRODUCTS_SUCCESS:

      return {
        ...state, items: new Map([...state.items, ...action.payload])
      };

    case productTypes.GET_DETAIL_PRODUCT_SUCCESS:

      return { ...state, detail: new Map([...state.detail, ...action.payload]) };

    case productTypes.SEARCH_PRODUCTS_SUCCESS:

      return { ...state, search: new Map([...state.search, ...action.payload]) };

    case productTypes.CLEAN_PRODUCT_ITEMS_RECEIVE:
      return { ...state, items: action.payload };

    case productTypes.PRODUCT_ANY_FAILURE:

      return { ...state, message: action.payload };

    default:
      return state;
  }
}
