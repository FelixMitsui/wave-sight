
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutForm from '../../../components/user/CheckoutForm';
import CartTable from '../../../components/user/CartTable';
import BreadCrumb from '../../../components/common/BreadCrumb';
import { Row, Col } from 'react-bootstrap';
import { RootState } from 'redux/store';

const Checkout = () => {

    const navigate = useNavigate();

    const { info: user, isLogin } = useSelector((state: RootState) => state.user);

    const { shopping_cart } = user;

    const loginToken = localStorage.getItem('loginToken');

    useEffect(() => {
        if ((!loginToken && !isLogin) || !shopping_cart?.length) {
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
                    <CheckoutForm user={user}></CheckoutForm>
                </Col>
            </Row>
        </section>
    );
};

export default Checkout;
