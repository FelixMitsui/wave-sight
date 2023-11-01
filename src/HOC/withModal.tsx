import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const withModal = OutSideComponent => {

    return props => {

        const { title, btnName, className, children, ...rest } = props;

        const [isDisplay, setIsDisplay] = useState(false);

        const handleDisplay = () => {
            setIsDisplay(prev => !prev);
        };

        return (
            <>
                <Modal
                    show={isDisplay}
                    onHide={() => handleDisplay()}
                    dialogClassName="modal-50w"
                    aria-labelledby="contained-modal-title-vcenter"
                    contentClassName="bg-light-gray"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="font-title" id="contained-modal-title-vcenter">
                            {title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex flex-column">
                        <OutSideComponent
                            {...rest}
                        />
                    </Modal.Body>
                </Modal>
                <Button
                    className={`${className} mt-2 border border-2 border-white index-2 btn-deep-gray text-white d-flex align-items-center`}
                    onClick={() => handleDisplay()}
                >
                    {children}
                    <span className={`font-btn fw-bold text-white`}>
                        {btnName}
                    </span>
                </Button>
            </>
        );
    };
};

export default withModal;