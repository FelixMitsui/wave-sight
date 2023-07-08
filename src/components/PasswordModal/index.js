/** @format */

import React, { useRef } from 'react';
import useInputValidate from '../../hooks/useInputValidate';
import { Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { PASSWORD_REGEX } from '../../utils/constants/formValid';

const isPasswordFormat = value => PASSWORD_REGEX.test(value);

const PasswordModal = ({
    onDisplay,
    isDisplay,
    onFormSubmit,
    info: { user_id },
}) => {
    const checkPasswordRef = useRef();
    const oldPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const isNewPasswordFormat = value => {
        onBlurConfirmPassword();
        return value !== oldPasswordRef.current.value && isPasswordFormat(value);
    };
    const isPasswordMatchFormat = value => value === checkPasswordRef.current.value;
    const {
        value: oldPassword,
        message: messageOldPassword,
        isValid: oldPasswordIsValid,
        isConfirm: oldPasswordIsConfirm,
        onChangeValue: onChangeOldPassword,
        onBlurValue: onBlurOldPassword,
    } = useInputValidate(isPasswordFormat, 'old password');

    const {
        value: newPassword,
        message: messageNewPassword,
        isValid: newPasswordIsValid,
        isConfirm: newPasswordIsConfirm,
        onChangeValue: onChangeNewPassword,
        onBlurValue: onBlurNewPassword,
    } = useInputValidate(isNewPasswordFormat, 'new password');

    const {
        value: confirmPassword,
        message: messageConfirmPassword,
        isValid: confirmPasswordIsValid,
        isConfirm: confirmPasswordIsConfirm,
        onChangeValue: onChangeConfirmPassword,
        onBlurValue: onBlurConfirmPassword,
    } = useInputValidate(isPasswordMatchFormat, 'confirm password');

    return (
        <Modal
            show={isDisplay}
            onHide={onDisplay}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            contentClassName="bg-light-gray"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="font-title fs-2" id="contained-modal-title-vcenter">
                    Password Change
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    onSubmit={onFormSubmit({ user_id, oldPassword, newPassword })}
                    className="d-flex flex-column"
                >
                    <FormGroup className="mb-3" controlId="formBasicPassword">
                        <FormLabel className="font-content fs-5">Old Password</FormLabel>
                        <FormControl
                            type="password"
                            placeholder="input old password"
                            value={oldPassword}
                            ref={oldPasswordRef}
                            onChange={onChangeOldPassword}
                            onBlur={onBlurOldPassword}
                        />
                        <Form.Text className="text-danger" hidden={oldPasswordIsValid}>
                            {messageOldPassword}
                        </Form.Text>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="formBasicPassword">
                        <FormLabel className="font-content fs-5">New Password</FormLabel>
                        <FormControl
                            type="password"
                            placeholder="input new password"
                            ref={checkPasswordRef}
                            value={newPassword}
                            onChange={onChangeNewPassword}
                            onBlur={onBlurNewPassword}
                        />
                        <Form.Text className="text-danger" hidden={newPasswordIsValid}>
                            {messageNewPassword}
                        </Form.Text>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="formBasicPassword">
                        <FormLabel className="font-content fs-5">Password Confirm</FormLabel>
                        <FormControl
                            type="password"
                            value={confirmPassword}
                            ref={confirmPasswordRef}
                            placeholder="Enter Password Again"
                            onChange={onChangeConfirmPassword}
                            onBlur={onBlurConfirmPassword}
                        />
                        <Form.Text className="text-danger" hidden={confirmPasswordIsValid}>
                            {messageConfirmPassword}
                        </Form.Text>
                    </FormGroup>
                    <Button
                        type="submit"
                        disabled={
                            (!oldPasswordIsConfirm ||
                                !newPasswordIsConfirm ||
                                !confirmPasswordIsConfirm) &&
                            !(newPassword === confirmPassword)
                        }
                        className="fs-5 align-self-end"
                        variant="outline-light bg-deep-gray text-white font-btn fw-bold"
                    >
                        Confirm Change
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default PasswordModal;
