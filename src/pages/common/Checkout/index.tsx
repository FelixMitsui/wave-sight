
import React, { useState, useEffect, useCallback } from 'react';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutForm from '../../../containers/CheckoutForm';
import { routes } from '../../../router/routesList';
import CartItem from '../../../containers/CartItem';
import BreadCrumb from '../../../components/BreadCrumb';
import { Table, Row, Col, Badge } from 'react-bootstrap';

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
    const location = useLocation();
    const navigate = useNavigate();
    const matches = matchRoutes(routes, location);
    const { info: userInfo, isLogin } = useSelector((state: SelectState) => state.user);
    const { shopping_cart, _id: user_id } = userInfo;

    const [totalCash, setTotalCash] = useState(0);
    const loginToken = localStorage.getItem('loginToken');

    useEffect(() => {
        if ((!loginToken && !isLogin) || shopping_cart?.length === 0) {
            navigate('/');
        }
    }, [isLogin]);

    const handleTotalCalculate = useCallback((price: number) => {
        setTotalCash(prev => prev + price);
    }, []);

    return (
        <>
            <BreadCrumb matches={matches} />
            <div className="bg-gray my-2">
                <h1 className="border font-title mt-2 text-center text-white">Checkout</h1>
            </div>
            <Row className="d-flex flex-column min-vh-100 my-2 p-2">
                <Col>
                    <Table striped bordered hover responsive className="border-light-gray">
                        <thead>
                            <tr className="font-content fs-5">
                                <th>No.</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shopping_cart?.map((item, index) => (
                                <CartItem
                                    key={item.product_mark}
                                    number={index}
                                    user_id={user_id}
                                    item={item}
                                    onTotalCalculate={handleTotalCalculate}
                                    isEdit={false}
                                />
                            ))}
                        </tbody>
                    </Table>
                    <div className="font-content text-end">
                        <h3 className="fw-bold">
                            {' '}
                            Totall:<span className="bg-light-blue">{Math.floor(totalCash)}</span>$
                        </h3>
                    </div>
                </Col>
                <Col className="border my-2">
                    <CheckoutForm userInfo={userInfo}></CheckoutForm>
                </Col>
            </Row>
        </>
    );
};

export default Checkout;
