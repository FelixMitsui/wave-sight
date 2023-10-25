import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useTotalCalculate from "../../../hooks/useTotalCalculate";
import CartTableRow from "../CartTableRow";
import Loading from '../../common/Loading';
import { userTypes } from "../../../redux/userModule";
import { Container, Table, Stack, Badge, Button } from "react-bootstrap";
import NoticeImg from "../../common/NoticeImg";

const CartTable = ({ cartItems, user_id, isEdit }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [totalCash, setTotalCalculate] = useTotalCalculate();

    const handleCheckout = () => {

        if (cartItems.length === 0) {
            dispatch({ type: userTypes.SET_MESSAGE_SEND, payload: 'Cart is empty.' });
            return;
        }
        navigate('/user/checkout');
    };

    return (

        <div className="my-2 d-flex flex-column position-relative">
            {cartItems?.length === 0 ?
                <NoticeImg img="empty-cart-icon.png" text="There are currently no products available." />
                : (
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
                                {isEdit && <th>Edit</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems?.map((item, index) => (
                                <CartTableRow
                                    key={item.sid}
                                    number={index}
                                    user_id={user_id}
                                    item={item}
                                    isEdit={isEdit}
                                    setTotalCalculate={setTotalCalculate}
                                />
                            ))}
                        </tbody>
                    </Table>
                )}
            <div
                className="mt-2 fs-2 align-self-end"
            >
                <Badge className="mx-1 bg-deep-gray font-content">
                    Total:{Math.floor(totalCash)}$
                </Badge>
                {isEdit && <Button
                    size="sm"
                    className="bg-beige border border-black font-btn fs-5 fw-bold text-black"
                    onClick={handleCheckout}
                >
                    Confirm
                </Button>}
            </div>
        </div>
    )
}

export default CartTable;