
import React, { useRef } from 'react';
import useInputValidate from '../../../hooks/useInputValidate';
import { Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { userTypes } from '../../../redux/userModule';
import { PASSWORD_REGEX } from '../../../utils/constants/formValid';

const isPasswordFormat = value => PASSWORD_REGEX.test(value);

const PasswordForm = ({ user_id, user_auth }) => {

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

    const handleFormSubmit = formValue => {

        return (event) => {

            event.preventDefault();

            if (user_auth | 0) {
                return;
            }

            dispatch({ type: userTypes.UPDATE_PASSWORD_REQUEST, payload: formValue });
        };
    };

    return (

        <Form
            onSubmit={handleFormSubmit({ user_id, oldPassword, newPassword })}
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
                        !confirmPasswordIsConfirm)
                }
                className="fs-5 align-self-end"
                variant="outline-light bg-deep-gray text-white font-btn fw-bold"
            >
                Confirm Change
            </Button>
        </Form>
    );
};
export default PasswordForm;
