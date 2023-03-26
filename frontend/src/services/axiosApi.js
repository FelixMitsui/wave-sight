/** @format */

import axios from 'axios'
import qs from 'qs'
const CancelToken = axios.CancelToken
const source = CancelToken.source()
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://fox-clothing.herokuapp.com/' : 'http://localhost:3000/'
})
//Backend router 
export const createProduct = (productValue) => instance.post('/createProduct', productValue, { headers: { 'Content-Type': 'multipart/form-data' } })
export const getAllProducts = () => instance.post('/getAllProducts')
export const getFilteredProducts = () => instance.post('/getFilteredProducts')
export const getCategoryProducts = (path) => instance.get(path)
export const getDetailProduct = (detailId) => instance.get(detailId)
export const search = (query) => instance.get(`/search${query}`)
export const login = (userInfo) => instance.post('/login', userInfo)
export const register = (userInfo) => instance.post('/register', userInfo)
export const checkUserAuth = () => instance.post('/checkUserAuth', {}, {
  headers: {
    authorization: localStorage.getItem('token')
  },
})
export const setCartItem = (cartItem) => instance.post('/setCartItem', cartItem)
export const updateItemQuantity = (quantity) => instance.post(
  '/updateItemQuantity', quantity, {
  cancelToken: source.token,
})
export const deleteCartItem = (userInfo) => instance.post('/deleteCartItem', userInfo)
export const getUserInfo = (userId) => instance.post('/getUserInfo', userId)
export const getAllUsersInfo = () => instance.post('/getAllUsersInfo')
export const updateUserInfo = (userInfo) => instance.post('/updateUserInfo', userInfo)