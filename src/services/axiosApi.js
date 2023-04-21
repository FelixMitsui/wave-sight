/** @format */

import axios from 'axios'
import qs from 'qs'
import { BACKEND_URL, HEROKU_FRONT_URL } from '../util/constants/url'
const CancelToken = axios.CancelToken
const source = CancelToken.source()
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? HEROKU_FRONT_URL : BACKEND_URL,
  headers: { 'Content-Type': 'application/json' }
})

//About product router 
export const getFilteredProducts = () => instance.get('/products/filtered')
export const getCategoryProducts = (category) => instance.get(`/products/${category}`)
export const getDetailProduct = (product_id) => instance.get(`/products/:category/${product_id}`)
export const searchProducts = (query) => instance.get(`/search${query}`)

//About user router 
export const login = (userInfo) => instance.post('/login', userInfo, { withCredentials: true })
export const logout = () => instance.post('/logout', {}, { withCredentials: true })
export const register = (userInfo) => instance.post('/register', userInfo)
export const checkUserAuth = () => instance.get('/user/auth', {
  withCredentials: true
})
export const setUserCart = (cartItem) => instance.post('/user/cart', cartItem)
export const updatePassWord = (userInfo) => instance.patch('/user/profile', userInfo, {
  withCredentials: true
})
export const updateItemQuantity = (updateInfo) => instance.patch(
  '/user/cart/quantity', updateInfo, {
  cancelToken: source.token,
})
export const deleteCartItem = ({ product_mark, ...user_id }) => instance.delete(`/user/cart/${product_mark}`, { data: user_id })

//About manage router 
export const createProduct = (formData) =>
  instance.post('/manage/product', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
export const updateProduct = (formData) =>
  instance.put('/manage/product', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
export const getAllProducts = () => instance.get('/manage/products')
export const getUserInfo = (userId) => instance.post('/getUserInfo', userId)
export const getAllUsers = () => instance.get('/manage/users')
export const updateUserInfo = ({ _id, ...userInfo }) => instance.patch(`/manage/users/${_id}`, userInfo)