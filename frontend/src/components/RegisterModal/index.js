/** @format */
import React, { useRef } from 'react'
import { Button, Form, FormGroup, FormControl, FormLabel, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import useInputValidate from '../../hooks/useInputValidate'
import { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from '../../util/constants/formValid'
import '../../../src/index'

const isNameFormat = (value) => NAME_REGEX.test(value);
const isPasswordFormat = (value) => PASSWORD_REGEX.test(value);
const isEmailFormat = (value) => EMAIL_REGEX.test(value);

const RegisterModal = (props) => {

  const checkPasswordRef = useRef()

  const {
    value: name,
    isValid: nameIsValid,
    isConfirm: nameIsConfirm,
    onChangeValue: onChangeName,
    onBlurValue: onBlurName,
  } = useInputValidate(isNameFormat);

  const {
    value: password,
    isValid: passwordIsValid,
    isConfirm: passwordIsConfirm,
    onChangeValue: onChangePassword,
    onBlurValue: onBlurPassword,
  } = useInputValidate(isPasswordFormat);

  const {
    value: email,
    isValid: emailIsValid,
    isConfirm: emailIsConfirm,
    onChangeValue: onChangeEmail,
    onBlurValue: onBlurEmail,
  } = useInputValidate(isEmailFormat);

  const onFormSubmit = (e) => {
    e.preventDefault()
    props.handleRegister([name, email, password])
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="gray-lv3"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className=" fw-bold" id="contained-modal-title-vcenter">
          Register
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onFormSubmit}>
        <Modal.Body>

          <FormGroup className="mb-3" controlId="formBasicEmail">
            <FormLabel>User Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Username"
              value={name}
              onChange={onChangeName}
              onBlur={onBlurName}
            />
            <Form.Text className="text-danger" hidden={nameIsValid}>
              malformed username,please confirm your Format!
            </Form.Text>
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicPassword">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={onChangePassword}
              onBlur={onBlurPassword}
            />
            <Form.Text className="text-danger" id="passwordFormat" hidden={passwordIsValid}>
              malformed password,please confirm your Format!
            </Form.Text>
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicPassword">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              ref={checkPasswordRef}
              placeholder="Enter Password Again"
            />
            <Form.Text
              className="text-danger"
              hidden={checkPasswordRef.current?.value === password}
            >
              the passwords are inconsistent!
            </Form.Text>
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicEmail">
            <FormLabel>Email address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={onChangeEmail}
              onBlur={onBlurEmail}
            />
            <Form.Text className=" text-danger" hidden={emailIsValid}>
              malformed E-mail,please confirm your Format!
            </Form.Text>
          </FormGroup>


        </Modal.Body>

        <Modal.Footer>
          <Button
            type="submit"
            variant="outline-light light"
            disabled={!nameIsConfirm || !emailIsConfirm || !passwordIsConfirm || !checkPasswordRef.current?.value}
          >
            Register
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
export default RegisterModal
