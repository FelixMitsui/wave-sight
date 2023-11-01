import React from 'react';
import { useDispatch } from 'react-redux';
import useInputValidate from '../../../hooks/useInputValidate';
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    FormLabel,
} from 'react-bootstrap';
import { PASSWORD_REGEX, EMAIL_REGEX } from '../../../utils/constants/formValid';
import { userTypes } from '../../../redux/userModule';

const isPasswordFormat = value => PASSWORD_REGEX.test(value);
const isEmailFormat = value => EMAIL_REGEX.test(value);

const LoginForm = () => {

    const dispatch = useDispatch();

    const {
        value: user_email,
        message: messageEmail,
        isValid: emailIsValid,
        isConfirm: emailIsConfirm,
        onChangeValue: onChangeEmail,
        onBlurValue: onBlurEmail,
    } = useInputValidate(isEmailFormat, 'email');

    const {
        value: user_password,
        message: messagePassword,
        isValid: passwordIsValid,
        isConfirm: passwordIsConfirm,
        onChangeValue: onChangePassword,
        onBlurValue: onBlurPassword,
    } = useInputValidate(isPasswordFormat, 'password');

    const handleFormSubmit = formValue => {

        return (event) => {

            event.preventDefault();

            dispatch({ type: userTypes.LOGIN_REQUEST, payload: formValue });
        };
    };

    return (

        <Form
            onSubmit={handleFormSubmit({ user_email, user_password })}
            className="d-flex flex-column"
        >
            <FormGroup className="mb-3" controlId="formBasicEmail">
                <FormLabel className="font-content">Email address</FormLabel>
                <FormControl
                    type="email"
                    placeholder="Enter email"
                    value={user_email}
                    onChange={onChangeEmail}
                    onBlur={onBlurEmail}
                />
                <Form.Text className="text-danger" hidden={emailIsValid}>
                    {messageEmail}
                </Form.Text>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBasicPassword">
                <FormLabel className="font-content">Password</FormLabel>
                <FormControl
                    type="password"
                    placeholder="Password"
                    value={user_password}
                    onChange={onChangePassword}
                    onBlur={onBlurPassword}
                />
                <Form.Text className="text-danger" hidden={passwordIsValid}>
                    {messagePassword}
                </Form.Text>
            </FormGroup>
            <Button
                type="submit"
                disabled={!emailIsConfirm || !passwordIsConfirm}
                className="align-self-end"
                variant="outline-light bg-deep-gray text-white font-btn fw-bold"
            >
                Login
            </Button>
        </Form>
    );
};
export default LoginForm;
