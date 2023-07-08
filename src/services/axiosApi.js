/** @format */

import axios from 'axios';
import { HEROKU_URL } from '../utils/constants/url';

const instance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production' ? HEROKU_URL : 'http://localhost:3000/',
    headers: { 'Content-Type': 'application/json' },
});

//About product router
export const getCarouselProducts = queryInfo =>
    instance.get('/products', { params: queryInfo });
export const getCategoryProducts = category => instance.get(`/products/${category}`);
export const getDetailProduct = product_id => instance.get(`/product/${product_id}`);
export const searchProducts = query => instance.get(`/products${query}`);

//About user router
export const login = userInfo =>
    instance.post('/login', userInfo, { withCredentials: true });
export const logout = () => instance.post('/logout');
export const register = userInfo => instance.post('/register', userInfo);
export const checkUserAuth = () =>
    instance.post(
        '/user/auth',
        {},
        {
            withCredentials: true,
        }
    );
export const addItemToCart = ({ productInfo, user_id }) =>
    instance.post(`/user/${user_id}/cart`, productInfo);
export const updateUserInfo = ({ user_id, userInfo }) =>
    instance.post(`/user/${user_id}`, { ...userInfo });
export const createOrder = ({ user_id, ...orderInfo }) =>
    instance.post(`/user/${user_id}/order`, orderInfo);
export const updatePassWord = ({ user_id, ...passwordInfo }) =>
    instance.patch(`/user/${user_id}/password`, passwordInfo);
export const updateItemQuantity = ({ user_id, product_quantity, product_mark }) =>
    instance.patch(`/user/${user_id}/cart/${product_mark}/quantity`, {
        product_quantity,
    });

export const deleteCartItem = ({ product_mark, user_id }) =>
    instance.delete(`/user/${user_id}/cart/${product_mark}`);
export const deleteCartAllItems = user_id =>
    instance.delete(`/user/${user_id}/cart`);
//About manage router
export const createProduct = productInfo =>
    instance.post('/manage/product', productInfo, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const updateProduct = ({ product_id, productInfo }) =>
    instance.put(`/manage/product/${product_id}`, productInfo, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
export const getAllProducts = currentIndex =>
    instance.get(`/manage/products${currentIndex}`);
export const getAllUsers = () => instance.get('/manage/users');
export const updateUser = ({ user_id, ...userInfo }) =>
    instance.patch(`/manage/users/${user_id}`, userInfo);
