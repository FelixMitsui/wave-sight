/** @format */

import {
  createProduct,
  getDetailProduct,
  getAllProducts,
  getCategoryProducts,
  getFilteredProducts,
  searchProducts
} from '../services/axiosApi'

const types = {
  GET_ALL_PRODUCTS: 'GET_ALL_PRODUCTS',
  GET_FILTERED_PRODUCTS: 'GET_FILTERED_PRODUCTS',
  GET_CATEGORY_PRODUCTS: 'GET_CATEGORY_PRODUCTS',
  GET_DETAIL_PRODUCT: 'GET_DETAIL_PRODUCT',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  SEARCH_PRODUCTS: 'SEARCH_PRODUCTS'
}

const initialState = {
  products: [],
  categories: [],
  detail: {},
  search: []
}

export default function productReducers(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS:
      return { ...state, products: action.payload }
    case types.GET_FILTERED_PRODUCTS:
      return { ...state, products: action.payload }
    case types.GET_CATEGORY_PRODUCTS:
      return { ...state, categories: action.payload }
    case types.CREATE_PRODUCT:
      return state
    case types.GET_DETAIL_PRODUCT:
      return { ...state, detail: action.payload }
    case types.SEARCH_PRODUCTS:
      return { ...state, search: action.payload }
    default:
      return state
  }
}

// Action Creators
export const productActions = {
  createProduct: (productValue) => {
    return (dispatch) => {
      createProduct(productValue)
        .then((res) => {
          alert('create success!')
          dispatch({ type: types.CREATE_PRODUCT })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  getAllProducts: function () {
    return (dispatch) => {
      getAllProducts()
        .then((res) => {
          dispatch({
            type: types.GET_ALL_PRODUCTS,
            payload: res.data.result
          })
        })
        .catch((err) => {
          console.log("getAllProducts:" + err)
        })
    }
  },
  getFilteredProducts: function () {
    return (dispatch) => {
      getFilteredProducts()
        .then((res) => {
          dispatch({
            type: types.GET_FILTERED_PRODUCTS,
            payload: res.data.result
          })
        })
        .catch((err) => {
          console.log("getFilteredProducts:" + err)
        })
    }
  },
  getCategoryProducts: (path) => {
    return (dispatch) => {
      getCategoryProducts(path)
        .then((res) => {
          dispatch({
            type: types.GET_CATEGORY_PRODUCTS,
            payload: res.data.result
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  getDetailProduct: (detailId) => {
    return (dispatch) => {
      getDetailProduct(detailId)
        .then((res) => {
          console.log(res)
          dispatch({ type: types.GET_DETAIL_PRODUCT, payload: res.data.result })
        })
        .catch((err) => {
          console.log(" getDetailProduct" + err)
        })
    }
  },
  searchProduct: (query) => {
    return (dispatch) => {
      searchProduct(query)
        .then((res) => {
          dispatch({ type: types.SEARCH_PRODUCTS, payload: res.data.result })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
}
