import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { productTypes } from '../../../redux/productModule';
import ProductCard from '../ProductCard';
import CardPlaceholder from "../../common/placeholder/CardPlaceholder";

const ProductList = ({ products }) => {

    return (
        <Row xs={2} md={3} lg={4} xl={5} className="mx-2">
            {products ? products.map(product =>
                < Col className="my-2 px-1" key={product._id}>
                    <ProductCard item={product} />
                </Col>
            ) : [0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) =>
                <Col className="my-2 px-1" key={index}>
                    <CardPlaceholder />
                </Col>)}
        </Row>
    )
}

export default ProductList;