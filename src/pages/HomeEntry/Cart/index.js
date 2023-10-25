
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userTypes } from '../../../redux/userModule';
import BreadCrumb from '../../../components/common/BreadCrumb';
import CartTable from '../../../components/user/CartTable';

const Cart = () => {

    const navigate = useNavigate();

    const {
        info: { _id, shopping_cart },
        isLogin,
    } = useSelector(state => state.user);

    const loginToken = localStorage.getItem('loginToken');

    useEffect(() => {
        if (!loginToken && !isLogin) {
            navigate('/');
        }
    }, [isLogin]);

    return (
        <section className="pt-3">
            <BreadCrumb />
            <h1 className="mt-2 border bg-gray font-title text-center text-white">Cart</h1>
            <CartTable cartItems={shopping_cart} user_id={_id} isEdit={true} />
        </section>
    );
};

export default Cart;
