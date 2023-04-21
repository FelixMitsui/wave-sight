/** @format */
import React, { useRef } from 'react'
import { Button, Form, FormGroup, FormControl, FormLabel, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import useInputValidate from '../../hooks/useInputValidate'
import { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from '../../util/constants/formValid'

const isNameFormat = (value) => NAME_REGEX.test(value);
const isPasswordFormat = (value) => PASSWORD_REGEX.test(value);
const isEmailFormat = (value) => EMAIL_REGEX.test(value);


const RegisterModal = ({ handleRegister, handleClose, show }) => {
  const checkPasswordRef = useRef()

  const isPasswordMatchFormat = (value) => value === checkPasswordRef.current.value;

  const {
    value: name,
    isValid: nameIsValid,
    message: messageName,
    isConfirm: nameIsConfirm,
    onChangeValue: onChangeName,
    onBlurValue: onBlurName,
  } = useInputValidate(isNameFormat, 'name');

  const {
    value: password,
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
    value: email,
    isValid: emailIsValid,
    message: messageEmail,
    isConfirm: emailIsConfirm,
    onChangeValue: onChangeEmail,
    onBlurValue: onBlurEmail,
  } = useInputValidate(isEmailFormat, 'email');

  const onFormSubmit = (e) => {
    e.preventDefault()
    handleRegister({ name, email, password })
  };

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
          Register
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onFormSubmit}>
        <Modal.Body>

          <FormGroup className="mb-3" controlId="formBasicEmail">
            <FormLabel className='fs-5 font-content'>User Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Username"
              value={name}
              onChange={onChangeName}
              onBlur={onBlurName}
            />
            <Form.Text className="text-danger" hidden={nameIsValid}>
              {messageName}
            </Form.Text>
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicPassword">
            <FormLabel className='fs-5 font-content'>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter Password"
              ref={checkPasswordRef}
              value={password}
              onChange={onChangePassword}
              onBlur={onBlurPassword}
            />
            <Form.Text className="text-danger" id="passwordFormat" hidden={passwordIsValid}>
              {messagePassword}
            </Form.Text>
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicPassword">
            <FormLabel className='fs-5 font-content'>Confirm Password</FormLabel>
            <FormControl
              type="password"
              value={confirmPassword}
              placeholder="Enter Password Again"
              onChange={onChangeConfirmPassword}
              onBlur={onBlurConfirmPassword}
            />
            <Form.Text
              className="text-danger"
              hidden={confirmPasswordIsValid}
            >
              {messageConfirmPassword}
            </Form.Text>
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicEmail">
            <FormLabel className='fs-5 font-content'>Email address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={onChangeEmail}
              onBlur={onBlurEmail}
            />
            <Form.Text className=" text-danger" hidden={emailIsValid}>
              {messageEmail}
            </Form.Text>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="outline-light light"
            disabled={!nameIsConfirm || !emailIsConfirm || !passwordIsConfirm || !confirmPasswordIsConfirm}
          >
            Register
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
export default RegisterModal
