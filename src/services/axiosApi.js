
import axios from 'axios';
import { VERCEL_URL } from '../utils/constants/url';

const instance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production' ? VERCEL_URL : 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
});


export const getProducts = (query) => instance.get(`/api/products${query}`);

export const getCarouselProducts = () => instance.get('/api/carousel');

export const getDetailProduct = product_id => instance.get(`/api/products/${product_id}`);

export const getUsers = () => instance.get('/api/users');

export const login = userInfo =>
    instance.post('/api/login', userInfo, { withCredentials: true });

export const logout = () => instance.post('/api/logout');

export const register = userInfo => instance.post('/api/register', userInfo);

export const checkUserAuth = () =>
    instance.post('/api/auth', {}, { withCredentials: true });

export const addItemToCart = ({ productInfo, user_id }) =>
    instance.post(`/api/users/${user_id}/cart`, productInfo);

export const updateUserInfo = ({ user_id, userInfo }) =>
    instance.post(`/api/users/${user_id}`, { ...userInfo });

export const createOrder = ({ user_id, ...orderInfo }) =>
    instance.post(`/api/users/${user_id}/order`, orderInfo);

export const createProduct = productInfo =>
    instance.post('/api/products', productInfo, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updatePassWord = ({ user_id, ...passwordInfo }) =>
    instance.patch(`/api/users/${user_id}/password`, passwordInfo);

export const updateItemQuantity = ({ user_id, product_quantity, sid }) =>
    instance.patch(`/api/users/${user_id}/cart`, { product_quantity, sid });

export const updateUser = ({ user_id, ...userInfo }) =>
    instance.patch(`/api/users/${user_id}`, userInfo);

export const deleteProductImg = ({ product_id, imgFile }) =>
    instance.patch(`/api/products/${product_id}/img`, { imgFile });

export const updateProduct = ({ product_id, productInfo }) =>
    instance.put(`/api/products/${product_id}`, productInfo, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const deleteCartItem = ({ user_id, sid }) =>
    instance.delete(`/api/users/${user_id}/cart`, { params: { sid } });

export const deleteCartItems = (user_id) =>
    instance.delete(`/api/users/${user_id}/cart`);



