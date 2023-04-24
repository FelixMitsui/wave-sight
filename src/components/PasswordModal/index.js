/** @format */
import React, { useRef } from 'react'
import useInputValidate from '../../hooks/useInputValidate'
import { Button, Form, FormGroup, FormControl, FormLabel, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { PASSWORD_REGEX } from '../../util/constants/formValid'

const isPasswordFormat = (value) => PASSWORD_REGEX.test(value);

const PasswordModal = ({ handlePassword, handleClose, show }) => {

  const checkPasswordRef = useRef()
  const isPasswordMatchFormat = (value) => value === checkPasswordRef.current.value;
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
  } = useInputValidate(isPasswordFormat, 'new password');

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
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="bg-light-gray"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-2 font-title" id="contained-modal-title-vcenter">
          Password Change
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup className="mb-3" controlId="formBasicPassword">
            <FormLabel className='fs-5 font-content'>Old Password</FormLabel>
            <FormControl
              type="password"
              placeholder="input old password"
              value={oldPassword}
              onChange={onChangeOldPassword}
              onBlur={onBlurOldPassword}
            />
            <Form.Text className="text-danger" hidden={oldPasswordIsValid}>
              {messageOldPassword}
            </Form.Text>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formBasicPassword">
            <FormLabel className='fs-5 font-content'>New Password</FormLabel>
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
            <FormLabel className='fs-5 font-content'>Password Confirm</FormLabel>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!oldPasswordIsConfirm || !newPasswordIsConfirm || !confirmPasswordIsConfirm}
          variant="outline-light bg-deep-gray"
          type="submit"
          onClick={() => handlePassword({ oldPassword, newPassword })}
        >
          Confirm Change
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default PasswordModal