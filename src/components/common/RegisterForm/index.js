/** @format */

import React, { useRef } from 'react';
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Modal,
} from 'react-bootstrap';
import useInputValidate from '../../../hooks/useInputValidate';
import {
    NAME_REGEX,
    EMAIL_REGEX,
    PASSWORD_REGEX,
} from '../../../utils/constants/formValid';
import { userTypes } from '../../../redux/userModule';

const isNameFormat = value => NAME_REGEX.test(value);
const isPasswordFormat = value => PASSWORD_REGEX.test(value);
const isEmailFormat = value => EMAIL_REGEX.test(value);

const RegisterForm = () => {

    const checkPasswordRef = useRef();

    const isPasswordMatchFormat = value => value === checkPasswordRef.current.value;

    const {
        value: user_name,
        isValid: nameIsValid,
        message: messageName,
        isConfirm: nameIsConfirm,
        onChangeValue: onChangeName,
        onBlurValue: onBlurName,
    } = useInputValidate(isNameFormat, 'name');

    const {
        value: user_password,
        isValid: passwordIsValid,
        message: messagePassword,
        isConfirm: passwordIsConfirm,
        onChangeValue: onChangePassword,
        onBlurValue: onBlurPassword,
    } = useInputValidate(isPasswordFormat, 'password');

    const {
        value: confirmPassword,
        message: messageConfirmPassword,
        isValid: confirmPasswordIsValid,
        isConfirm: confirmPasswordIsConfirm,
        onChangeValue: onChangeConfirmPassword,
        onBlurValue: onBlurConfirmPassword,
    } = useInputValidate(isPasswordMatchFormat, 'confirm password');

    const {
        value: user_email,
        isValid: emailIsValid,
        message: messageEmail,
        isConfirm: emailIsConfirm,
        onChangeValue: onChangeEmail,
        onBlurValue: onBlurEmail,
    } = useInputValidate(isEmailFormat, 'email');

    const handleFormSubmit = formValue => {

        return (event) => {

            event.preventDefault();

            dispatch({ type: userTypes.REGISTER_REQUEST, payload: formValue });
        };
    };

    return (

        <Form
            onSubmit={handleFormSubmit({ user_name, user_email, user_password })}
            className="d-flex flex-column"
        >
            <FormGroup className="mb-3" controlId="formBasicEmail">
                <FormLabel className="font-content fs-5">User Name</FormLabel>
                <FormControl
                    type="text"
                    placeholder="Enter Username"
                    value={user_name}
                    onChange={onChangeName}
                    onBlur={onBlurName}
                />
                <Form.Text className="text-danger" hidden={nameIsValid}>
                    {messageName}
                </Form.Text>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBasicPassword">
                <FormLabel className="font-content fs-5">Password</FormLabel>
                <FormControl
                    type="password"
                    placeholder="Enter Password"
                    ref={checkPasswordRef}
                    value={user_password}
                    onChange={onChangePassword}
                    onBlur={onBlurPassword}
                />
                <Form.Text
                    className="text-danger"
                    id="passwordFormat"
                    hidden={passwordIsValid}
                >
                    {messagePassword}
                </Form.Text>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBasicPassword">
                <FormLabel className="font-content fs-5">Confirm Password</FormLabel>
                <FormControl
                    type="password"
                    value={confirmPassword}
                    placeholder="Enter Password Again"
                    onChange={onChangeConfirmPassword}
                    onBlur={onBlurConfirmPassword}
                />
                <Form.Text className="text-danger" hidden={confirmPasswordIsValid}>
                    {messageConfirmPassword}
                </Form.Text>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicEmail">
                <FormLabel className="font-content fs-5">Email address</FormLabel>
                <FormControl
                    type="email"
                    placeholder="Enter Email"
                    value={user_email}
                    onChange={onChangeEmail}
                    onBlur={onBlurEmail}
                />
                <Form.Text className="text-danger" hidden={emailIsValid}>
                    {messageEmail}
                </Form.Text>
            </FormGroup>
            <Button
                type="submit"
                className="fs-5 align-self-end"
                variant=" outline-light bg-deep-gray text-white font-btn fw-bold"
                disabled={
                    !nameIsConfirm ||
                    !emailIsConfirm ||
                    !passwordIsConfirm ||
                    !confirmPasswordIsConfirm
                }
            >
                Register
            </Button>
        </Form>
    );
};
export default RegisterForm;
