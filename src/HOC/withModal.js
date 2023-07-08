import React, { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

const withModal = ModalComponent => {
    return props => {
        const dispatch = useDispatch();
        const [isDisplay, setIsDisplay] = useState(false);

        const handleDisplay = () => {
            setIsDisplay(prev => !prev);
        };
        console.log(isDisplay)
        const handleFormSubmit = formValue => {
            return event => {
                event.preventDefault();
                const { user_role } = props.info || '';
                if (user_role !== 'admin' && props.name === 'Change Password') {
                    alert('No permission.');
                    return;
                }
                dispatch({ type: props.actionType, payload: formValue });
            };
        };

        return (
            <>
                <ModalComponent
                    {...props}
                    isDisplay={isDisplay}
                    onDisplay={handleDisplay}
                    onFormSubmit={handleFormSubmit}
                />
                <Button
                    className={`index-2 outline-light btn-deep-gray border text-white`}
                    onClick={handleDisplay}
                >
                    {props.children}
                    <span className={`fs-${props.btnSize || 6} font-btn fw-bold`}>
                        {props.name}
                    </span>
                </Button>
            </>
        );
    };
};

export default withModal;
