import React, { memo } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductCard = ({
    product: {
        _id: product_id,
        product_name,
        product_price,
        product_imgs,
        product_discount,
    } }) => {

    return (
        <Card
            border="secondary"
            className="p-2 d-flex border border-light-gray h-100"
        >
            <Link to={`/products/${product_id}`}>
                <LazyLoadImage
                    src={product_imgs[0]}
                    className="bg-lavender object-fit-fill w-100"
                    style={{ aspectRatio: '8/13' }}
                />
            </Link>
            <Card.Body className="p-2 d-flex flex-column">
                <Card.Title className="font-content text-break text-gray">
                    {product_name}
                </Card.Title>
                {product_discount < 1 ? (
                    <div className="d-flex justify-content-end flex-grow-1 flex-wrap">
                        <Card.Text className="align-self-end font-content mb-0 mx-1 text-decoration-line-through">
                            {product_price}NT$
                        </Card.Text>
                        <Card.Text className="align-self-end font-content text-red">
                            {Math.floor(product_price * product_discount)}NT$
                        </Card.Text>
                    </div>
                ) : (
                    <div className="d-flex justify-content-end flex-grow-1 flex-wrap">
                        <Card.Text className="align-self-end font-content">
                            {product_price}NT$
                        </Card.Text>
                    </div>

                )}
            </Card.Body>
        </Card>
    );
};

export default memo(ProductCard);
