
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutForm from '../../../components/user/CheckoutForm';

import CartTable from '../../../components/user/CartTable';
import BreadCrumb from '../../../components/common/BreadCrumb';
import { Row, Col } from 'react-bootstrap';

type SelectState = {
    user: {
        info: Info;
        isLogin: boolean;
    };
};

type Info = {
    _id?: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_address: string;
    shopping_cart: Item[];
};

type Item = {
    product_mark: string;
    product_image: string;
    product_name: string;
    product_color: string;
    product_size: string;
};

const Checkout = () => {

    const navigate = useNavigate();

    const { info: userInfo, isLogin } = useSelector((state: SelectState) => state.user);

    const { shopping_cart } = userInfo;

    const loginToken = localStorage.getItem('loginToken');

    useEffect(() => {
        if ((!loginToken && !isLogin) || shopping_cart?.length === 0) {
            navigate('/');
        }
    }, [isLogin]);

    return (
        <section className="pt-3">
            <BreadCrumb />
            <h1 className="border font-title mt-2 text-center text-white bg-gray ">Checkout</h1>
            <Row className="d-flex min-vh-100 my-2 p-2">
                <Col lg={12} xl={6}>
                    <CartTable cartItems={shopping_cart} isEdit={false} />
                </Col>
                <Col lg={12} xl={6}>
                    <CheckoutForm userInfo={userInfo}></CheckoutForm>
                </Col>
            </Row>
        </section>
    );
};

export default Checkout;
