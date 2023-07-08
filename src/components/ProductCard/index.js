/** @format */

import React, { useRef, memo } from 'react';
import { Col, Card, Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductCard = ({
    item: {
        _id: product_id,
        product_category,
        product_name,
        product_price,
        product_images,
        product_discount,
    },
}) => {
    return (
        <>
            <Col className="d-flex p-1">
                {product_id ? (
                    <Card
                        border="secondary"
                        className="border border-light-gray p-1 w-100"
                    >
                        <Link to={`/products/${product_category}/${product_id}`}>
                            <LazyLoadImage
                                src={product_images && product_images[0]}
                                className="bg-lavender object-fit-fill w-100"
                                style={{ aspectRatio: '8/13' }}
                            />
                        </Link>
                        <Card.Body className="p-1">
                            <Card.Title as="p" className="font-content text-break text-gray">
                                {product_name}
                            </Card.Title>
                            {product_discount < 1 ? (
                                <div className="d-flex justify-content-end">
                                    <Card.Text className="font-content mb-0 mx-1 text-decoration-line-through">
                                        {product_price}NT$
                                    </Card.Text>
                                    <Card.Text className="font-content fs-6 text-red">
                                        {Math.floor(product_price * product_discount)}NT$
                                    </Card.Text>
                                </div>
                            ) : (
                                <Card.Text className="d-flex font-content justify-content-end">
                                    {product_price}NT$
                                </Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                ) : (
                    <Card className="w-100">
                        <Card.Img
                            variant="top"
                            style={{ aspectRatio: '8/13' }}
                            src={require('../../assets/images/placeholder.png').default}
                        />
                        <Card.Body className="d-flex flex-column">
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={12} size="lg" />
                            </Placeholder>
                            <div className="d-flex flex-column flex-grow-1 justify-content-end">
                                <Placeholder as={Card.Text} className="text-end" animation="glow">
                                    <Placeholder xs={8} size="lg" />
                                </Placeholder>
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </Col>
        </>
    );
};

export default memo(ProductCard);
