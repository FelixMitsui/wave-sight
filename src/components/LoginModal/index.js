/** @format */
import React, { useRef } from 'react'
import useInputValidate from '../../hooks/useInputValidate'
import { Button, Form, FormGroup, FormControl, FormLabel, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { PASSWORD_REGEX, EMAIL_REGEX } from '../../util/constants/formValid'

const isPasswordFormat = (value) => PASSWORD_REGEX.test(value);
const isEmailFormat = (value) => EMAIL_REGEX.test(value);

const LoginModal = ({ handleLogin, handleClose, show }) => {

  const {
    value: email,
    message: messageEmail,
    isValid: emailIsValid,
    isConfirm: emailIsConfirm,
    onChangeValue: onChangeEmail,
    onBlurValue: onBlurEmail,
  } = useInputValidate(isEmailFormat, 'email');

  const {
    value: password,
    message: messagePassword,
    isValid: passwordIsValid,
    isConfirm: passwordIsConfirm,
    onChangeValue: onChangePassword,
    onBlurValue: onBlurPassword,
  } = useInputValidate(isPasswordFormat, 'password');

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="gray-lv3"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-2 font-title" id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup className="mb-3" controlId="formBasicEmail">
            <FormLabel className='fs-5 font-content'>Email address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={onChangeEmail}
              onBlur={onBlurEmail}
            />
            <Form.Text className="text-danger" hidden={emailIsValid}>
              {messageEmail}
            </Form.Text>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formBasicPassword">
            <FormLabel className='fs-5 font-content'>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              onBlur={onBlurPassword}
            />
            <Form.Text className="text-danger" hidden={passwordIsValid}>
              {messagePassword}
            </Form.Text>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => handleLogin({
            user_email: email,
            user_password: password
          })}
          disabled={!emailIsConfirm || !passwordIsConfirm}
          variant="outline-light light"
          type="submit"
        >
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default LoginModal
