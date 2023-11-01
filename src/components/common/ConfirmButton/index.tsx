import React from 'react';
import { Button } from 'react-bootstrap';


const ConfirmButton = ({ onClick }) => {

    return (
        <Button
            type="button"
            className="align-self-end"
            onClick={onClick}
            variant="outline-light bg-deep-gray text-white font-btn fw-bold"
        >
            Confirm
        </Button>
    );
};

export default ConfirmButton;
