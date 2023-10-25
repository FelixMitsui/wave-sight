import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

const withModal = ModalComponent => {

    return props => {

        const { title, user_auth, btnName, btnSize, className, actionType, children, ...rest } = props;

        const dispatch = useDispatch();

        const [isDisplay, setIsDisplay] = useState(false);

        const handleDisplay = () => {
            setIsDisplay(prev => !prev);
        };

        const handleFormSubmit = formValue => {

            return (event) => {

                event.preventDefault();

                if (user_auth | 0 && btnName === 'Change Password') {
                    return;
                }

                dispatch({ type: actionType, payload: formValue });
            };
        };

        return (
            <>
                <Modal
                    show={isDisplay}
                    onHide={handleDisplay}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    contentClassName="bg-light-gray"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="font-title fs-2" id="contained-modal-title-vcenter">
                            {title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex flex-column">
                        <ModalComponent
                            {...rest}
                            isDisplay={isDisplay}
                            onFormSubmit={handleFormSubmit}
                        />
                    </Modal.Body>
                </Modal>
                <Button
                    className={`${className} mt-2 border border-2 border-white index-2 btn-deep-gray text-white d-flex align-items-center`}
                    onClick={handleDisplay}
                >
                    {children}
                    <span className={`fs-${btnSize || 6} font-btn fw-bold text-white`}>
                        {btnName}
                    </span>
                </Button>
            </>
        );
    };
};

export default withModal;