import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import ShoppingForm from '../../user/ShoppingForm';
import { userTypes } from '../../../redux/userModule';
import { Col, Card, Row, Image } from "react-bootstrap";

const ProductDetail = ({ product, user_id }) => {

    const dispatch = useDispatch();

    const imgRef = useRef(null);

    const {
        _id: product_id,
        sid,
        product_name,
        product_imgs,
        product_colors,
        product_sizes,
        product_price,
        product_discount,
        product_content,
    } = product || {};

    const handleToggleImg = event => {
        imgRef.current.src = event.target.src;
        imgRef.current.title = event.target.title;
    };

    const imageList = product_imgs?.map(img => (
        <Image
            onClick={handleToggleImg}
            key={img}
            className="mx-1 border border border-light-gray img-thumbnail mb-1"
            src={img}
        />
    ));

    const handleFormSubmit = ({ color, size, quantity }) => {

        if (!user_id) {
            dispatch({ type: userTypes.SET_MESSAGE_SEND, payload: 'Please login your account.' });
            return;
        }

        const productInfo = {
            product_id,
            sid,
            product_name,
            product_img: product_imgs[0],
            product_color: color,
            product_size: size,
            product_quantity: Number(quantity),
            product_discount,
            product_price,
        };

        dispatch({
            type: userTypes.ADD_ITEM_TO_CART_REQUEST,
            payload: { productInfo, user_id },
        });

    };

    return (

        <Row className="m-2 py-2">
            <Col xs={4} sm={4} md={2} className="p-2">
                {imageList}
            </Col>
            <Col xs={8} sm={8} md={4} className="p-1">
                <Image
                    ref={imgRef}
                    className="border border-light-gray img-thumbnail my-1"
                    src={product_imgs && product_imgs[0]}
                />
            </Col>
            <Col xs={12} sm={12} md={6} className="p-1">
                <Card>
                    <Card.Header className="fs-5 fw-bold">{product_name}</Card.Header>
                    <Card.Body className="font-content">
                        <Card.Text className=" mt-5 d-flex justify-content-end fs-4  fw-bold">
                            {Math.floor(product_price * product_discount)}$
                        </Card.Text>
                        <hr />
                        <ShoppingForm
                            initialValue={{
                                product_colors,
                                product_sizes
                            }}
                            onFormSubmit={handleFormSubmit}
                        />
                    </Card.Body>
                </Card>
            </Col>
            <hr />
            <Col className="p-2">
                <h2 className="font-title fs-2 fw-bold text-center">Detail Content</h2>
                <p className="font-content fs-5 mt-2 px-5">{product_content}</p>
            </Col>
        </Row>
    )
}

export default ProductDetail;