import axios from 'axios';

const instance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production' ? 'https://wave-sight-server.vercel.app/api/' : 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' },
});


export const getProducts = (query) => instance.get(`products${query}`);

export const getCarouselProducts = () => instance.get('carousel');

export const getDetailProduct = product_id => instance.get(`products/${product_id}`);

export const getUsers = () => instance.get('users');

export const login = userInfo =>
    instance.post('login', userInfo, { withCredentials: true });

export const logout = () => instance.post('logout');

export const register = userInfo => instance.post('register', userInfo);

export const checkUserAuth = () =>
    instance.post('auth', {}, { withCredentials: true });

export const addItemToCart = ({ productInfo, user_id }) =>
    instance.post(`users/${user_id}/cart`, productInfo);

export const updateUserInfo = ({ user_id, userInfo }) =>
    instance.post(`users/${user_id}`, { ...userInfo });

export const createOrder = ({ user_id, ...orderInfo }) =>
    instance.post(`users/${user_id}/order`, orderInfo);

export const createProduct = productInfo =>
    instance.post('products', productInfo, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updatePassWord = ({ user_id, ...passwordInfo }) =>
    instance.patch(`users/${user_id}/password`, passwordInfo);

export const updateItemQuantity = ({ user_id, product_quantity, sid }) =>
    instance.patch(`users/${user_id}/cart`, { product_quantity, sid });

export const updateUser = ({ user_id, ...userInfo }) =>
    instance.patch(`users/${user_id}`, userInfo);

export const deleteProductImg = ({ product_id, imgFile }) =>
    instance.patch(`products/${product_id}/img`, { imgFile });

export const updateProduct = ({ product_id, productInfo }) =>
    instance.put(`products/${product_id}`, productInfo, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const deleteCartItem = ({ user_id, sid }) =>
    instance.delete(`users/${user_id}/cart`, { params: { sid } });

export const deleteCartItems = (user_id) =>
    instance.delete(`users/${user_id}/cart`);



