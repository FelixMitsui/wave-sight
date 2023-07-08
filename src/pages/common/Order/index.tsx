/** @format */

import React, { useEffect, useState, useCallback } from 'react';
import { matchRoutes, useNavigate } from 'react-router-dom';
import { routes } from '../../../router/routesList';
import { useSelector, useDispatch } from 'react-redux';
import { userTypes } from '../../../redux/userModule';
import BreadCrumb from '../../../components/BreadCrumb';
import CartTable from '../../../containers/CartTable';
import { Card, Accordion, Row, Col, Badge } from 'react-bootstrap';

type SelectState = {
    user: {
        info: Info;
        isLogin: boolean;
    };
};
type Info = {
    _id: string;
    user_order: Array<any>;
};

const Order = () => {
    const matchName = location.pathname.startsWith('/wave-sight')
        ? location.pathname.substring('/wave-sight'.length)
        : location.pathname;
    const matches = matchRoutes(routes, matchName);
    const navigate = useNavigate();

    const {
        info: { user_order },
        isLogin,
    } = useSelector((state: SelectState) => state.user);
    const loginToken = localStorage.getItem('loginToken');
    useEffect(() => {
        if (!loginToken && !isLogin) {
            navigate('/');
        }
    }, [isLogin]);

    return (
        <>
            <BreadCrumb matches={matches} />
            <div className="bg-gray">
                <h1 className="font-title mt-2 text-center text-white">Order</h1>
            </div>
            <Row className="border m-2 min-vh-100 p-2 position-relative">
                {user_order?.length === 0 ? (
                    <div className="position-absolute start-0 top-0 end-0">
                        <img
                            className="h-100 w-100"
                            src={require('../../../assets/images/empty-order.png').default}
                        />
                        <h2 className="end-0 position-absolute start-0 text-center top-50">
                            There are currently no order record.
                        </h2>
                    </div>
                ) : null}
                <Col>
                    {user_order?.map((item, index) => (
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            <Accordion.Item eventKey={String(index)}>
                                <Accordion.Header className="font-content">
                                    Order No.
                                    <Badge className="fs-6 me-2" bg="info">
                                        {item.order_id}
                                    </Badge>
                                    <Badge className="fs-6" bg="warning">
                                        {' '}
                                        {item.order_status}
                                    </Badge>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Row className="my-2 p-2">
                                        <Col lg="7" className="border border-1 pt-2">
                                            <CartTable shopping_cart={item.shopping_cart} />
                                        </Col>
                                        <Col lg="5">
                                            {' '}
                                            <Card border="light">
                                                <Card.Header className="font-title fs-4 text-center">
                                                    Order information
                                                </Card.Header>
                                                <Card.Body className="font-content fs-5 fw-bold">
                                                    <Card.Title></Card.Title>
                                                    <Card.Text>
                                                        Name:<Badge className="bg-light-gray">{item.userName}</Badge>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Email:<Badge className="bg-light-gray">{item.userEmail}</Badge>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Phone:<Badge className="bg-light-gray">{item.userPhone}</Badge>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Address:<Badge className="bg-light-gray">{item.userAddress}</Badge>
                                                    </Card.Text>
                                                    <hr className="border-black" />
                                                    <Card.Text>
                                                        Delivery method:
                                                        <Badge className="bg-light-gray">{item.deliveryMethod}</Badge>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Invoice:
                                                        <Badge className="bg-light-gray">
                                                            {item.invoice.type} {item.invoice.number}
                                                        </Badge>{' '}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Pay method:<Badge className="bg-light-gray">{item.payMethod}</Badge>
                                                    </Card.Text>
                                                    <hr className="border-black" />
                                                    <Card.Text>
                                                        Remark:<span className="fs-6">{item.remark || 'No message'}</span>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </Col>
            </Row>
        </>
    );
};
export default Order;
