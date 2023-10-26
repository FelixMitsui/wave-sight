import React from 'react';
import Toast from 'react-bootstrap/Toast';

const MessageToast = ({ message }) => {

    return (
        <Toast style={{ animation: "toast-in-out 3s ease" }} className="p-2 w-auto d-flex  index-3 position-absolute end-0 top-100 bg-light-gray border border-2 opacity-75">
            <Toast.Body className="py-0  font-title text-center fs-5">{message}</Toast.Body>
        </Toast>
    );
}

export default MessageToast;