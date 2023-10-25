
import React, { memo } from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CardPlaceholder from '../../common/placeholder/CardPlaceholder';

const ProductCard = ({
    item: {
        _id: product_id,
        product_category,
        product_part,
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
                    <div className="d-flex  align-self-end flex-grow-1 flex-wrap">
                        <Card.Text className="font-content mb-0 mx-1 text-decoration-line-through">
                            {product_price}NT$
                        </Card.Text>
                        <Card.Text className="font-content fs-6 text-red">
                            {Math.floor(product_price * product_discount)}NT$
                        </Card.Text>
                    </div>
                ) : (
                    <Card.Text className="d-flex font-content align-self-end flex-grow-1">
                        {product_price}NT$
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
};

export default memo(ProductCard);
