import React from 'react';
import Toast from 'react-bootstrap/Toast';

const MessageToast = ({ message }) => {

    return (
        <Toast style={{ animation: "toast-in-out 5s ease" }} className="position-absolute top-100 end-0 bg-light-gray " >
            <Toast.Header closeButton={false}>
                <strong className="fs-5  me-auto">status </strong>
            </Toast.Header>
            <Toast.Body className="font-title text-center fs-5">{message}</Toast.Body>
        </Toast>
    );
}

export default MessageToast;