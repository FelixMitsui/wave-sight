/** @format */
import React, { useRef } from 'react'
import { Button, Form, FormGroup, FormControl, FormLabel, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

import '../../index'

const LoginModal = (props) => {

  const emailRef = useRef()
  const passwordRef = useRef()

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
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup className="mb-3" controlId="formBasicEmail">
            <FormLabel>Email address</FormLabel>
            <FormControl
              ref={emailRef}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </FormGroup>

          <FormGroup className="mb-3" controlId="formBasicPassword">
            <FormLabel>Password</FormLabel>
            <FormControl
              ref={passwordRef}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => props.handleLogin([emailRef.current.value,
          passwordRef.current.value])}
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
