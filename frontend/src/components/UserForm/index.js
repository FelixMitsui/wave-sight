
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FoldIcon from '../../../src/Icons/FoldIcon'

const UserForm = (props) => {

    const {
        _id,
        user_name,
        user_email,
        user_password,
        user_address,
        user_role,
        user_status
    } = props.value

    const handleValue = (e) => {
        props.setValue(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleStatus = (e) => {
        if (e.target.checked) {
            props.setValue(prev => ({ ...prev, [e.target.name]: !user_status }))
        } else {
            props.setValue(prev => ({ ...prev, [e.target.name]: !user_status }))
        }
    }

    return (
        <>
            <div className="jutify-content-center  ">
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Name</Form.Label>
                        <Form.Label className="p-1 d-flex border border-1 border-black">{user_name}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Email</Form.Label>
                        <Form.Label className="p-1 d-flex border border-1 border-black">{user_email}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Password</Form.Label>
                        <Form.Control name='user_password' type="text" value={user_password} onChange={(e) => handleValue(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Address</Form.Label>
                        <Form.Control name='user_address' value={user_address} onChange={(e) => handleValue(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" >
                        <Form.Label className="fw-bold">Role</Form.Label>
                        {['general', 'admin'].map((type) => (
                            <Form.Check
                                key={`inline-${type}`}
                                label={type}
                                value={type}
                                checked={user_role === type ? true : false}
                                name="user_role"
                                type="radio"
                                className="ms-2"
                                onChange={(e) => handleValue(e)}
                            />
                        ))}
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex " >
                        <Form.Label className="fw-bold">Status</Form.Label>
                        <Form.Check
                            type="switch"
                            name='user_status'
                            className="ms-2"
                            checked={Boolean(user_status)}
                            onChange={(e) => handleStatus(e)}
                        />
                    </Form.Group>
                </Form>
                <Button
                    variant="gray"
                    type="button"
                    className="bg-gray"
                    onClick={() => handleUserUpdate([
                        _id,
                        user_address,
                        user_role,
                        user_status])}>
                    Submit
                </Button>

                <FoldIcon
                    className="position-relative  end--220"
                    onClick={() => props.handleClose(false)}
                    viewBox="0 0 18 18"
                    width="33"
                    height="33" />
            </div>
        </>
    )
}

export default UserForm;