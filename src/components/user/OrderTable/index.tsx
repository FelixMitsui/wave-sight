import React from "react";
import { Row, Col, Accordion, Badge, Card } from "react-bootstrap";
import CartTable from "../CartTable";
import NoticeImg from "../../common/NoticeImg";

const OrderTable = ({ orderItems }) => {

    return (
        <>
            {!orderItems?.length &&
                <NoticeImg img="empty-order.png" text=" There are currently no order record." />
            }
            {orderItems?.map((item, index) => (
                <Accordion defaultActiveKey={['0']} alwaysOpen className="my-2">
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
                                    <CartTable cartItems={item.shopping_cart} isEdit={false} />
                                </Col>
                                <Col lg="5">
                                    {' '}
                                    <Card border="light">
                                        <Card.Header className="font-title fs-4 text-center">
                                            Order information
                                        </Card.Header>
                                        <Card.Body className="font-content fs-5 fw-bold">
                                            <Card.Title>
                                                Name:<Badge className="bg-light-gray"></Badge>
                                                {item.userName}
                                            </Card.Title>
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
        </>
    )
}

export default OrderTable;