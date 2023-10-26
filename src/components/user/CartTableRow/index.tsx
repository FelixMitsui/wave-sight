
import React, { useEffect, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Image } from 'react-bootstrap';
import CountButtonGroup from '../CountButtonGroup';
import { userTypes } from '../../../redux/userModule';
import useCounter from '../../../hooks/useCounter';

const CartTableRow = ({
    item,
    number,
    user_id,
    setTotalCalculate,
    isEdit = true
}) => {

    const dispatch = useDispatch();

    const {
        sid,
        product_img,
        product_name,
        product_color,
        product_size,
        product_quantity,
        product_discount,
        product_price,
    } = item;



    const [quantity, triggerCounter] = useCounter(product_quantity);

    const quantityRef = useRef(quantity);

    const handleItemQuantity = (updateInfo) => {

        dispatch({ type: userTypes.UPDATE_ITEM_QUANTITY_REQUEST, payload: updateInfo })

    };

    function handleCalculate(type) {

        switch (type) {

            case '+':

                quantityRef.current++;

                setTotalCalculate(product_price * product_discount);

                triggerCounter(type);

                break;

            case '-':

                if (quantityRef.current === 1) return;

                quantityRef.current--;

                setTotalCalculate(-product_price * product_discount);

                triggerCounter(type);

                break;
        }

        handleItemQuantity({
            user_id,
            sid,
            product_quantity: quantityRef.current,
        });

    }

    useEffect(() => {
        setTotalCalculate(product_price * quantity * product_discount);
    }, []);

    const handleDeleteItem = () => {

        dispatch({
            type: userTypes.DELETE_CART_ITEM_REQUEST,
            payload: { user_id, sid }
        });

        setTotalCalculate(-(product_price * quantity * product_discount));
    };

    return (
        <tr className="border-light-gray font-content text-center">
            <td>{number + 1}</td>
            <td>{product_name}</td>
            <td>
                <Image
                    fluid={true}
                    thumbnail={true}
                    width={100}
                    height={100}
                    className="d-block mx-auto"
                    src={product_img}
                />
            </td>
            <td>{product_color}</td>
            <td>{product_size}</td>
            <td>
                {isEdit ? (
                    <CountButtonGroup quantity={quantity} handleCalculate={handleCalculate} />
                ) : (
                    quantity
                )}
            </td>
            <td>NT{Math.floor(product_price * quantity * product_discount)}$</td>
            {isEdit &&
                <td>
                    <Button
                        className="border border-1 border-black btn-beige font-content mt-2"
                        onClick={() => handleDeleteItem()}
                    >
                        Delete
                    </Button>
                </td>
            }
        </tr>
    );
};

function areEqual(prevProps, nextProps) {

    return prevProps.item.product_quantity === nextProps.item.product_quantity;
}

export default memo(CartTableRow, areEqual);
