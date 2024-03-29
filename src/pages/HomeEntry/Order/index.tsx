import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../../components/common/BreadCrumb';
import OrderTable from '../../../components/user/OrderTable';
import { RootState } from 'redux/store';


const Order = () => {

    const navigate = useNavigate();

    const {
        info: { user_order },
        isLogin,
    } = useSelector((state: RootState) => state.user);

    const loginToken = localStorage.getItem('loginToken');

    useEffect(() => {
        if (!loginToken && !isLogin) {
            navigate('/');
        }
    }, [isLogin, loginToken]);

    return (
        <section className="pt-3">
            <BreadCrumb />
            <h1 className="font-title mt-2 text-center text-white bg-gray">Order</h1>
            <OrderTable orderItems={user_order} />
        </section>
    );
};
export default Order;
