/** @format */

import React, { useState, useCallback, useEffect } from 'react';
import { Table, Stack, Button, Row, Col, Badge } from 'react-bootstrap';
import { matchRoutes, useNavigate } from 'react-router-dom';
import { routes } from '../../../router/routesList';
import { useSelector, useDispatch } from 'react-redux';
import { userTypes } from '../../../redux/userModule';
import Loading from '../../../components/Loading';
import CartItem from '../../../containers/CartItem';
import BreadCrumb from '../../../components/BreadCrumb';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const matchName = location.pathname.startsWith('/wave-sight')
        ? location.pathname.substring('/wave-sight'.length)
        : location.pathname;
    const matches = matchRoutes(routes, matchName);
    const {
        info: { _id, shopping_cart },
        isLogin,
    } = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCash, setTotalCash] = useState(0);
    const loginToken = localStorage.getItem('loginToken');

    useEffect(() => {
        if (!loginToken && !isLogin) {
            navigate('/');
        }
    }, [isLogin]);

    const handleTotalCalculate = useCallback(price => {
        setTotalCash(prev => prev + price);
    }, []);

    const handleItemQuantity = useCallback(updateInfo => {
        setIsLoading(true);
        dispatch({
            type: userTypes.UPDATE_ITEM_QUANTITY_REQUEST,
            payload: updateInfo,
        });
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);
    const handleDeleteItem = useCallback((userInfo, price) => {
        setTotalCash(prev => prev - price);
        dispatch({ type: userTypes.DELETE_CART_ITEM_REQUEST, payload: userInfo });
    }, []);

    const handleCheckout = () => {
        if (shopping_cart.length === 0) {
            dispatch({ type: userTypes.WARNING_MESSAGE_REQUEST, payload: 'Cart is empty.' });
            return;
        }
        navigate('/user/checkout');
    };

    return (
        <>
            {isLoading ? <Loading /> : null}
            <BreadCrumb matches={matches} />
            <div className="bg-gray">
                <h1 className="border font-title mt-2 text-center text-white">Cart</h1>
            </div>
            <Row className="border m-2  p-2 position-relative">
                {shopping_cart?.length === 0 ? (
                    <div className="end-0 position-absolute start-0 top-0">
                        <img
                            className="object-fit-cover w-100"
                            src={require('../../../assets/images/empty-cart-icon.png').default}
                        />
                        <h2 className="end-0 position-absolute start-0 text-center top-50">
                            There are currently no products available.
                        </h2>
                    </div>
                ) : null}
                <Col>
                    {shopping_cart?.length === 0 ? null : (
                        <Table bordered hover striped responsive className="border-light-gray">
                            <thead>
                                <tr className="font-content text-center">
                                    <th>No.</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shopping_cart?.map((item, index) => (
                                    <CartItem
                                        key={item.product_mark}
                                        number={index}
                                        user_id={_id}
                                        item={item}
                                        onTotalCalculate={handleTotalCalculate}
                                        handleItemQuantity={handleItemQuantity}
                                        onDeleteItem={handleDeleteItem}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
                <Stack
                    direction="horizontal"
                    gap={3}
                    className="d-flex fs-2 justify-content-end mt-2"
                >
                    <Badge className="bg-deep-gray font-content">
                        Totall:{Math.floor(totalCash)}$
                    </Badge>
                    <Button
                        size="sm"
                        className="bg-beige border border-black font-btn fs-5 fw-bold text-black"
                        onClick={handleCheckout}
                    >
                        Confirm
                    </Button>
                </Stack>
            </Row>
        </>
    );
};
export default Cart;
