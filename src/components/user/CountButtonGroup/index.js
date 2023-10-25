import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

const CountButtonGroup = ({ quantity, handleCalculate }) => {



    return (

        <ButtonGroup className="d-flex justify-content-center">
            <Button
                className="me-1 p-0 btn-light-gray"
                type="button"
                onClick={(event) => handleCalculate(event.currentTarget.value)}
                value="-"
            ><i className='bx bx-minus' />
            </Button>
            <span className="align-self-center">{quantity}</span>
            <Button
                className="ms-1 p-0 btn-light-gray"
                type="button"
                onClick={(event) => handleCalculate(event.currentTarget.value)}
                value="+"
            ><i className='bx bx-plus' />
            </Button>
        </ButtonGroup >
    )
}

export default CountButtonGroup;